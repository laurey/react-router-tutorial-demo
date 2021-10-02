import React, { useState, useEffect, useCallback } from "react";
import { Prompt, useHistory } from "react-router";
import { Icon, Modal } from "antd";
import useAuthContext from "../contexts/useAuthContext";
import SignInForm from "../components/SignIn";
import { getPageQuery } from "../utils/utils";

export const SignIn = () => {
  const history = useHistory();
  const auth = useAuthContext();
  const [target, setTarget] = useState("/");
  const [values, setValues] = useState(null);
  const [isBlocking, setIsBlocking] = useState(false);
  const [forceRedirect, setForceRedirect] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);

  const handleSubmit = useCallback(
    (values) => {
      auth
        .login(values)
        .then(() => {
          setValues(values);
          setIsBlocking(false);
        })
        .catch(console.error);
    },
    [auth]
  );

  const handleValuesChanged = useCallback((values = "") => {
    setIsBlocking(!!values);
  }, []);

  const handlePromptModalVisibility = useCallback((location) => {
    setTarget(location);
    setConfirmVisible(true);
  }, []);

  const handleAllowPromptTransition = useCallback(() => {
    setIsBlocking(false);
    setForceRedirect(true);
  }, []);

  const handleHidePromptModal = useCallback(() => {
    setConfirmVisible(false);
  }, []);

  const dd = getPageQuery();
  console.log(dd);

  useEffect(() => {
    if (!isBlocking) {
      setConfirmVisible(false);
    }

    if (forceRedirect && target) {
      history.push(
        {
          pathname: target.pathname,
        },
        target.state
      );
    }
  }, [forceRedirect, history, isBlocking, target]);

  return (
    <>
      {isBlocking && (
        <Prompt
          message={(location) => {
            handlePromptModalVisibility(location);
            return false;
          }}
        />
      )}
      <p>
        Blocking? {isBlocking ? "Yes, click a link or the back button" : "Nope"}
      </p>
      <p>pageQuery: {JSON.stringify(dd)}</p>
      {confirmVisible && (
        <Modal
          centered
          width="20%"
          visible={confirmVisible}
          onCancel={handleHidePromptModal}
          onOk={handleAllowPromptTransition}
          okText="确定"
          cancelText="取消"
        >
          <div>
            <Icon
              type="exclamation-circle"
              className="rtc-warning-icon"
              theme="filled"
              style={{ padding: "0 10px", fontSize: 24, color: "red" }}
            />
            <span>确定要离开当前页面吗?</span>
          </div>
        </Modal>
      )}

      {values && <p>submit values: {JSON.stringify(values)}</p>}

      <SignInForm
        onSubmit={handleSubmit}
        onValuesChanged={handleValuesChanged}
      />
    </>
  );
};

export default SignIn;

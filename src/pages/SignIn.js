import React, { useState, useEffect, useCallback } from "react";
import { Prompt, useHistory } from "react-router";
import { Icon, Modal, Button } from "antd";
import useAuthContext from "../contexts/useAuthContext";
import SignInForm from "../components/SignIn";
import { getPageQuery } from "../utils/utils";
import useUnsavedChangesWarning from "../hooks/useUnsavedChangesWarning";

export const SignIn = () => {
  const history = useHistory();
  const auth = useAuthContext();
  const [values, setValues] = useState(null);
  // const [target, setTarget] = useState("/");
  // const [isBlocking, setIsBlocking] = useState(false);
  // const [forceRedirect, setForceRedirect] = useState(false);
  // const [confirmVisible, setConfirmVisible] = useState(false);
  const {
    target,
    isBlocking,
    forceRedirect,
    confirmVisible,
    setIsBlocking,
    handleHidePromptModal,
    handleAllowPromptTransition,
    handlePromptModalVisibility,
  } = useUnsavedChangesWarning();

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
    [auth, setIsBlocking]
  );

  const handleValuesChanged = useCallback(
    (values = "") => {
      setIsBlocking(!!values);
    },
    [setIsBlocking]
  );

  // const handlePromptModalVisibility = useCallback((location) => {
  //   setTarget(location);
  //   setConfirmVisible(true);
  // }, []);

  // const handleAllowPromptTransition = useCallback(() => {
  //   setIsBlocking(false);
  //   setForceRedirect(true);
  // }, []);

  // const handleHidePromptModal = useCallback(() => {
  //   setConfirmVisible(false);
  // }, []);

  const dd = getPageQuery();

  useEffect(() => {
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
          when={isBlocking}
          message={(location) => {
            handlePromptModalVisibility(location);
            return false;
          }}
        />
      )}
      <p>
        <span>Is Blocking?</span>
        <span>
          {isBlocking ? "Yes, click a link or the back button" : "Nope"}
        </span>
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
      <div>
        <Button href="https://www.google.com" type="link" target="_blank">
          Giigle
        </Button>
        <Button href="https://www.youtube.com" type="link">
          Utube
        </Button>
      </div>

      <SignInForm
        onSubmit={handleSubmit}
        onValuesChanged={handleValuesChanged}
      />
    </>
  );
};

export default SignIn;

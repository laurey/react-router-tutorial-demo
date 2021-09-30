import React, {
  forwardRef,
  useCallback,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
} from "react";
import { Prompt, useHistory } from "react-router";
import { Form, Modal } from "antd";
import { LogInForm } from "../components/SignIn";

export const EnhancedLogInForm = Form.create({
  name: "login_ref_form",
  onValuesChange: (props, changedValues, allValues) => {
    const { onValuesChanged } = props;
    const values = Object.values(allValues).filter(Boolean);
    onValuesChanged(values);
  },
})(
  forwardRef(({ onUpdate, ...props }, ref) => {
    useImperativeHandle(ref, () => props.form);

    return <LogInForm {...props} />;
  })
);

export const LogIn = () => {
  const formRef = useRef(null);
  const history = useHistory();
  const [target, setTarget] = useState();
  const [isBlocking, setIsBlocking] = useState(false);

  const handleSubmit = useCallback((values) => {
    console.log("submitted values: ", values);
    setIsBlocking(false);
    formRef.current.resetFields();
  }, []);

  const handleValuesChanged = useCallback((values = "") => {
    setIsBlocking(Boolean(values.length));
  }, []);

  const handleAllowTransition = useCallback((location) => {
    setIsBlocking(false);
    setTarget({
      to: {
        pathname: location.pathname,
        search: location.search,
      },
      state: location.state,
    });
  }, []);

  useEffect(() => {
    if (!isBlocking && target) {
      history.push(target.to, target.state);
    }
    return () => {};
  }, [history, isBlocking, target]);

  return (
    <>
      <Prompt
        when={isBlocking}
        message={(location) => {
          Modal.confirm({
            title: "Confirm",
            content: "Bla bla ...",
            onOk: () => {
              handleAllowTransition(location);
            },
          });
          return false;
        }}
      />

      <p>
        Blocking? {isBlocking ? "Yes, click a link or the back button" : "Nope"}
      </p>

      <EnhancedLogInForm
        onSubmit={handleSubmit}
        onValuesChanged={handleValuesChanged}
        wrappedComponentRef={formRef}
      />
    </>
  );
};

export default LogIn;

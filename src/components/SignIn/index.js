import React, {
  useRef,
  useCallback,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Form } from "antd";
import LogInForm from "./SignIn";

export const EnhancedLoginForm = Form.create({
  name: "enhanced_login_form",
  onValuesChange: (props, changedValues, allValues) => {
    const { onValuesChanged } = props;
    const values = Object.values(allValues).filter(Boolean);
    onValuesChanged(values);
  },
})(
  forwardRef((props, ref) => {
    useImperativeHandle(ref, () => props.form);

    return <LogInForm {...props} />;
  })
);

function SignInForm(props) {
  const formRef = useRef(null);

  const handleRender = useCallback(() => {
    const { onRender } = props;
    if (onRender) {
      onRender();
    }
  }, [props]);

  const handleUpdate = useCallback(
    (values) => {
      const { onUpdate, onValuesChanged } = props;
      if (onUpdate) {
        onUpdate(values);
      } else if (onValuesChanged) {
        onValuesChanged(values);
      }
    },
    [props]
  );

  const handleSubmit = useCallback(
    (values, callback = () => {}) => {
      const { onSubmit } = props;
      if (onSubmit) {
        onSubmit(values, callback);
        formRef.current.resetFields();
      }
    },
    [props]
  );

  return (
    <EnhancedLoginForm
      onRender={handleRender}
      onUpdate={handleUpdate}
      onSubmit={handleSubmit}
      onValuesChanged={handleUpdate}
      wrappedComponentRef={formRef}
    />
  );
}

export { SignInForm as default, LogInForm };

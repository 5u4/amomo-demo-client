import { Alert, Input } from "antd";
import { FieldProps, getIn } from "formik";
import React from "react";

export const PasswordFormField: React.FC<FieldProps> = ({
  field,
  form,
  ...props
}) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <>
      <Input.Password {...field} {...props} />
      {!!errorText && (
        <Alert type="error" message={errorText} showIcon {...props} />
      )}
    </>
  );
};

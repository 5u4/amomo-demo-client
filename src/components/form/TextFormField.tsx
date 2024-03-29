import { Alert, Input } from "antd";
import { FieldProps, getIn } from "formik";
import React from "react";

export const TextFormField: React.FC<FieldProps> = ({
  field,
  form,
  ...props
}) => {
  const errorText =
    getIn(form.touched, field.name) && getIn(form.errors, field.name);

  return (
    <>
      <Input {...field} {...props} />
      {!!errorText && (
        <Alert type="error" message={errorText} showIcon {...props} />
      )}
    </>
  );
};

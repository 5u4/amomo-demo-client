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
      <input {...field} {...props} />
      {!!errorText && <div>{errorText}</div>}
    </>
  );
};

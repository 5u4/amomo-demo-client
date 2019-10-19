import { Field, Form, Formik } from "formik";
import React, { useCallback } from "react";
import * as yup from "yup";
import { loginApi } from "../../api/auth/login";
import { useAuthDispatch } from "../../store/auth";
import { TextFormField } from "../form/TextFormField";

const schema = yup.object({
  username: yup
    .string()
    .required()
    .min(3)
    .max(16)
    .lowercase()
    .matches(/[0-9a-z]*/),
  password: yup
    .string()
    .required()
    .min(6)
    .max(32),
});

interface IFormValue {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const dispatch = useAuthDispatch();

  const login = useCallback(
    (values: IFormValue) => {
      loginApi(values).then(res => {
        const { id, username, email } = res.data.data;
        const { token } = res.data;
        dispatch({ type: "SET_USER", payload: { id, username, email } });
        dispatch({ type: "SET_TOKEN", payload: { token } });
      });
    },
    [dispatch]
  );

  return (
    <Formik
      onSubmit={login}
      initialValues={{ username: "", password: "" } as IFormValue}
      validationSchema={schema}
    >
      {() => (
        <>
          <Form>
            <div>
              <Field
                label="Username"
                name="username"
                component={TextFormField}
              />
            </div>
          </Form>
          <Form>
            <div>
              <Field
                label="Password"
                name="password"
                type="password"
                component={TextFormField}
              />
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
};

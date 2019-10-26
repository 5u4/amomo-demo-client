import { Field, Form, Formik } from "formik";
import React, { useCallback } from "react";
import * as yup from "yup";
import { registerApi } from "../../api/auth/register";
import { useAuthDispatch } from "../../store/auth";
import { useAvatarSelector } from "../../store/avatar";
import { email, password, username } from "../../validators/auth";
import { TextFormField } from "../form/TextFormField";

const schema = yup.object({
  username,
  email,
  password,
});

interface IFormValue {
  username: string;
  email: string;
  password: string;
}

export const Register: React.FC = () => {
  const avatar = useAvatarSelector();
  const dispatch = useAuthDispatch();

  const register = useCallback(
    (values: IFormValue) => {
      const payload = { ...values, avatar };
      registerApi(payload).then(res => {
        const { id, username, email } = res.data.data;
        const { token } = res.data;
        dispatch({ type: "SET_USER", payload: { id, username, email } });
        dispatch({ type: "SET_TOKEN", payload: { token } });
      });
    },
    [avatar, dispatch]
  );

  return (
    <Formik
      onSubmit={register}
      initialValues={{ username: "", email: "", password: "" } as IFormValue}
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
              <Field label="Email" name="email" component={TextFormField} />
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

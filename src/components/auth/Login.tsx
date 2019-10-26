import { useMutation } from "@apollo/react-hooks";
import { Field, Form, Formik } from "formik";
import React, { useCallback } from "react";
import * as yup from "yup";
import { LOGIN_MUTATION } from "../../graphql/auth";
import { useAuthDispatch } from "../../store/auth";
import { password, username } from "../../validators/auth";
import { TextFormField } from "../form/TextFormField";

const schema = yup.object({
  username,
  password,
});

interface IFormValue {
  username: string;
  password: string;
}

export const Login: React.FC = () => {
  const dispatch = useAuthDispatch();
  const [login] = useMutation(LOGIN_MUTATION);

  const onSubmit = useCallback(
    (values: IFormValue) => {
      login({ variables: values })
        .then(res => {
          const { id, email, username, token } = res.data.login;
          dispatch({ type: "SET_USER", payload: { id, username, email } });
          dispatch({ type: "SET_TOKEN", payload: { token } });
        })
        .catch(err => {}); // TODO: Handle login failure
    },
    [login, dispatch]
  );

  return (
    <Formik
      onSubmit={onSubmit}
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

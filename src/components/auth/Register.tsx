import { Button, Icon, Modal, Typography } from "antd";
import { Field, Form, Formik, FormikActions } from "formik";
import React, { useCallback, useState } from "react";
import * as yup from "yup";
import { useRegisterMutation } from "../../graphql/auth";
import { useAuthDispatch } from "../../store/auth";
import { useAvatarSelector } from "../../store/avatar";
import { email, password, username } from "../../validators/auth";
import { PasswordFormField } from "../form/PasswordFormField";
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
  const [modalVisible, setModalVisibility] = useState(false);
  const avatar = useAvatarSelector();
  const dispatch = useAuthDispatch();

  const [register] = useRegisterMutation();

  const onSubmit = useCallback<
    (values: IFormValue, formikActions: FormikActions<IFormValue>) => void
  >(
    (values, { resetForm }) => {
      const payload = { ...values, avatar };
      register({ variables: { payload } })
        .then(res => {
          if (!res.data || !res.data.register) {
            return;
          }

          const { id, username, email, token } = res.data.register;
          dispatch({ type: "SET_USER", payload: { id, username, email } });
          token && dispatch({ type: "SET_TOKEN", payload: { token } });
          setModalVisibility(false);
          resetForm();
        })
        .catch(err => {}); // TODO: Handle register failure
    },
    [avatar, register, dispatch]
  );

  const formIconStyle: React.CSSProperties = {
    color: "rgba(0,0,0,.25)",
  };

  const formInputStyle: React.CSSProperties = {
    marginTop: 5,
    marginBottom: 10,
  };

  const form = (
    <Formik
      onSubmit={onSubmit}
      initialValues={{ username: "", email: "", password: "" } as IFormValue}
      validationSchema={schema}
    >
      {() => (
        <Form>
          <Typography.Title level={2}>Register</Typography.Title>
          <Field
            label="Username"
            name="username"
            prefix={<Icon type="user" style={formIconStyle} />}
            placeholder="Enter your username"
            style={formInputStyle}
            component={TextFormField}
          />
          <Field
            label="Email"
            name="email"
            prefix={<Icon type="mail" style={formIconStyle} />}
            placeholder="Enter your email"
            style={formInputStyle}
            component={TextFormField}
          />
          <Field
            label="Password"
            name="password"
            prefix={<Icon type="lock" style={formIconStyle} />}
            placeholder="Enter your password"
            style={formInputStyle}
            component={PasswordFormField}
          />
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form>
      )}
    </Formik>
  );

  return (
    <>
      <div onClick={() => setModalVisibility(true)}>Register</div>
      <Modal
        closable={false}
        footer={null}
        centered
        visible={modalVisible}
        onCancel={() => setModalVisibility(false)}
      >
        {form}
      </Modal>
    </>
  );
};

import { Card, Icon } from "antd";
import { Field, Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";
import { User } from "../../graphql/types";
import { guess } from "../../validators/post";
import { TextFormField } from "../form/TextFormField";

interface IProps {
  dataUrl: string;
  postedBy?: User | null;
}

interface IFormValue {
  guess: string;
}

const schema = yup.object({ guess });

export const PostCard: React.FC<IProps> = ({ dataUrl }) => {
  const formIconStyle: React.CSSProperties = {
    color: "rgba(0,0,0,.25)",
  };

  const formInputStyle: React.CSSProperties = {
    marginTop: 5,
    marginBottom: 10,
  };

  const guessIcon = <Icon type="bulb" style={formIconStyle} />;

  const form = (
    <Formik
      onSubmit={() => {}}
      initialValues={{ guess: "" } as IFormValue}
      validationSchema={schema}
    >
      {() => (
        <Form>
          <Field
            label="Guess"
            name="guess"
            placeholder="Enter your guess..."
            style={formInputStyle}
            suffix={guessIcon}
            component={TextFormField}
          />
        </Form>
      )}
    </Formik>
  );

  return (
    <Card
      bordered={false}
      bodyStyle={{ padding: 16 }}
      cover={
        <img
          src={process.env.REACT_APP_SERVER_BASE_URL + dataUrl}
          alt="Post"
          draggable={false}
        />
      }
    >
      {form}
    </Card>
  );
};

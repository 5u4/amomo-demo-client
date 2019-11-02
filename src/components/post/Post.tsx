import { Alert, Card, Icon, message, Modal, Typography } from "antd";
import { Field, Form, Formik, FormikActions } from "formik";
import React, { useState } from "react";
import * as yup from "yup";
import { useAnswerMutation } from "../../graphql/post";
import { User } from "../../graphql/types";
import { usePostGuessState } from "../../hooks/usePostGuessState";
import { useAuthSelector } from "../../store/auth";
import {
  getPostGuessState,
  markPostGuessState,
} from "../../store/storage/postState";
import { guess } from "../../validators/post";
import { Anonymous } from "../avatar/Anonymous";
import { Avatar } from "../avatar/Avatar";
import { TextFormField } from "../form/TextFormField";

const schema = yup.object({ guess });

interface IFormValue {
  guess: string;
}

interface IProps {
  id: string;
  dataUrl: string;
  postedBy?: User | null;
  solution?: string | null;
  setUserInfoPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setViewingUserData: React.Dispatch<React.SetStateAction<User | undefined>>;
}

export const Post: React.FC<IProps> = ({
  id,
  dataUrl,
  postedBy,
  solution,
  setUserInfoPanelOpen,
  setViewingUserData,
}) => {
  const [modalVisible, setModalVisibility] = useState(false);
  const [guessState, setGuessState] = usePostGuessState(id, solution);
  const [answer] = useAnswerMutation();
  const auth = useAuthSelector();
  const [guessSolution, setGuessSolution] = useState<string | undefined>(
    undefined
  );

  const avatar = (
    <div className="round-avatar">
      {postedBy ? (
        <Avatar
          size={32}
          offset={4}
          layout={postedBy.avatar.layout}
          body={postedBy.avatar.body}
          mouth={postedBy.avatar.mouth}
          eyes={postedBy.avatar.eyes}
        />
      ) : (
        <Anonymous size={32} offset={4} />
      )}
    </div>
  );

  const text = (
    <Typography.Text className="username-display" strong>
      {postedBy ? postedBy.username : "Anonymous"}
    </Typography.Text>
  );

  const formIconStyle: React.CSSProperties = {
    color: "rgba(0,0,0,.25)",
  };

  const formInputStyle: React.CSSProperties = {
    marginTop: 5,
    marginBottom: 10,
  };

  const guessIcon = <Icon type="bulb" style={formIconStyle} />;

  const onSubmit: (
    values: IFormValue,
    formikActions: FormikActions<IFormValue>
  ) => void = ({ guess }) => {
    answer({ variables: { input: { guessTopic: guess, postId: id } } })
      .then(res => {
        if (!res.data || !res.data.answer) {
          message.error(`${guess} is not a correct answer, keep guessing 🤨`);
          setGuessState("incorrect");
          return;
        }
        message.success(`You got ${guess} right! 🎉`);
        setGuessState("correct");
        auth.token || markPostGuessState(id, guess);
        setGuessSolution(guess);
      })
      .catch(() => {});
  };

  const guessInputForm = (
    <Formik
      onSubmit={onSubmit}
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
            size="large"
          />
        </Form>
      )}
    </Formik>
  );

  const isSelfPost = postedBy && postedBy.id === auth.id;

  const cardClassName = isSelfPost
    ? "self-post-card post-card"
    : guessState === "correct"
    ? "post-card-correct post-card"
    : guessState === "incorrect"
    ? "post-card-incorrect post-card"
    : "post-card";

  const modalClassName = isSelfPost
    ? "self-post-modal post-modal"
    : guessState === "correct"
    ? "post-modal-correct post-modal"
    : guessState === "incorrect"
    ? "post-modal-incorrect post-modal"
    : "post-modal";

  const onClickUserInfo: any = (e: Event) => {
    if (!postedBy) {
      return;
    }
    e.stopPropagation();
    setUserInfoPanelOpen(true);
    setViewingUserData(postedBy);
  };

  const PostCard = (
    <Card
      className={cardClassName}
      hoverable
      bodyStyle={{ padding: 16 }}
      onClick={() => setModalVisibility(true)}
      cover={
        <img
          src={process.env.REACT_APP_SERVER_BASE_URL + dataUrl}
          alt="Post"
          draggable={false}
        />
      }
    >
      <div className="description-container">
        <div onClick={onClickUserInfo}>{avatar}</div>
        <div onClick={onClickUserInfo}>{text}</div>
      </div>
    </Card>
  );

  const PostModalContent = (
    <Card
      bordered={false}
      bodyStyle={{ padding: 12 }}
      cover={
        <img
          src={process.env.REACT_APP_SERVER_BASE_URL + dataUrl}
          alt="Post"
          draggable={false}
        />
      }
    >
      {isSelfPost ? (
        <Alert
          message={`You drew this ${solution ||
            guessSolution ||
            getPostGuessState(id)}!`}
          type="info"
          showIcon
        />
      ) : guessState === "correct" ? (
        <Alert
          message={`You got ${solution ||
            guessSolution ||
            getPostGuessState(id)} correctly!`}
          type="success"
          showIcon
        />
      ) : (
        guessInputForm
      )}
    </Card>
  );

  const PostModal = (
    <Modal
      visible={modalVisible}
      closable={false}
      footer={null}
      className={modalClassName}
      onCancel={() => setModalVisibility(false)}
      bodyStyle={{ padding: 12 }}
    >
      {PostModalContent}
    </Modal>
  );

  return (
    <>
      {PostCard}
      {PostModal}
    </>
  );
};

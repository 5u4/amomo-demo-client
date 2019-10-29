import { Card, Modal, Typography } from "antd";
import React, { useState } from "react";
import { User } from "../../graphql/types";
import { Anonymous } from "../avatar/Anonymous";
import { Avatar } from "../avatar/Avatar";
import { PostCard } from "./PostCard";

interface IProps {
  dataUrl: string;
  postedBy?: User | null;
}

export const Post: React.FC<IProps> = ({ dataUrl, postedBy }) => {
  const [modalVisible, setModalVisibility] = useState(false);

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

  return (
    <>
      <Card
        className="post-card"
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
          {avatar}
          {text}
        </div>
      </Card>
      <Modal
        visible={modalVisible}
        closable={false}
        footer={null}
        className="post-modal"
        onCancel={() => setModalVisibility(false)}
      >
        <PostCard dataUrl={dataUrl} />
      </Modal>
    </>
  );
};

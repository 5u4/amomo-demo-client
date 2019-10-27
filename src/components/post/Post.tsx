import { Card } from "antd";
import React from "react";

interface IProps {
  dataUrl: string;
}

export const Post: React.FC<IProps> = ({ dataUrl }) => {
  return (
    <Card
      className="post-card"
      hoverable
      cover={
        <img
          src={process.env.REACT_APP_SERVER_BASE_URL + dataUrl}
          alt="Post"
          draggable={false}
        />
      }
    ></Card>
  );
};

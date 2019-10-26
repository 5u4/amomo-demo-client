import React from "react";

interface IProps {
  dataUrl: string;
}

export const Post: React.FC<IProps> = ({ dataUrl }) => {
  return (
    <div className="post-card">
      <img
        src={process.env.REACT_APP_SERVER_BASE_URL + dataUrl}
        alt="Post"
        draggable={false}
      />
    </div>
  );
};

import React from "react";

interface IProps {
  dataUrl: string;
}

export const Post: React.FC<IProps> = ({ dataUrl }) => {
  return (
    <div className="post-card">
      <img src={dataUrl} alt="Post" />
    </div>
  );
};

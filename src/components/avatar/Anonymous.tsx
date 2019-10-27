import React from "react";
import { Avatar } from "./Avatar";

interface IProps {
  size?: number;
  offset?: number;
}

export const Anonymous: React.FC<IProps> = ({ size, offset }) => {
  return (
    <Avatar
      layout="0"
      body="a"
      mouth="a"
      eyes="a"
      size={size}
      offset={offset}
    />
  );
};

import { message } from "antd";
import React from "react";

export const Profile: React.FC = () => {
  const onClick = () =>
    message.info("Sorry, user profile is under development 🚧");

  // TODO:
  return (
    /* eslint-disable-next-line */
    <a onClick={onClick}>
      <span className="menu-dropdown">Profile</span>
    </a>
  );
};

import { Affix, Dropdown, Menu } from "antd";
import React from "react";
import { useAuthSelector } from "../../store/auth";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { Anonymous } from "../avatar/Anonymous";
import { Avatar } from "../avatar/Avatar";

export const AppMenu: React.FC = () => {
  const auth = useAuthSelector();

  const menuAvatar =
    auth.token && auth.avatar ? (
      <Avatar
        layout={auth.avatar.layout}
        body={auth.avatar.body}
        mouth={auth.avatar.mouth}
        eyes={auth.avatar.eyes}
      />
    ) : (
      <Anonymous />
    );

  const menu = (
    <Menu>
      <Menu.Item>
        <Login />
      </Menu.Item>
      <Menu.Item>
        <Register />
      </Menu.Item>
    </Menu>
  );

  return (
    <Affix offsetTop={15} style={{ position: "absolute", right: 20 }}>
      <Dropdown overlay={menu} trigger={["click"]}>
        <div className="menu-avatar">{menuAvatar}</div>
      </Dropdown>
    </Affix>
  );
};

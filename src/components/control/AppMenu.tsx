import { Affix, Dropdown, Menu } from "antd";
import React from "react";
import { useAuthSelector } from "../../store/auth";
import { Login } from "../auth/Login";
import { Logout } from "../auth/Logout";
import { Register } from "../auth/Register";
import { Anonymous } from "../avatar/Anonymous";
import { Avatar } from "../avatar/Avatar";
import { Profile } from "../user/Profile";

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

  const guestMenu = (
    <Menu>
      <Menu.Item>
        <Login />
      </Menu.Item>
      <Menu.Item>
        <Register />
      </Menu.Item>
    </Menu>
  );

  const userMenu = (
    <Menu>
      <Menu.Item>
        <Profile />
      </Menu.Item>
      <Menu.Item>
        <Logout />
      </Menu.Item>
    </Menu>
  );

  return (
    <Affix offsetTop={15} style={{ position: "absolute", right: 20 }}>
      <Dropdown overlay={auth.token ? userMenu : guestMenu} trigger={["click"]}>
        <div className="menu-avatar">{menuAvatar}</div>
      </Dropdown>
    </Affix>
  );
};

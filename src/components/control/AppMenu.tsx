import { Affix, Dropdown, Menu } from "antd";
import React from "react";
import { Login } from "../auth/Login";
import { Register } from "../auth/Register";
import { Anonymous } from "../avatar/Anonymous";

export const AppMenu: React.FC = () => {
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
        <div className="menu-avatar">
          <Anonymous />
        </div>
      </Dropdown>
    </Affix>
  );
};

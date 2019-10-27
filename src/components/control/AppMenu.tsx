import { Affix, Card, Dropdown, Menu } from "antd";
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
    <Affix offsetTop={20} style={{ position: "absolute", left: 20 }}>
      <Dropdown overlay={menu} placement="topLeft">
        <Card className="menu-avatar" hoverable>
          <Anonymous />
        </Card>
      </Dropdown>
    </Affix>
  );
};

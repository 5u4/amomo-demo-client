import { Affix, Card, Dropdown, Menu } from "antd";
import React from "react";
import { Avatar } from "../avatar/Avatar";

export const AppMenu: React.FC = () => {
  const menu = (
    <Menu>
      <Menu.Item>Login</Menu.Item>
      <Menu.Item>Register</Menu.Item>
    </Menu>
  );

  return (
    <Affix offsetTop={20} style={{ position: "absolute", left: 20 }}>
      <Dropdown overlay={menu} placement="topLeft">
        <Card className="menu-avatar" hoverable>
          <Avatar size={48} layout={0} body={0} mouth={0} eyes={0} />
        </Card>
      </Dropdown>
    </Affix>
  );
};

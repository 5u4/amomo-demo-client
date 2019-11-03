import { Button } from "antd";
import React from "react";
import { useLocation } from "wouter";

export const DrawButton: React.FC = () => {
  const [location] = useLocation();

  return location !== "/draw" ? (
    <Button
      shape="circle"
      type="primary"
      icon="plus"
      size="large"
      onClick={() => (window.location.href = "draw")}
      style={{ position: "fixed", right: 20, bottom: 15, zIndex: 1000 }}
    />
  ) : (
    <></>
  );
};

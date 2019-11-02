import { Button } from "antd";
import React from "react";
import { CanvasHandles } from "./Canvas";

interface IProps {
  canvasRef: React.RefObject<CanvasHandles>;
  color: string;
  currentColor: string;
}

export const ColorSwitchButton: React.FC<IProps> = ({
  canvasRef,
  color,
  currentColor,
}) => {
  const onClick = () =>
    canvasRef.current && canvasRef.current.changeColor(color as any);

  const isSelected = currentColor === color;

  return (
    <Button
      disabled={isSelected}
      onClick={onClick}
      className={`tool-btn`}
      style={{ borderColor: color }}
      icon={isSelected ? "check" : ""}
      shape="circle"
    />
  );
};

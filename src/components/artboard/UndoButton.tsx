import { Button, Tooltip } from "antd";
import React from "react";
import { CanvasHandles } from "./Canvas";

interface IProps {
  canvasRef: React.RefObject<CanvasHandles>;
}

export const UndoButton: React.FC<IProps> = ({ canvasRef }) => {
  const undo = () => {
    if (canvasRef.current) {
      canvasRef.current.undo();
    }
  };
  return (
    <Tooltip title="Undo">
      <Button className="tool-btn" icon="undo" shape="circle" onClick={undo} />
    </Tooltip>
  );
};

import { Button } from "antd";
import React from "react";
import { CanvasHandles } from "./Canvas";

interface IProps {
  canvasRef: React.RefObject<CanvasHandles>;
}

export const CreatePostButton: React.FC<IProps> = ({ canvasRef }) => {
  const publish = () => {
    if (canvasRef.current) {
      canvasRef.current.createPost();
    }
  };
  return (
    <Button
      className="tool-btn"
      icon="cloud-upload"
      type="primary"
      onClick={publish}
    >
      Publish
    </Button>
  );
};

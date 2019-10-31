import { Button } from "antd";
import React from "react";
import { CanvasHandles } from "./Canvas";

interface IProps {
  canvasRef: React.RefObject<CanvasHandles>;
}

export const DownloadButton: React.FC<IProps> = ({ canvasRef }) => {
  const download = () => {
    if (canvasRef.current) {
      canvasRef.current.download();
    }
  };
  return (
    <Button
      className="tool-btn"
      icon="cloud-download"
      shape="circle"
      onClick={download}
    />
  );
};

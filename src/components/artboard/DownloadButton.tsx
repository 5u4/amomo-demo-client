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
  return <button onClick={download}>Download</button>;
};

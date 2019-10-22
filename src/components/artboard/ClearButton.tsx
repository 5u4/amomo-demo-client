import React from "react";
import { CanvasHandles } from "./Canvas";

interface IProps {
  canvasRef: React.RefObject<CanvasHandles>;
}

export const ClearButton: React.FC<IProps> = ({ canvasRef }) => {
  const clear = () => {
    if (!window.confirm("Are you sure to clear the drawing?")) {
      return;
    }

    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };
  return <button onClick={clear}>Clear</button>;
};

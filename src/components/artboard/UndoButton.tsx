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
  return <button onClick={undo}>Undo</button>;
};

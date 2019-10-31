import React, { useRef } from "react";
import { Canvas, CanvasHandles } from "./Canvas";
import { ClearButton } from "./ClearButton";
import { DownloadButton } from "./DownloadButton";
import { UndoButton } from "./UndoButton";

export const Artboard: React.FC = () => {
  const canvasRef = useRef<CanvasHandles>(null);

  const size = Math.min(
    Math.min(window.screen.height, window.screen.width) * 0.7,
    450
  );

  const drawBoard = (
    <>
      <Canvas width={size} height={size} ref={canvasRef} />
      <div>
        <DownloadButton canvasRef={canvasRef} />
        <UndoButton canvasRef={canvasRef} />
        <ClearButton canvasRef={canvasRef} />
      </div>
    </>
  );

  return (
    <div className="artboard-container">
      <div className="artboard-card">{drawBoard}</div>
    </div>
  );
};

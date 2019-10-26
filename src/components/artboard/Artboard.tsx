import React, { useRef } from "react";
import { Canvas, CanvasHandles } from "./Canvas";
import { ClearButton } from "./ClearButton";
import { DownloadButton } from "./DownloadButton";
import { UndoButton } from "./UndoButton";

export const Artboard: React.FC = () => {
  const canvasRef = useRef<CanvasHandles>(null);

  return (
    <>
      <Canvas ref={canvasRef} />
      <DownloadButton canvasRef={canvasRef} />
      <UndoButton canvasRef={canvasRef} />
      <ClearButton canvasRef={canvasRef} />
    </>
  );
};

import React, { useState } from "react";
import { Canvas } from "./Canvas";
import { DownloadButton } from "./DownloadButton";

export const Artboard: React.FC = () => {
  const [canvas, setCanvas] = useState<HTMLCanvasElement>();

  return (
    <>
      <Canvas setCanvas={setCanvas} />
      <DownloadButton canvas={canvas} />
    </>
  );
};

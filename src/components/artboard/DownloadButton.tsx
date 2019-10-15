import React from "react";

interface IProps {
  canvas: HTMLCanvasElement | undefined;
}

export const DownloadButton: React.FC<IProps> = ({ canvas }) => {
  const download = () => {
    if (!canvas) {
      return;
    }

    const link = document.createElement("a");
    link.download = "artboard.png"; // TODO: Use dynamic name
    link.href = canvas.toDataURL();
    link.click();
  };

  return <button onClick={download}>Download</button>;
};

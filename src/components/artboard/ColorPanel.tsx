import React from "react";
import { useArtboardSelector } from "../../store/artboard";
import { CanvasHandles } from "./Canvas";
import { ColorSwitchButton } from "./ColorSwitch";

interface IProps {
  canvasRef: React.RefObject<CanvasHandles>;
}

type TAvailableColor = "black" | "blue" | "green" | "yellow" | "red";

export const AVAILABLE_COLORS: { [color in TAvailableColor]: string } = {
  black: "#1a202c",
  blue: "#90cdf4",
  green: "#48bb78",
  yellow: "#f6e05e",
  red: "#f56565",
};

export const ColorPanel: React.FC<IProps> = ({ canvasRef }) => {
  const artboard = useArtboardSelector();

  return (
    <div>
      <ColorSwitchButton
        canvasRef={canvasRef}
        currentColor={artboard.color}
        color={AVAILABLE_COLORS["black"]}
      />
      <ColorSwitchButton
        canvasRef={canvasRef}
        currentColor={artboard.color}
        color={AVAILABLE_COLORS["blue"]}
      />
      <ColorSwitchButton
        canvasRef={canvasRef}
        currentColor={artboard.color}
        color={AVAILABLE_COLORS["green"]}
      />
      <ColorSwitchButton
        canvasRef={canvasRef}
        currentColor={artboard.color}
        color={AVAILABLE_COLORS["yellow"]}
      />
      <ColorSwitchButton
        canvasRef={canvasRef}
        currentColor={artboard.color}
        color={AVAILABLE_COLORS["red"]}
      />
    </div>
  );
};

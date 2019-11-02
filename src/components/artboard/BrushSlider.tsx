import { Slider } from "antd";
import { SliderValue } from "antd/lib/slider";
import React from "react";
import { CanvasHandles } from "./Canvas";

interface IProps {
  canvasRef: React.RefObject<CanvasHandles>;
}

export const BrushSlider: React.FC<IProps> = ({ canvasRef }) => {
  const onChange = (value: SliderValue) => {
    canvasRef.current && canvasRef.current.changeWidth(value as any);
  };

  return <Slider defaultValue={10} min={1} max={15} onChange={onChange} />;
};

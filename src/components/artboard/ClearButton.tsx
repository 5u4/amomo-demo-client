import { Button, Icon, Popconfirm, Tooltip } from "antd";
import React from "react";
import { CanvasHandles } from "./Canvas";

interface IProps {
  canvasRef: React.RefObject<CanvasHandles>;
}

export const ClearButton: React.FC<IProps> = ({ canvasRef }) => {
  return (
    <Popconfirm
      title="Are you sure to clear the drawing?"
      onConfirm={() => canvasRef.current && canvasRef.current.clear()}
      icon={<Icon type="question-circle-o" style={{ color: "red" }} />}
      okType="danger"
      okText="CLEAR"
    >
      <Tooltip title="Reset Canvas" placement="right">
        <Button className="tool-btn" icon="stop" shape="circle" type="danger" />
      </Tooltip>
    </Popconfirm>
  );
};

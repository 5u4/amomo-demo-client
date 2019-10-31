import { Button, Tooltip, Typography } from "antd";
import React, { useRef, useState } from "react";
import { useRandomTopicsQuery } from "../../graphql/topic";
import { Canvas, CanvasHandles } from "./Canvas";
import { ClearButton } from "./ClearButton";
import { DownloadButton } from "./DownloadButton";
import { UndoButton } from "./UndoButton";

export const Artboard: React.FC = () => {
  const canvasRef = useRef<CanvasHandles>(null);
  const [topic, setTopic] = useState<string>();
  const { data, refetch } = useRandomTopicsQuery();

  const size = Math.min(
    Math.min(window.screen.height, window.screen.width) * 0.7,
    450
  );

  const drawBoard = (
    <div className="artboard-card">
      <Canvas width={size} height={size} ref={canvasRef} />
      <div>
        <DownloadButton canvasRef={canvasRef} />
        <UndoButton canvasRef={canvasRef} />
        <ClearButton canvasRef={canvasRef} />
      </div>
    </div>
  );

  const topicSelection = data && data.randomTopics && (
    <div className="artboard-card" style={{ width: size, height: size }}>
      <Typography.Text>Select a topic to draw:</Typography.Text>
      <div className="topic-selection">
        {data.randomTopics.map(t => (
          <Button
            className="capitalize"
            key={t.id}
            onClick={() => setTopic(t.name)}
          >
            {t.name}
          </Button>
        ))}
      </div>
      <Tooltip title="Choose another topic">
        <Button icon="reload" shape="round" onClick={() => refetch()}></Button>
      </Tooltip>
    </div>
  );

  return (
    <div className="artboard-container">
      {topic ? drawBoard : topicSelection}
    </div>
  );
};

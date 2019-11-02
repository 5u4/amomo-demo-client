import { Button, Popconfirm, Result, Tooltip, Typography } from "antd";
import React, { useRef, useState } from "react";
import { useRandomTopicsQuery } from "../../graphql/topic";
import { Canvas, CanvasHandles } from "./Canvas";
import { ClearButton } from "./ClearButton";
import { DownloadButton } from "./DownloadButton";
import { UndoButton } from "./UndoButton";

export const Artboard: React.FC = () => {
  const canvasRef = useRef<CanvasHandles>(null);
  const [posted, setPosted] = useState(false);
  const [topic, setTopic] = useState<string>();
  const { data, refetch } = useRandomTopicsQuery();

  const onCreatePost = () => {
    if (!canvasRef.current) {
      return;
    }

    const mutation = canvasRef.current.createPost();
    if (!mutation) {
      return;
    }

    mutation.then(res => {
      if (!res.data || !res.data.createPost) {
        return;
      }

      setPosted(true);
    });
  };

  const CreatePostButton = (
    <Button
      className="tool-btn"
      icon="cloud-upload"
      type="primary"
      onClick={onCreatePost}
    >
      Publish
    </Button>
  );

  const ReselectButton = (
    <Popconfirm
      title="Choose another topic will clear your current drawing"
      okText="Clear and choose another topic"
      cancelText="Continue drawing"
      onConfirm={() => {
        setTopic(undefined);
        canvasRef.current && canvasRef.current.clear();
      }}
    >
      <Tooltip title="Switch Topic" placement="bottom">
        <Button icon="swap" shape="circle" className="tool-btn" />
      </Tooltip>
    </Popconfirm>
  );

  const BackButton = (
    <Popconfirm
      title="Back to index will clear your current drawing"
      okText="Back to index"
      cancelText="Continue drawing"
      onConfirm={() => (window.location.href = "/")}
    >
      <Tooltip title="Back to index" placement="bottom">
        <Button icon="close" shape="circle" className="tool-btn" />
      </Tooltip>
    </Popconfirm>
  );

  const size = Math.min(
    Math.min(window.screen.height, window.screen.width) * 0.7,
    450
  );

  const resultPage = (
    <div className="artboard-card" style={{ width: size, height: size }}>
      <Result
        status="success"
        title={`Successfully published your ${topic}!`}
        extra={[
          <Button onClick={() => (window.location.href = "/")}>
            Go To Main Page
          </Button>,
          <Button
            onClick={() => (window.location.href = "draw")}
            type="primary"
          >
            Draw a new one
          </Button>,
        ]}
      />
    </div>
  );

  const drawBoard = (
    <div className="artboard-card">
      <Typography.Text>
        Draw a{" "}
        <Typography.Text mark className="capitalize">
          {topic}
        </Typography.Text>
      </Typography.Text>
      <Canvas width={size} height={size} ref={canvasRef} topic={topic!} />
      <div>
        <UndoButton canvasRef={canvasRef} />
        <ClearButton canvasRef={canvasRef} />
      </div>
      <div>
        <DownloadButton canvasRef={canvasRef} />
        {ReselectButton}
        {BackButton}
        {CreatePostButton}
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
      {posted ? resultPage : topic ? drawBoard : topicSelection}
    </div>
  );
};

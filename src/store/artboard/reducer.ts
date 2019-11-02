import { ActionFunction, ArtboardCases } from "./types";

const stroke = (
  x: number,
  y: number,
  ctx: CanvasRenderingContext2D,
  color: string
) => {
  ctx.strokeStyle = color;
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
};

const draw: ActionFunction = (draft, { x, y, ctx }) => {
  if (!ctx || !draft.painting || !x || !y) {
    return;
  }
  const { color } = draft;
  stroke(x, y, ctx, color);
  draft.points.push({ x, y, mode: "draw", color });
};

const startDrawing: ActionFunction = (draft, payload) => {
  const { x, y, ctx } = payload;
  if (!x || !y || !ctx) {
    return;
  }
  const { color } = draft;
  draft.painting = true;
  draft.points.push({ x, y, mode: "begin", color });
  draw(draft, payload);
};

const stopDrawing: ActionFunction = (draft, { x, y, ctx }) => {
  if (!ctx || !x || !y) {
    return;
  }
  const { color } = draft;
  draft.painting = false;
  stroke(x, y, ctx, color);
  ctx.beginPath();
  draft.points.push({ x, y, mode: "end", color });
};

const mouseOutOfCanvas: ActionFunction = (draft, { x, y, ctx }) => {
  if (!ctx || !x || !y) {
    return;
  }
  const { color } = draft;
  draft.painting = false;
  ctx.beginPath();
  draft.points.push({ x, y, mode: "end", color });
};

const touchStopDrawing: ActionFunction = (draft, { ctx }) => {
  if (!ctx) {
    return;
  }
  const { x, y } = draft.points[draft.points.length - 1];
  const { color } = draft;
  draft.painting = false;
  stroke(x, y, ctx, color);
  ctx.beginPath();
  draft.points.push({ x, y, mode: "end", color });
};

const redraw: ActionFunction = (draft, { ctx }) => {
  if (!ctx) {
    return;
  }

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (const point of draft.points) {
    if (point.mode === "end") {
      ctx.beginPath();
      continue;
    }

    stroke(point.x, point.y, ctx, point.color);
  }
};

const switchColor: ActionFunction = (draft, { color }) => {
  if (!color) {
    return;
  }

  draft.color = color;
};

const undo: ActionFunction = (draft, payload) => {
  const { ctx } = payload;

  if (!ctx) {
    return;
  }

  for (let i = draft.points.length - 1; i >= 0; i--) {
    if (draft.points.pop()!.mode === "begin") {
      break;
    }
  }

  redraw(draft, payload);
};

const clear: ActionFunction = (draft, { ctx }) => {
  if (!ctx) {
    return;
  }

  draft.points = [];

  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
};

export const artboardCases: ArtboardCases = {
  DRAW: draw,
  START_DRAWING: startDrawing,
  STOP_DRAWING: stopDrawing,
  MOUSE_MOVE_OUT_OF_CANVAS: mouseOutOfCanvas,
  STOP_TOUCH_DRAWING: touchStopDrawing,
  SWITCH_COLOR: switchColor,
  UNDO: undo,
  CLEAR: clear,
};

import { ActionFunction, ArtboardCases } from "./types";

const stroke = (x: number, y: number, ctx: CanvasRenderingContext2D) => {
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
};

const draw: ActionFunction = (draft, { x, y, ctx }) => {
  if (!ctx || !draft.painting || !x || !y) {
    return;
  }
  stroke(x, y, ctx);
  draft.points.push({ x, y, mode: "draw" });
};

const startDrawing: ActionFunction = (draft, payload) => {
  const { x, y } = payload;
  if (!x || !y) {
    return;
  }
  draft.painting = true;
  draft.points.push({ x, y, mode: "begin" });
  draw(draft, payload);
};

const stopDrawing: ActionFunction = (draft, { x, y, ctx }) => {
  if (!ctx || !x || !y) {
    return;
  }
  draft.painting = false;
  ctx.beginPath();
  draft.points.push({ x, y, mode: "end" });
};

const redraw: ActionFunction = (draft, { ctx }) => {
  if (!ctx) {
    return;
  }

  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  for (const point of draft.points) {
    if (point.mode === "end") {
      ctx.beginPath();
      continue;
    }

    stroke(point.x, point.y, ctx);
  }
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

export const artboardCases: ArtboardCases = {
  DRAW: draw,
  START_DRAWING: startDrawing,
  STOP_DRAWING: stopDrawing,
  UNDO: undo,
};

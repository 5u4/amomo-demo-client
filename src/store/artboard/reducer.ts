import { ActionFunction, ArtboardCases } from "./types";

const stroke = (x: number, y: number, ctx: CanvasRenderingContext2D) => {
  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
};

const draw: ActionFunction = (draft, { x, y, ctx }) => {
  if (!ctx || !draft.painting) {
    return;
  }
  stroke(x, y, ctx);
  draft.points.push({ x, y, mode: "draw" });
};

const startDrawing: ActionFunction = (draft, payload) => {
  const { x, y } = payload;
  draft.painting = true;
  draft.points.push({ x, y, mode: "begin" });
  draw(draft, payload);
};

const stopDrawing: ActionFunction = (draft, { x, y, ctx }) => {
  if (!ctx) {
    return;
  }
  draft.painting = false;
  ctx.beginPath();
  draft.points.push({ x, y, mode: "end" });
};

export const artboardCases: ArtboardCases = {
  DRAW: draw,
  START_DRAWING: startDrawing,
  STOP_DRAWING: stopDrawing,
};

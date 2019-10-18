import { Draft } from "immer";
import { Cases } from "../../hooks/createImmerReducer";

export interface IPoint {
  x: number;
  y: number;
  mode: "begin" | "draw" | "end";
}

export interface IArtboardState {
  painting: boolean;
  points: IPoint[];
}

export interface IArtboardPayload {
  ctx?: CanvasRenderingContext2D;
  x?: number;
  y?: number;
}

export type ArtboardAction = "START_DRAWING" | "DRAW" | "STOP_DRAWING" | "UNDO";

export type ActionFunction = (
  d: Draft<IArtboardState>,
  payload: IArtboardPayload
) => void;

export type ArtboardCases = Cases<IArtboardState> &
  { [_ in ArtboardAction]: ActionFunction };

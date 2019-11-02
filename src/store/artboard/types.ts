import { Draft } from "immer";
import { Cases } from "../../hooks/createImmerReducer";

export interface IPoint {
  x: number;
  y: number;
  mode: "begin" | "draw" | "end";
  color: string;
}

export interface IArtboardState {
  painting: boolean;
  points: IPoint[];
  color: string;
}

export interface IArtboardPayload {
  ctx?: CanvasRenderingContext2D;
  x?: number;
  y?: number;
  color?: string;
}

export type ArtboardAction =
  | "START_DRAWING"
  | "DRAW"
  | "STOP_DRAWING"
  | "MOUSE_MOVE_OUT_OF_CANVAS"
  | "STOP_TOUCH_DRAWING"
  | "SWITCH_COLOR"
  | "UNDO"
  | "CLEAR";

export type ActionFunction = (
  d: Draft<IArtboardState>,
  payload: IArtboardPayload
) => void;

export type ArtboardCases = Cases<IArtboardState> &
  { [_ in ArtboardAction]: ActionFunction };

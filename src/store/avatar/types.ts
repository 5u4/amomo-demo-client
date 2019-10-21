import { Draft } from "immer";
import { IPieceType } from "../../components/avatar/Piece";
import { Cases } from "../../hooks/createImmerReducer";

export interface IAvatarState {
  layout: number;
  body: number;
  mouth: number;
  eyes: number;
}

export interface IAvatarPayload {
  piece?: IPieceType;
  amount?: number;
}

export type AvatarAction = "MOVE_PIECE";

export type ActionFunction = (
  d: Draft<IAvatarState>,
  payload: IAvatarPayload
) => void;

export type AvatarCases = Cases<IAvatarState> &
  { [_ in AvatarAction]: ActionFunction };

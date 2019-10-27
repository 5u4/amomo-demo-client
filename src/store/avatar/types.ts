import { Draft } from "immer";
import { IPieceType } from "../../components/avatar/Piece";
import { Cases } from "../../hooks/createImmerReducer";

export interface IAvatarState {
  layout: string;
  body: string;
  mouth: string;
  eyes: string;
}

export interface IAvatarPayload {
  piece?: IPieceType;
  select?: string;
}

export type AvatarAction = "SET_PIECE";

export type ActionFunction = (
  d: Draft<IAvatarState>,
  payload: IAvatarPayload
) => void;

export type AvatarCases = Cases<IAvatarState> &
  { [_ in AvatarAction]: ActionFunction };

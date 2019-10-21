import { IPieceType } from "../../components/avatar/Piece";
import { ActionFunction, AvatarCases } from "./types";

const PIECE_TOTALS: { [_ in IPieceType]: number } = {
  layout: 1,
  body: 3,
  mouth: 6,
  eyes: 6,
};

const movePiece: ActionFunction = (draft, { piece, amount }) => {
  if (!piece || !amount) {
    return;
  }

  draft[piece] = (draft[piece] + amount) % PIECE_TOTALS[piece];
};

export const avatarCases: AvatarCases = {
  MOVE_PIECE: movePiece,
};

import { ActionFunction, AvatarCases } from "./types";

const setPiece: ActionFunction = (draft, { piece, select }) => {
  if (!piece || !select) {
    return;
  }

  draft[piece] = select;
};

export const avatarCases: AvatarCases = {
  SET_PIECE: setPiece,
};

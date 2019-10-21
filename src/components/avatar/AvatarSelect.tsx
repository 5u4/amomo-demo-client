import React, { useCallback } from "react";
import { useAvatarDispatch, useAvatarSelector } from "../../store/avatar";
import { IPieceType, Piece } from "./Piece";

interface IProps {
  piece: IPieceType;
  size?: number;
}

const DEFAULT_SELECT_PIECE_SIZE = 32;

export const AvatarSelect: React.FC<IProps> = ({ piece, size }) => {
  const avatar = useAvatarSelector();
  const dispatch = useAvatarDispatch();

  const increment = useCallback(
    () => dispatch({ type: "MOVE_PIECE", payload: { piece, amount: 1 } }),
    [dispatch, piece]
  );

  const decrement = useCallback(
    () => dispatch({ type: "MOVE_PIECE", payload: { piece, amount: -1 } }),
    [dispatch, piece]
  );

  return (
    <div>
      <button onClick={decrement}>&lt;</button>
      <Piece
        type={piece}
        select={avatar[piece]}
        size={size || DEFAULT_SELECT_PIECE_SIZE}
        block
      />
      <button onClick={increment}>&gt;</button>
    </div>
  );
};

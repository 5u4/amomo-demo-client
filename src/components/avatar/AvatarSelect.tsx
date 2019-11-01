import { Button } from "antd";
import React, { useCallback } from "react";
import { useAvatarDispatch, useAvatarSelector } from "../../store/avatar";
import { IPieceType, Piece } from "./Piece";

interface IProps {
  piece: IPieceType;
  size?: number;
}

const DEFAULT_SELECT_PIECE_SIZE = 32;

const PIECE_SIZE = {
  layout: 1,
  body: 3,
  mouth: 6,
  eyes: 6,
};

export const AvatarSelect: React.FC<IProps> = ({ piece, size }) => {
  const avatar = useAvatarSelector();
  const dispatch = useAvatarDispatch();

  const makeSelect = useCallback(
    (n: number) =>
      (
        (Number.parseInt(avatar[piece]) + n + PIECE_SIZE[piece]) %
        PIECE_SIZE[piece]
      ).toString(),
    [avatar, piece]
  );

  const increment = useCallback(
    () =>
      dispatch({
        type: "SET_PIECE",
        payload: { piece, select: makeSelect(1) },
      }),
    [dispatch, piece, makeSelect]
  );

  const decrement = useCallback(
    () =>
      dispatch({
        type: "SET_PIECE",
        payload: { piece, select: makeSelect(-1) },
      }),
    [dispatch, piece, makeSelect]
  );

  return (
    <div>
      <Button onClick={decrement} type="link" icon="left" />
      <Piece
        type={piece}
        select={avatar[piece].toString()}
        size={size || DEFAULT_SELECT_PIECE_SIZE}
        block
      />
      <Button onClick={increment} type="link" icon="right" />
    </div>
  );
};

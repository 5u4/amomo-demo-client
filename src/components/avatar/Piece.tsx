import React from "react";

interface IProps {
  type: IPieceType;
  size: number;
  offset?: number;
  select?: string;
  zIndex?: number;
  block?: boolean;
}

export type IPieceType = "layout" | "body" | "mouth" | "eyes";

const DEAFULT_SELECTION = 0;
const DEFAULT_ZINDEX = 0;

export const Piece: React.FC<IProps> = ({
  type,
  select,
  size,
  offset,
  zIndex,
  block,
}) => {
  const src = `/avatars/${type}/${select || DEAFULT_SELECTION}.png`;

  return (
    <img
      className={block ? "block-piece" : "absolute-piece"}
      src={src}
      alt="Avatar Piece"
      height={size}
      width={size}
      style={{
        zIndex: zIndex || DEFAULT_ZINDEX,
        top: offset || 0,
        left: offset || 0,
      }}
      draggable={false}
    />
  );
};

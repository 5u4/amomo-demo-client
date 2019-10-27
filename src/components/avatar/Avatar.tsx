import React from "react";
import { Piece } from "./Piece";

interface IProps {
  size?: number;
  offset?: number;
  layout: number;
  body: number;
  mouth: number;
  eyes: number;
}

const DEFAULT_SIZE = 48;

export const Avatar: React.FC<IProps> = ({
  size,
  offset,
  layout,
  body,
  mouth,
  eyes,
}) => {
  const _size = size || DEFAULT_SIZE;

  const Body = (
    <Piece type="body" select={body} size={_size} zIndex={1} offset={offset} />
  );
  const Layout = (
    <Piece
      type="layout"
      select={layout}
      size={_size}
      zIndex={2}
      offset={offset}
    />
  );
  const Mouth = (
    <Piece
      type="mouth"
      select={mouth}
      size={_size}
      zIndex={3}
      offset={offset}
    />
  );
  const Eyes = (
    <Piece type="eyes" select={eyes} size={_size} zIndex={4} offset={offset} />
  );

  return (
    <div>
      {Body}
      {Layout}
      {Mouth}
      {Eyes}
    </div>
  );
};

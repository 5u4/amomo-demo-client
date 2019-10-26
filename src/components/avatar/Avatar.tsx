import React from "react";
import { Piece } from "./Piece";

interface IProps {
  size?: number;
  layout: number;
  body: number;
  mouth: number;
  eyes: number;
}

const DEFAULT_SIZE = 48;

export const Avatar: React.FC<IProps> = ({
  size,
  layout,
  body,
  mouth,
  eyes,
}) => {
  const _size = size || DEFAULT_SIZE;

  const Body = <Piece type="body" select={body} size={_size} zIndex={1} />;
  const Layout = (
    <Piece type="layout" select={layout} size={_size} zIndex={2} />
  );
  const Mouth = <Piece type="mouth" select={mouth} size={_size} zIndex={3} />;
  const Eyes = <Piece type="eyes" select={eyes} size={_size} zIndex={4} />;

  return (
    <div>
      {Body}
      {Layout}
      {Mouth}
      {Eyes}
    </div>
  );
};

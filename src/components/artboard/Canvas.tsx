import React, { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { IAction } from "../../hooks/createImmerReducer";
import { useEventListener } from "../../hooks/useEventListener";
import { ArtboardAction, IArtboardPayload } from "../../store/artboard/types";

const DEFAULT_LINE_WIDTH = 10;
const DEFAULT_LINE_CAP = "round";
const DEFAULT_CANVAS_SIZE = 450;

interface IProps {
  setCanvas?: React.Dispatch<
    React.SetStateAction<HTMLCanvasElement | undefined>
  >;
  width?: number;
  height?: number;
}

export const Canvas: React.FC<IProps> = ({ width, height, setCanvas }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | undefined>(undefined);
  const canvasRectRef = useRef<ClientRect | DOMRect | null>(null);
  const dispatch = useDispatch<
    Dispatch<IAction<ArtboardAction, IArtboardPayload>>
  >();

  useLayoutEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    if (setCanvas) {
      setCanvas(canvasRef.current);
    }
    canvasRectRef.current = canvasRef.current.getBoundingClientRect();
  }, [canvasRef, setCanvas]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    ctxRef.current = canvasRef.current.getContext("2d") || undefined;
    if (!ctxRef.current) {
      return;
    }
    ctxRef.current.lineWidth = DEFAULT_LINE_WIDTH;
    ctxRef.current.lineCap = DEFAULT_LINE_CAP;
  }, [canvasRef]);

  const makePayload = useCallback(
    (e: MouseEvent): IArtboardPayload => ({
      x: e.clientX - canvasRectRef.current!.left,
      y: e.clientY - canvasRectRef.current!.top,
      ctx: ctxRef.current,
    }),
    []
  );

  const startDrawing = useCallback(
    (e: MouseEvent) => {
      dispatch({
        type: "START_DRAWING",
        payload: makePayload(e),
      });
    },
    [dispatch, makePayload]
  );

  const draw = useCallback(
    (e: MouseEvent) => {
      dispatch({
        type: "DRAW",
        payload: makePayload(e),
      });
    },
    [dispatch, makePayload]
  );

  const stopDrawing = useCallback(
    (e: MouseEvent) => {
      dispatch({
        type: "STOP_DRAWING",
        payload: makePayload(e),
      });
    },
    [dispatch, makePayload]
  );

  useEventListener(canvasRef, "mousedown", startDrawing);
  useEventListener(canvasRef, "mousemove", draw);
  useEventListener(canvasRef, "mouseup", stopDrawing);
  useEventListener(canvasRef, "mouseleave", stopDrawing);

  return (
    <canvas
      ref={canvasRef}
      width={width || DEFAULT_CANVAS_SIZE}
      height={height || DEFAULT_CANVAS_SIZE}
    >
      Sorry your browser does not support canvas
    </canvas>
  );
};

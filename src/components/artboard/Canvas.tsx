import React, {
  Dispatch,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from "react";
import { useDispatch } from "react-redux";
import { IAction } from "../../hooks/createImmerReducer";
import { useEventListener } from "../../hooks/useEventListener";
import { ArtboardAction, IArtboardPayload } from "../../store/artboard/types";

interface IProps {
  width?: number;
  height?: number;
}

export interface CanvasHandles {
  download: () => void;
}

const DEFAULT_LINE_WIDTH = 10;
const DEFAULT_LINE_CAP = "round";
const DEFAULT_CANVAS_SIZE = 450;

const ForwardingCanvas: React.RefForwardingComponent<CanvasHandles, IProps> = (
  { width, height },
  ref
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | undefined>();
  const canvasRectRef = useRef<ClientRect | DOMRect | null>(null);

  const dispatch = useDispatch<
    Dispatch<IAction<ArtboardAction, IArtboardPayload>>
  >();

  /** Update canvas rect ref */
  useLayoutEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    canvasRectRef.current = canvasRef.current.getBoundingClientRect();
  }, [canvasRef]);

  /** Update canvas context ref */
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

  /** Drawing functions */
  const makePayload = useCallback(
    (e: MouseEvent): IArtboardPayload => ({
      x: e.clientX - canvasRectRef.current!.left,
      y: e.clientY - canvasRectRef.current!.top,
      ctx: ctxRef.current,
    }),
    [ctxRef]
  );

  const draw = useCallback(
    (e: MouseEvent) => dispatch({ type: "DRAW", payload: makePayload(e) }),
    [dispatch, makePayload]
  );

  const startDrawing = useCallback(
    (e: MouseEvent) =>
      dispatch({ type: "START_DRAWING", payload: makePayload(e) }),
    [dispatch, makePayload]
  );

  const stopDrawing = useCallback(
    (e: MouseEvent) =>
      dispatch({ type: "STOP_DRAWING", payload: makePayload(e) }),
    [dispatch, makePayload]
  );

  /** Register drawing events */
  useEventListener(canvasRef, "mousedown", startDrawing);
  useEventListener(canvasRef, "mousemove", draw);
  useEventListener(canvasRef, "mouseup", stopDrawing);
  useEventListener(canvasRef, "mouseleave", stopDrawing);

  /** Imperative handlers */
  const download = () => {
    if (!canvasRef.current) {
      return;
    }

    const link = document.createElement("a");
    link.download = "artboard.png"; // TODO: Use dynamic name
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  /** Handle imperative functions */
  useImperativeHandle(
    ref,
    () => ({
      download,
    }),
    []
  );

  return (
    <canvas
      width={width || DEFAULT_CANVAS_SIZE}
      height={height || DEFAULT_CANVAS_SIZE}
      ref={canvasRef}
    >
      Sorry your browser does not support canvas
    </canvas>
  );
};

export const Canvas = forwardRef(ForwardingCanvas);

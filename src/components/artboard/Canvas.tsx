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
  undo: () => void;
  clear: () => void;
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
    ctxRef.current.fillStyle = "white";
    ctxRef.current.fillRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    ctxRef.current.lineWidth = DEFAULT_LINE_WIDTH;
    ctxRef.current.lineCap = DEFAULT_LINE_CAP;
  }, [canvasRef]);

  /** Drawing functions */
  const makeDrawingPayload = useCallback(
    (e: MouseEvent): IArtboardPayload => {
      if (!canvasRectRef.current) {
        return {};
      }

      const x = e.clientX - canvasRectRef.current.left;
      const y = e.clientY - canvasRectRef.current.top;

      return { x, y, ctx: ctxRef.current };
    },
    [ctxRef]
  );

  const draw = useCallback(
    (e: MouseEvent) =>
      dispatch({ type: "DRAW", payload: makeDrawingPayload(e) }),
    [dispatch, makeDrawingPayload]
  );

  const startDrawing = useCallback(
    (e: MouseEvent) =>
      dispatch({ type: "START_DRAWING", payload: makeDrawingPayload(e) }),
    [dispatch, makeDrawingPayload]
  );

  const stopDrawing = useCallback(
    (e: MouseEvent) =>
      dispatch({ type: "STOP_DRAWING", payload: makeDrawingPayload(e) }),
    [dispatch, makeDrawingPayload]
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
    link.download = "artboard.jpg"; // TODO: Use dynamic name
    link.href = canvasRef.current.toDataURL("image/jpeg");
    link.click();
  };

  const undo = useCallback(
    () => dispatch({ type: "UNDO", payload: { ctx: ctxRef.current } }),
    [dispatch]
  );

  const clear = useCallback(
    () => dispatch({ type: "CLEAR", payload: { ctx: ctxRef.current } }),
    [dispatch]
  );

  /** Handle imperative functions */
  useImperativeHandle(
    ref,
    () => ({
      download,
      undo,
      clear,
    }),
    [undo, clear]
  );

  return (
    <canvas
      className="canvas"
      width={width || DEFAULT_CANVAS_SIZE}
      height={height || DEFAULT_CANVAS_SIZE}
      ref={canvasRef}
    >
      Sorry your browser does not support canvas
    </canvas>
  );
};

export const Canvas = forwardRef(ForwardingCanvas);

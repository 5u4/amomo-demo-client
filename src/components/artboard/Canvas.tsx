import { ExecutionResult } from "graphql";
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
import { useCreatePostMutation } from "../../graphql/post";
import { Mutation } from "../../graphql/types";
import { IAction } from "../../hooks/createImmerReducer";
import { useEventListener } from "../../hooks/useEventListener";
import { ArtboardAction, IArtboardPayload } from "../../store/artboard/types";

interface IProps {
  width?: number;
  height?: number;
  topic: string;
}

export interface CanvasHandles {
  download: () => void;
  undo: () => void;
  clear: () => void;
  createPost: () => Promise<ExecutionResult<Mutation>> | undefined;
}

const DEFAULT_LINE_WIDTH = 10;
const DEFAULT_LINE_CAP = "round";
const DEFAULT_CANVAS_SIZE = 450;

const ForwardingCanvas: React.RefForwardingComponent<CanvasHandles, IProps> = (
  { width, height, topic },
  ref
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | undefined>();
  const canvasRectRef = useRef<ClientRect | DOMRect | null>(null);
  const [createPostMutation] = useCreatePostMutation();

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
      if (!canvasRectRef.current || !ctxRef.current) {
        return {};
      }

      let x: number;
      let y: number;

      const offsetX =
        canvasRectRef.current.left - document.documentElement.scrollLeft;
      const offsetY =
        canvasRectRef.current.top - document.documentElement.scrollTop;

      if (window.TouchEvent && e instanceof TouchEvent) {
        x = e.touches[0].clientX - offsetX;
        y = e.touches[0].clientY - offsetY;
      } else {
        x = e.clientX - offsetX;
        y = e.clientY - offsetY;
      }

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

  const moveOutOfCanvas = useCallback(
    (e: MouseEvent) =>
      dispatch({
        type: "MOUSE_MOVE_OUT_OF_CANVAS",
        payload: makeDrawingPayload(e),
      }),
    [dispatch, makeDrawingPayload]
  );

  const stopTouchDrawing = useCallback(
    () =>
      dispatch({
        type: "STOP_TOUCH_DRAWING",
        payload: { ctx: ctxRef.current },
      }),
    [dispatch]
  );

  /** Register drawing events */
  useEventListener(canvasRef, "mousedown", startDrawing);
  useEventListener(canvasRef, "mousemove", draw);
  useEventListener(canvasRef, "mouseup", stopDrawing);
  useEventListener(canvasRef, "mouseleave", moveOutOfCanvas);

  useEventListener(canvasRef, "touchstart", startDrawing);
  useEventListener(canvasRef, "touchmove", draw);
  useEventListener(canvasRef, "touchend", stopTouchDrawing);

  /** Imperative handlers */
  const download = useCallback(() => {
    if (!canvasRef.current) {
      return;
    }

    const link = document.createElement("a");
    link.download = `${topic}.jpg`;
    link.href = canvasRef.current.toDataURL("image/jpeg");
    link.click();
  }, [topic]);

  const undo = useCallback(
    () => dispatch({ type: "UNDO", payload: { ctx: ctxRef.current } }),
    [dispatch]
  );

  const clear = useCallback(
    () => dispatch({ type: "CLEAR", payload: { ctx: ctxRef.current } }),
    [dispatch]
  );

  const createPost = useCallback(() => {
    if (!canvasRef.current) {
      return;
    }

    const data = canvasRef.current
      .toDataURL("image/jpeg")
      .replace("data:image/jpeg;base64,", "");

    return createPostMutation({ variables: { input: { data, topic } } });
  }, [canvasRef, createPostMutation, topic]);

  /** Handle imperative functions */
  useImperativeHandle(
    ref,
    () => ({
      download,
      undo,
      clear,
      createPost,
    }),
    [undo, clear, createPost, download]
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

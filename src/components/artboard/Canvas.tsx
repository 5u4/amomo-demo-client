import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { useEventListener } from "../../hooks/useEventListener";
import { useImmer } from "../../hooks/useImmer";

interface IPoint {
  x: number;
  y: number;
  mode: "begin" | "drawing" | "end";
}

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

const stroke = (x: number, y: number, ctx?: CanvasRenderingContext2D) => {
  if (!ctx) {
    return;
  }

  ctx.lineTo(x, y);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, y);
};

const getMouseXY = (e: MouseEvent, canvasRect: ClientRect | DOMRect) => {
  return {
    x: e.clientX - canvasRect.left,
    y: e.clientY - canvasRect.top,
  };
};

const ForwardingCanvas: React.RefForwardingComponent<CanvasHandles, IProps> = (
  { width, height },
  ref
) => {
  const [drawing, setDrawing] = useState(false);
  // eslint-disable-next-line
  const [points, updatePoints] = useImmer<IPoint[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | undefined>();
  const canvasRectRef = useRef<ClientRect | DOMRect | null>(null);

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
  const draw = (e: MouseEvent) => {
    if (!drawing || !canvasRectRef.current || !ctxRef.current) {
      return;
    }

    const { x, y } = getMouseXY(e, canvasRectRef.current);
    stroke(x, y, ctxRef.current);
    updatePoints(d => {
      d.push({ x, y, mode: "drawing" });
    });
  };

  const startDrawing = (e: MouseEvent) => {
    if (!canvasRectRef.current) {
      return;
    }

    const { x, y } = getMouseXY(e, canvasRectRef.current);
    setDrawing(true);
    updatePoints(d => {
      d.push({ x, y, mode: "begin" });
    });

    draw(e);
  };

  const stopDrawing = (e: MouseEvent) => {
    if (!ctxRef.current || !canvasRectRef.current) {
      return;
    }

    const { x, y } = getMouseXY(e, canvasRectRef.current);
    setDrawing(false);
    ctxRef.current.beginPath();
    updatePoints(d => {
      d.push({ x, y, mode: "end" });
    });
  };

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

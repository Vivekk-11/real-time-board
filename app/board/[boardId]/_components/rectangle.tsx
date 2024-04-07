import { RectangleLayer } from "@/types/canvas";
import React from "react";

interface Props {
  id: string;
  layer: RectangleLayer;
  onPointerDown: (event: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Rectangle = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: Props) => {
  const { x, y, width, height, fill } = layer;

  return (
    <rect
      x={0}
      y={0}
      width={width}
      height={height}
      className="drop-shadow-md"
      onPointerDown={(event) => onPointerDown(event, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      strokeWidth={1}
      stroke="transparent"
      fill="#000"
    />
  );
};

import { getSvgPathFromStroke } from "@/lib/utils";
import getStroke from "perfect-freehand";

interface Props {
  id: string;
  x: number;
  y: number;
  fill: string;
  points: number[][];
  onPointerDown: (event: React.PointerEvent, id: string) => void;
  stroke?: string;
}

export const Path = ({
  x,
  y,
  fill,
  points,
  stroke,
  onPointerDown,
  id,
}: Props) => {
  return (
    <path
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 16,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5,
        })
      )}
      x={0}
      y={0}
      style={{ transform: `translate(${x}px, ${y}px)` }}
      fill={fill}
      stroke={stroke}
      strokeWidth={1}
    />
  );
};

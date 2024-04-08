import { colorToCss } from "@/lib/utils";
import { EllipseLayer } from "@/types/canvas";

interface Props {
  id: string;
  layer: EllipseLayer;
  onPointerDown: (event: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Ellipse = ({
  id,
  layer,
  onPointerDown,
  selectionColor,
}: Props) => {
  const { x, y, width, height, fill } = layer;

  return (
    <ellipse
      className="drop-shadow-md"
      onPointerDown={(event) => onPointerDown(event, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      cx={width / 2}
      cy={height / 2}
      rx={width / 2}
      ry={height / 2}
      fill={fill ? colorToCss(fill) : "#000"}
      stroke={selectionColor || "transparent"}
      strokeWidth="1"
    />
  );
};

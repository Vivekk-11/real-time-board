import { connectionIdToColor } from "@/lib/utils";
import { useOther } from "@/liveblocks.config";
import { MousePointer2 } from "lucide-react";
import { memo } from "react";

interface Props {
  connectionId: number;
}

export const Cursor = memo(({ connectionId }: Props) => {
  const info = useOther(connectionId, (user) => user.info);
  const cursor = useOther(connectionId, (user) => user.presence.cursor);
  if (!cursor) return null;
  const name = info?.name || "Teammate";
  const { x, y } = cursor;

  return (
    <foreignObject
      height={50}
      width={name.length * 10 + 24}
      className="drop-shadow-md relative"
      style={{
        transform: `translateX(${x}px) translateY(${y}px)`,
      }}
    >
      <MousePointer2
        className="h-5 w-5"
        style={{
          fill: connectionIdToColor(connectionId),
          color: connectionIdToColor(connectionId),
        }}
      />
      <div
        className="absolute left-5 px-1.5 py-0.5 rounded-md text-xs font-semibold text-white"
        style={{ backgroundColor: connectionIdToColor(connectionId) }}
      >
        {name}
      </div>
    </foreignObject>
  );
});

Cursor.displayName = "Cursor";

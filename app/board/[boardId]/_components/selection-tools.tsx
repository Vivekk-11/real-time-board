import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { useMutation, useSelf } from "@/liveblocks.config";
import { Camera, Color } from "@/types/canvas";
import { Dispatch, SetStateAction, memo } from "react";
import { ColorPicker } from "./color-picker";

interface Props {
  setLastUsedColor: Dispatch<SetStateAction<Color>>;
  camera: Camera;
}

export const SelectionTools = memo(({ setLastUsedColor, camera }: Props) => {
  const selection = useSelf((me) => me.presence.selection);

  const setFill = useMutation(
    ({ storage }, fill: Color) => {
      const liveLayers = storage.get("layers");
      setLastUsedColor(fill);
      selection.forEach((id) => {
        liveLayers.get(id)?.set("fill", fill);
      });
    },
    [setLastUsedColor, selection]
  );

  const selectionBounds = useSelectionBounds();
  if (!selectionBounds) return null;

  const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
  const y = selectionBounds.y + camera.y;

  return (
    <div
      className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
      style={{
        transform: `translate(
          calc(${x}px - 50%),
          calc(${y - 16}px - 100%)
        )`,
      }}
    >
      <ColorPicker onChange={setFill} />
      Selection Tools
    </div>
  );
});

SelectionTools.displayName = "SelectionTools";

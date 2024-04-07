"use client";

import { useState } from "react";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { CanvasMode, CanvasState } from "@/types/canvas";
import { useCanRedo, useCanUndo, useHistory } from "@/liveblocks.config";

interface Props {
  boardId: string;
}

export const Canvas = ({ boardId }: Props) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });

  const canRedo = useCanRedo();
  const canUndo = useCanUndo();
  const history = useHistory();

  return (
    <main className="bg-neutral-100 touch-none relative w-full h-full">
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
    </main>
  );
};

"use client";

import React, { useCallback, useState } from "react";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import { Camera, CanvasMode, CanvasState } from "@/types/canvas";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
} from "@/liveblocks.config";
import { CursorsPresence } from "./cursors-presence";
import { pointerEventToCanvasPoint } from "@/lib/utils";

interface Props {
  boardId: string;
}

export const Canvas = ({ boardId }: Props) => {
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  const canRedo = useCanRedo();
  const canUndo = useCanUndo();
  const history = useHistory();

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      const current = pointerEventToCanvasPoint(e, camera);
      setMyPresence({ cursor: current });
    },
    []
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => {
      return {
        x: camera.x - e.deltaX,
        y: camera.y - e.deltaY,
      };
    });
  }, []);

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
      <svg
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        className="h-[100vh] w-[100vw]"
      >
        <g>
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

"use client";

import React, { useCallback, useState } from "react";
import { nanoid } from "nanoid";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";
import {
  Camera,
  CanvasMode,
  CanvasState,
  Color,
  LayerType,
  Point,
} from "@/types/canvas";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useStorage,
} from "@/liveblocks.config";
import { CursorsPresence } from "./cursors-presence";
import { pointerEventToCanvasPoint } from "@/lib/utils";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";

interface Props {
  boardId: string;
}

const MAX_LAYERS = 100;

export const Canvas = ({ boardId }: Props) => {
  const layerIds = useStorage((root) => root.layerIds);
  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });

  const canRedo = useCanRedo();
  const canUndo = useCanUndo();
  const history = useHistory();

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Note
        | LayerType.Ellipse
        | LayerType.Text
        | LayerType.Rectangle,
      position: Point
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) return;
      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });
      liveLayerIds.push(layerId);
      //@ts-ignore
      liveLayers.set(layerId, layer);
      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: CanvasMode.None });
    },
    [lastUsedColor]
  );

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

  const onPointerUp = useMutation(
    ({}, e) => {
      const point = pointerEventToCanvasPoint(e, camera);
      if (canvasState.mode === CanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else {
        setCanvasState({ mode: CanvasMode.None });
      }

      history.resume();
    },
    [camera, canvasState, history, insertLayer]
  );

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
        onPointerUp={onPointerUp}
        className="h-[100vh] w-[100vw]"
      >
        <g style={{ transform: `translate(${camera.x}px, ${camera.y}px)` }}>
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={() => {}}
              selectionColor={"#000"}
            />
          ))}
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};

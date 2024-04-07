"use client";

import { useStorage } from "@/liveblocks.config";
import { LayerType } from "@/types/canvas";
import React from "react";
import { Rectangle } from "./rectangle";

interface Props {
  id: string;
  selectionColor?: string;
  onLayerPointerDown: (event: React.PointerEvent, layerId: string) => void;
}

export const LayerPreview = ({
  id,
  selectionColor,
  onLayerPointerDown,
}: Props) => {
  const layer = useStorage((root) => root.layers.get(id));

  if (!layer) return null;

  switch (layer.type) {
    case LayerType.Rectangle:
      return (
        <Rectangle
          id={id}
          layer={layer}
          selectionColor={selectionColor}
          onPointerDown={onLayerPointerDown}
        />
      );
    default:
      console.warn("Unknown layer type");
      return null;
  }
};

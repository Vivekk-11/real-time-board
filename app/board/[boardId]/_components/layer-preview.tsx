"use client";

import { useStorage } from "@/liveblocks.config";
import { LayerType } from "@/types/canvas";
import React from "react";
import { Rectangle } from "./rectangle";
import { Ellipse } from "./ellispse";
import { Text } from "./text";
import { Note } from "./note";
import { Path } from "./path";
import { colorToCss } from "@/lib/utils";

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
    case LayerType.Path:
      return (
        <Path
          id={id}
          onPointerDown={onLayerPointerDown}
          x={layer.x}
          y={layer.y}
          fill={layer.fill ? colorToCss(layer.fill) : "#000"}
          points={layer.points}
          stroke={selectionColor}
        />
      );
    case LayerType.Note:
      return (
        <Note
          id={id}
          layer={layer}
          selectionColor={selectionColor}
          onPointerDown={onLayerPointerDown}
        />
      );
    case LayerType.Text:
      return (
        <Text
          id={id}
          layer={layer}
          selectionColor={selectionColor}
          onPointerDown={onLayerPointerDown}
        />
      );
    case LayerType.Ellipse:
      return (
        <Ellipse
          id={id}
          layer={layer}
          selectionColor={selectionColor}
          onPointerDown={onLayerPointerDown}
        />
      );
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

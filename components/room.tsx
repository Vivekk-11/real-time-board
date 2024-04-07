"use client";

import { ClientSideSuspense } from "@liveblocks/react";
import { RoomProvider } from "@/liveblocks.config";
import { ReactNode } from "react";
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "@/types/canvas";

interface Props {
  children: React.ReactNode;
  roomId: string;
  fallback: NonNullable<ReactNode> | null;
}

export const Room = ({ children, roomId, fallback }: Props) => {
  return (
    <RoomProvider
      id={roomId}
      initialPresence={{ cursor: null, selection: [] }}
      initialStorage={{
        layers: new LiveMap<string, LiveObject<Layer>>(),
        layerIds: new LiveList(),
      }}
    >
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};

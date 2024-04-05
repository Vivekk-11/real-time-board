"use client";

import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

interface Props {
  boardId: string;
}

export const Canvas = ({ boardId }: Props) => {
  return (
    <main className="bg-neutral-100 touch-none relative w-full h-full">
      <Info />
      <Participants />
      <Toolbar />
    </main>
  );
};

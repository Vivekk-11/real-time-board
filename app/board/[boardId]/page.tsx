import React from "react";
import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { Loading } from "./_components/loading";

interface Props {
  params: {
    boardId: string;
  };
}

const BoardIdPage = ({ params: { boardId } }: Props) => {
  return (
    <Room roomId={boardId} fallback={<Loading />}>
      <Canvas boardId={boardId} />;
    </Room>
  );
};

export default BoardIdPage;

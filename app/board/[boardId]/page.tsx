import React from "react";
import { Canvas } from "./_components/canvas";

interface Props {
  boardId: string;
}

const BoardIdPage = ({ boardId }: Props) => {
  return <Canvas boardId={boardId} />;
};

export default BoardIdPage;

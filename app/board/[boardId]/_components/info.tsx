"use client";

import { Actions } from "@/components/actions";
import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useRenameModal } from "@/store/use-rename-modal";
import { useQuery } from "convex/react";
import { Menu } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

interface Props {
  boardId: string;
}

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const TabSeparator = () => {
  return <div className="px-1.5 text-neutral-300">|</div>;
};

export const Info = ({ boardId }: Props) => {
  const { onOpen } = useRenameModal();
  const data = useQuery(api.board.get, {
    id: boardId as Id<"boards">,
  });

  if (!data) return <InfoSkeleton />;

  return (
    <div className="absolute top-2 left-2 bg-white rounded-md h-12 px-1.5 flex items-center shadow-md">
      <Hint label="Go to boards" side="bottom" sideOffset={10}>
        <Button asChild variant="board" className="px-2">
          <Link href="/">
            <Image src="/logo.svg" alt="Logo" height={40} width={40} />
            <span
              className={cn(
                "text-xl font-semibold ml-2 text-black",
                font.className
              )}
            >
              Board
            </span>
          </Link>
        </Button>
      </Hint>
      <TabSeparator />
      <Hint label="Edit title" side="bottom" sideOffset={10}>
        <Button
          onClick={() => onOpen(data._id, data.title)}
          variant="board"
          className="text-base font-normal px-2"
        >
          {data.title}
        </Button>
      </Hint>
      <TabSeparator />
      <Actions side="bottom" sideOffset={10} title={data.title} id={data._id}>
        <div>
          <Hint label="Main Menu" side="bottom" sideOffset={10}>
            <Button variant="board">
              <Menu />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export const InfoSkeleton = () => {
  return (
    <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]" />
  );
};

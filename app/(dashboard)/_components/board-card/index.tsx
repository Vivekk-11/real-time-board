"use client";

import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { Footer } from "./footer";

interface Props {
  id: string;
  title: string;
  imageUrl: string;
  authorId: string;
  authorName: string;
  orgId: string;
  createdAt: number;
  isFavorite: boolean;
}

export const BoardCard = ({
  id,
  title,
  imageUrl,
  authorId,
  authorName,
  orgId,
  createdAt,
  isFavorite,
}: Props) => {
  const { userId } = useAuth();

  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-50">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <Overlay />
        </div>
        <Footer
          disabled={false}
          onClick={() => {}}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          isFavorite={isFavorite}
          title={title}
        />
      </div>
    </Link>
  );
};

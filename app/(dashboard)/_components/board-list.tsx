"use client";

import { EmptyBoards } from "./empty-boards";
import { EmptyFavorites } from "./empty-favorites";
import { EmptySearch } from "./empty-search";

interface Props {
  orgId: string;
  query: {
    favorites?: string;
    search?: string;
  };
}

export const BoardList = ({ query }: Props) => {
  const data = []; // TODO: change this to API call

  if (!data?.length && query.search) {
    return <EmptySearch />;
  }

  if (!data?.length && query.favorites) {
    return <EmptyFavorites />;
  }

  if (!data?.length) {
    return <EmptyBoards />;
  }

  return <div>Board List</div>;
};

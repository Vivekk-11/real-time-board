import { List } from "./list";
import { NewButton } from "./new-button";

export const Sidebar = () => {
  return (
    <aside className="fixed left-0 z-[1] bg-blue-950 h-full text-white flex flex-col gap-y-4 w-[60px] p-3">
      <List />
      <NewButton />
    </aside>
  );
};

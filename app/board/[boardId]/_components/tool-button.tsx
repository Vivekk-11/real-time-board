"use client";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface Props {
  icon: LucideIcon;
  label: string;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

export const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
}: Props) => {
  return (
    <Hint label={label} side="right" sideOffset={10}>
      <Button
        disabled={isDisabled}
        variant={isActive ? "boardActive" : "board"}
        onClick={onClick}
        size="icon"
      >
        <Icon />
      </Button>
    </Hint>
  );
};

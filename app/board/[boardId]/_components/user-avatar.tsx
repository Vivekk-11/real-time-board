import { Hint } from "@/components/hint";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Props {
  name?: string;
  src?: string;
  fallback?: string;
  borderColor?: string;
}

export const UserAvatar = ({ name, src, fallback, borderColor }: Props) => {
  return (
    <Hint label={name || "Teammate"} side="bottom" sideOffset={18}>
      <Avatar className="h-8 w-8 border-2" style={{ borderColor }}>
        <AvatarImage src={src} />
        <AvatarFallback className="font-semibold text-xs">
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
};

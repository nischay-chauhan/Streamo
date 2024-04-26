import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LiveBadge } from "./live-badge";

interface UserAvatarProps {
    username: string;
    imageUrl: string;
    isLive?: boolean;
    showBadge?: boolean;
}

export const UserAvatar = ({
    username,
    imageUrl,
    isLive,
    showBadge
}: UserAvatarProps) => {
    return (
        <div className="relative ">
            <div className="relative">
                <Avatar className={cn(
                    isLive && "ring ring-red-500 ring-offset-1",
                )}>
                    <AvatarImage src={imageUrl} className="object-cover" alt="User Avatar" />
                    <AvatarFallback>
                        {username[0].toUpperCase()}
                        {username[username.length - 1]}
                    </AvatarFallback>
                </Avatar>
                {isLive && showBadge && (
                    <div className="absolute left-1/2 -bottom-3 transform -translate-x-1/2  transform-translate-x-1/2">
                        <LiveBadge />
                    </div>
                )}
            </div>
        </div>
    );
};

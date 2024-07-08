"use client"
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LiveBadge } from "./live-badge";
import { Skeleton } from "./ui/skeleton";
import { useSidebar } from "@/store/use-sidebar";

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
    const {collapsed} = useSidebar((state) => state);
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
                {isLive && collapsed && showBadge && (
                    <div className="absolute left-1/2 -bottom-3 transform -translate-x-1/2  transform-translate-x-1/2">
                        <LiveBadge />
                    </div>
                )}
            </div>
        </div>
    );
};

interface UserAvatarSkeletonProps extends UserAvatarProps {
    size : number
}

export const UserAvatarSkeleton = ({
    size
}: UserAvatarSkeletonProps) => {
    return (
        <Skeleton className={cn("rounded-full", "w-" + size, "h-" + size)} />
    );
};
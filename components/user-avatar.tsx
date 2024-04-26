import { cva , type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { Avatar , AvatarFallback , AvatarImage } from "./ui/avatar";
import { VariableIcon } from "lucide-react";
interface UserAvatarProps {
    username : string;
    imageUrl : string;
    isLive?: boolean;
    showBadge?: boolean;
}

export const UserAvatar = ({
    username,
    imageUrl,
    isLive,
    showBadge
} : UserAvatarProps) => {
    const canShowBadge = isLive && showBadge;
    return(
        <div className="relative">
            <Avatar className={cn(
                isLive && "ring ring-red-500 ring-offset-1",
            )}>
                <AvatarImage src={imageUrl} className="object-cover" alt="User Avatar" />
            </Avatar>
        </div>
    )
}
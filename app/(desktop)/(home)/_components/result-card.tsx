import { LiveBadge } from "@/components/live-badge";
import { ThumbNail, ThumbnailSkeleton } from "@/components/thumb-nail";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";
import { Stream, User } from "@prisma/client";
import Link from "next/link";

interface ResultCardsProps {
    data : {
        user : User
        name : string
        thumbnailUrl : string | null
        isLive : boolean
    }
}

export const ResultCard = ({data} : ResultCardsProps) => {
    {console.log(data.isLive)}
    return(
       <Link href={`/${data.user.username}`}>
        <div className="h-full w-full space-y-4">
            <ThumbNail 
            src={data.thumbnailUrl}
            fallback={data.user?.imageUrl}
            isLive={data.isLive}
            username={data.user.username}
            />
            
           
            <div className="flex gap-x-3">
                <UserAvatar
                username={data.user.username}
                imageUrl={data.user.imageUrl}
                isLive={data.isLive}
                />
                <div className="flex flex-col text-sm overflow-hidden">
                <p className="truncate font-semibold hover:text-blue-500">
                    {data.name}
                </p>
                <p className="text-muted-foreground">
                    {data.user.username}
                </p>
                </div>

            </div>
        </div>
       </Link>
    )
}

export const ResultCardSkeleton = () => {
    return(
        <div className="h-full w-full space-y-4">
            <ThumbnailSkeleton />
            <div className="flex gap-x-3">
                <UserAvatarSkeleton imageUrl="" username="" size={36} />
            </div>
            <div className="flex flex-col gap-y-1">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-4 w-24" />
            </div>

        </div>
    )
}
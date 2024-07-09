import { VerifiedMark } from "@/components/stream/verified-mark";
import { ThumbNail, ThumbnailSkeleton } from "@/components/thumb-nail";
import { Skeleton } from "@/components/ui/skeleton";
import { Stream, User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";

interface ResultCardsProps{
    data : Stream & {user : User}
}

export const ResultCard = ({data} : ResultCardsProps) => {
    return(
       <Link href={`/${data.user.username}`}>
        <div className="w-full flex gap-x-4">
            <div className="relative h-[9rem] w-[16rem]">
                <ThumbNail
                src={data.thumbnailUrl}
                fallback={data.user?.imageUrl}
                username={data.user.username}
                isLive={data.isLive}
                />
            </div>
            <div className="space-y-1 ">
                <div className="flex items-center gap-x-2">
                    <p className="font-bold text-lg cursor-pointer hover:text-blue-600">{data.user.username}</p>
                    <VerifiedMark />
                </div>
                <p className="text-sm text-muted-foreground">
                    {data.name}
                </p>
                <p className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(data.createdAt) , {
                        addSuffix: true
                    })}
                </p>
            </div>

        </div>
       </Link>
    )
}

export const ResultCardSkeleton =   () => {
    return(
        <div className="w-full flex gap-x-4">
            <div className="relative h-[9rem] w-[16rem]">
                <ThumbnailSkeleton />
            </div>
            <div className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-12" />
            </div>
        </div>
    )
}
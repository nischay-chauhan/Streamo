import Image from "next/image"
import { UserAvatar } from "./user-avatar"
import { Skeleton } from "./ui/skeleton"

interface ThumbNailProps {
    src : string | null
    fallback : string
    username : string
    isLive : boolean
}

export const ThumbNail = ({src, fallback, username, isLive} : ThumbNailProps) => {
    let content ;
    if(!src){
        content = (
            <div className="bg-background flex flex-col items-center justify-center gap-y-4 w-full h-full transition-transform group-hover:translate-x-2 group-hover:translate-y-1 rounded-md">
                <UserAvatar 
                showBadge
                username={username}
                imageUrl={fallback}
                isLive={isLive}
                />
            </div>
        )
    }else{
        content = (
            <Image
            src={src}
            alt="thumbnail"
            fill
            className="object-cover transition-transform group-hover:translate-x-2 group-hover:translate-y-1 rounded-md"
            />
        )
    }
    return (
        <div className="group aspect-video relative rounded-md cursor-pointer">
            <div className="rounded-md h-full absolute inset-0 bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            </div>
            {content}
        </div>
    )
}


export const ThumbnailSkeleton = () => {
    return(
        <div className="group aspect-video relative rounded-xl cursor-pointer">
            <Skeleton className="h-full w-full" />
        </div>
    )
}
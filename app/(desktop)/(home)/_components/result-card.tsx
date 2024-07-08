import { ThumbNail } from "@/components/thumb-nail";
import { Stream, User } from "@prisma/client";
import Link from "next/link";

interface ResultCardsProps {
    data : Stream & {user : User};
}

export const ResultCard = ({data} : ResultCardsProps) => {
    return(
       <Link href={`/u/${data.user.username}`}>
        <div className="h-full w-full space-y-4">
            <ThumbNail 
            src={data.thumbnailUrl}
            fallback={data.user?.imageUrl}
            isLive={data.isLive}
            username={data.user.username}
            />
        </div>
       </Link>
    )
}
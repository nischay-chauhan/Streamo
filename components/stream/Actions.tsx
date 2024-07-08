"use client"

import { useAuth } from "@clerk/nextjs"
import { Button } from "../ui/button"
import { Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { OnFollow , UnFollowUser } from "@/actions/follow"
import { toast } from "sonner"
import { Skeleton } from "../ui/skeleton"
interface ActionInterface{
    hostIdentity : string
    isFollowing : boolean
    isHost : boolean
}

export const Actions = ({isFollowing , hostIdentity , isHost}: ActionInterface) => {
    const [isPending , startTransition] = useTransition();
    const router = useRouter();
    const { userId } = useAuth();
    const handleFollow = () => {
       startTransition(() => {
        OnFollow(hostIdentity).then((data) => toast.success(`You are follwing ${data?.following.username}`)).catch(() => toast.error("Error following"))
       })
    }

    const handleUnfollow = () => {
        startTransition(() => {
            UnFollowUser(hostIdentity).then((data) => toast.success(`You have UnFollowed  ${data?.following.username}`)).catch(() => toast.error("Error following"))
        })
    }
    const toggleFollow = () => {
        if(!userId){
            return router.push("/sign-in")
        }
        if(isHost) return;

        if(isFollowing){
            handleUnfollow()
        }else{
            handleFollow()
        }
    }

    return(
        <Button onClick={toggleFollow} disabled={isPending || isHost} variant={'primary'} size={'sm'} className="w-full lg:w-auto">
            <Heart className= {cn("h-4 w-4 mr-2" , isFollowing ? "fill-white" : "fill-none")}/>
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    )
}


export const ActionSkeleton = () => {
    return(
        <Skeleton className="h-10 w-10 lg:w-32" />
    )
}
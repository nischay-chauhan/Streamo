"use client"
import { Button } from "@/components/ui/button"
import { OnFollow, UnFollowUser } from "@/actions/follow"
import { useTransition } from "react"
import { toast } from "sonner"


interface isFollowingUserProps {
    isFollowing: boolean;
    userId : string
}

export const Action = ({ isFollowing , userId }: isFollowingUserProps) => {
    const [isPending, startTranstion] = useTransition()

    const handleFollow = () => {
        startTranstion(() => { OnFollow(userId).then((data) => toast.success(`You are follwing ${data?.following.username}`  )).catch(() => toast.error("Error following")) })
    }
    const handleUnfollow = () => {
        startTranstion(() => { UnFollowUser(userId).then((data) => toast.success(`You have UnFollowed  ${data?.following.username}`  )).catch(() => toast.error("Error following")) })
    }
    const handleClick = () => {
        if(isFollowing){
            handleUnfollow()
        }else{
            handleFollow()
        }
    }
    return (
        <Button disabled={isPending} onClick={handleClick} variant={'primary'}>
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    )
}
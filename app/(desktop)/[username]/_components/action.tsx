"use client"
import { Button } from "@/components/ui/button"
import { OnFollow } from "@/actions/follow"
import { useTransition } from "react"
import { toast } from "sonner"


interface isFollowingUserProps {
    isFollowing: boolean;
    userId : string
}

export const Action = ({ isFollowing , userId }: isFollowingUserProps) => {
    const [isPending, startTranstion] = useTransition()
    const handleClick = () => {
        startTranstion(() => { OnFollow(userId).then((data) => toast.success(`You are follwing ${data?.following.username}`  )).catch(() => toast.error("Error following")) })
    }
    return (
        <Button disabled={isPending || isFollowing} onClick={handleClick} variant={'primary'}>
            Follow
        </Button>
    )
}
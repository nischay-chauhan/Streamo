"use client"
import { Button } from "@/components/ui/button"
import { OnFollow } from "@/actions/follow"
import { useTransition } from "react"


interface isFollowingUserProps {
    isFollowing: boolean
}

export const Action = ({ isFollowing }: isFollowingUserProps) => {
    const [isPending, startTranstion] = useTransition()
    const handleClick = () => {
        startTranstion(() => { OnFollow("123") })
    }
    return (
        <Button disabled={isPending || isFollowing} onClick={handleClick} variant={'primary'}>
            Follow
        </Button>
    )
}
'use client'

import { useSidebar } from "@/store/use-sidebar"
import { Follow, User } from "@prisma/client"
import { UserItem } from "./UserItem"

interface FollowingProps{
    data : (Follow & {
        following : User
    
    })[]
}
export const Following = ({data}:FollowingProps) => {
    const {collapsed} = useSidebar((state) => state)
    if(!data.length){
        return null
    }
    return(
        <div>
            <p className="text-sm ml-5 text-muted-foreground">
                Following
            </p>
            <ul className="space-y-2  px-2">
                {data.map((user) => (
                    <UserItem
                    key = {user.id}
                    username={user.following.username}
                    imageUrl = {user.following.imageUrl}
                    isLive = {true}
                    />
                ))}
            </ul>
        </div>
    )
}
"use server"

import { FollowUser, UnfollowUser } from "@/lib/follow-service"
import { revalidatePath } from "next/cache";

export const OnFollow = async (id: string) => {
    try{
        const followedUser = await FollowUser(id);
        revalidatePath("/");
        if(followedUser){
            revalidatePath(`/${followedUser.following.username}`)
        }
        return followedUser

    }catch(error){
        console.log(error)
    }
}

export const UnFollowUser = async (id: string) => {
    try{
        const unfollowedUser = await UnfollowUser(id);
        revalidatePath("/");
        if(unfollowedUser){
            revalidatePath(`/${unfollowedUser?.following?.username}`)
        }
        return unfollowedUser
    }catch(error){
        console.log(error)
    }
}
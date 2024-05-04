"use server"

import { FollowUser } from "@/lib/follow-service"
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
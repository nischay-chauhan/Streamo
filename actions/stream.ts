"use server"

import { revalidatePath } from "next/cache"
import { db } from "@/lib/db"
import { Stream } from "@prisma/client"
import { getLiveUser } from "@/lib/authService"

export const updateStream = async(values : Partial<Stream>) => {
    try{
        const self = await getLiveUser();
        const selfStream = await db.stream.findUnique({
            where : {
                userId : self.id
            }
        })
        if(!selfStream){
            throw new Error("Stream not found")
        }

        const validData = {
            name : values.name,
            isChatEnabled : values.isChatEnabled,
            isChatFollowersOnly : values.isChatFollowersOnly,
            isChatDelayed : values.isChatDelayed
            };

        const stream = await db.stream.update({
            where : {
                id : selfStream.id,
            },
            data : {
                ...validData
            }
        });

        revalidatePath(`/u/${self.username}/chat`)
        revalidatePath(`/u/${self.username}`)
        revalidatePath(`/${self.username}`)

        return stream

    }catch(error){
        throw new Error("Error updating stream")
    }
}
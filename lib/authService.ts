import { currentUser } from "@clerk/nextjs";
import { db } from "./db";

export const getLiveUser = async () => {
    const user = await currentUser();
    if(!user || !user.id){
        throw new Error("Unauthorized")
    }
    const liveUser = await db.user.findUnique({
        where : {
            externalUserId : user.id
        }
    }) 
    if(!liveUser){
        throw new Error("User not found")
    }
    return liveUser;
}

export const getSelfByUsername = async(username : string) => {
    const self = await currentUser();

    if(!self || !self.username){
        throw new Error("Unauthorized")
    }

    const user = await db.user.findUnique({
        where : {
            username
        }
    })
    if(!user){
        throw new Error("User not found")
    }

    if(self.username !== user.username){
        throw new Error("Unauthorized")
    }

    return user
}

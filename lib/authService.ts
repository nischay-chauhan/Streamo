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
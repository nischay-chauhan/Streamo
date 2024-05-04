import { db } from "./db";
import { getLiveUser } from "./authService";

export const isFollowingUser = async(id : string) => {
    try{
        const self = await getLiveUser();
        const otherUser = await db.user.findUnique({
            where : {id},
        })
        if(!otherUser){
            throw new Error("User not Found")
        }
        if(otherUser.id === self.id){
            return true;
        }
        

        const existingFollow = await db.follow.findFirst({
            where : {
                followerId : self.id,
                followingId : otherUser.id
            }
        })

        return !!existingFollow;
    }catch(error){
        console.log(error)
        return false;
    }
}
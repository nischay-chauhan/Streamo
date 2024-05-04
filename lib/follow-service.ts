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

export const FollowUser = async(id : string) => {
    const self = await getLiveUser();
    const otherUser = await db.user.findUnique({
        where : {id},
    })
    if(!otherUser){
        throw new Error("User not Found")
    }
    if(otherUser.id === self.id){
        throw new Error("Cannot follow yourself")
    }
    const follow = await db.follow.create({
        data : {
            followerId : self.id,
             followingId : otherUser.id
        },
        include : {
            following : true,
            follower : true,
        },
    })
    return follow

}

export const UnfollowUser = async(id : string) => {
    const self = await getLiveUser();
    const otherUser = await db.user.findUnique({
        where : {id},
    })
    if(!otherUser){
        throw new Error("User not Found")
    }
    if(otherUser.id === self.id){
        throw new Error("Cannot follow yourself")
    }
    const existingUnfollow = await db.follow.findFirst({
        where : {
            followerId : self.id,
            followingId : otherUser.id
        }
    })
    if(!existingUnfollow){
        throw new Error("You are not following this user")
    }
    const unfollow = await db.follow.delete({
        where : {
            followerId_followingId : {
                followerId : self.id,
                followingId : otherUser.id
            }
        }
    })
    
    return unfollow
}
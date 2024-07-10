import { db } from "./db";
import { getLiveUser } from "./authService";

export const isBlockedByUser = async(id : string) => {
    try{
       const self = await getLiveUser();
       const otherUser = await db.user.findUnique({
           where : {id},
       });
       if(!otherUser){
           throw new Error("User not Found")
       }
       if(otherUser.id === self.id){
           return false;
       }
       const existingBlock = await db.block.findUnique({
        where: {
            blockerId_blockedId:{
                blockerId : otherUser.id,
                blockedId : self.id,
    
            }
        }
       })
       return !!existingBlock;

    }catch(error){
        return false;
    }
}

export const BlockUser = async(id : string) => {
    const self = await getLiveUser();
    const otherUser = await db.user.findUnique({
        where : {id},
    })
    if(!otherUser){
        throw new Error("User not Found")
    }
    if(otherUser.id === self.id){
        throw new Error("Cannot block yourself")
    }
    const isBlocked  = await isBlockedByUser(otherUser.id);
    if(isBlocked){
        throw new Error("You are already blocked by this user")
    }
    const block = await db.block.create({
        data : {
            blockerId : self.id,
             blockedId : otherUser.id
        },
        include : {
            blocked : true,
            blocker : true,
    }})
    return block;
};

export const unblockUser = async(id : string) => {
    const self = await getLiveUser();
    const otherUser = await db.user.findUnique({
        where : {id},
    })
    console.log(id)
    if(!otherUser){
        throw new Error("User not Found")
    }
    if(otherUser.id === self.id){
        throw new Error("Cannot block yourself")
    }
    const existingUnblock = await db.block.findUnique({
        where : {
            blockerId_blockedId : {
             blockerId : self.id,
            blockedId : otherUser.id
            }
        }
    })
    if(!existingUnblock){
        throw new Error("You are not blocked by this user")
    }
    const unblock = await db.block.delete({
        where : {
            blockerId_blockedId : {
                blockerId : self.id,
                blockedId : otherUser.id
            },
            
        },
        include : {
            blocked : true, 
            blocker : true,
        },
    })
    return unblock
}



export const getAllBlockedUsers = async() => {
    const self = await getLiveUser();
    const blockedUsers = await db.block.findMany({
        where : {
            blockerId : self.id
        },
        include : {
            blocked : true,
        }
    });
    return blockedUsers
}
import { db } from "./db";
import { getLiveUser } from "./authService";

export const getRecommended = async() => { 
    let users;
    let userId;
    try{
        const self = await getLiveUser();
        userId = self.id
    }catch(error){
        userId = null
        console.log(error)
    }

    if(userId){
        users = await db.user.findMany({
        where : {
            NOT : {
                id : userId
            }
        },
        orderBy : {
            createdAt : "desc"
        }
    });
    }else{
         users = await db.user.findMany({
        orderBy : {
            createdAt : "desc"
        }
    });
    }

   

    return users;
}
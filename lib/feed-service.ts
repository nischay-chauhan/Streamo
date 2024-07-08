import { getLiveUser } from "./authService";
import { db } from "./db";

export const getStreams = async() => {
    let userId;

    try{
        const self = await getLiveUser();
        userId = self.id
    }catch{
        userId = null
    }
    let streams = []
    if(userId){
        streams = await db.stream.findMany({
           where: {
            user : {
                NOT : {
                    blocking : {
                        some : {
                            blockedId : userId
                        }
                    }
                }
            }
           },
           include : {
            user : true
           },
           orderBy : [
            {
                isLive : "desc",
            },
            {
                updatedAt : "desc"
            }
        ]
        })
    }else{
        streams = await db.stream.findMany({
            include : {
                user : true
            },
            orderBy : [
                {
                    isLive : "desc",
                },
                {
                    updatedAt : "desc"
                }
            ]
        })
    }
}
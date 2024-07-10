import { db } from "./db";
import { getLiveUser } from "./authService";

export const getSearch = async (term ?: string) => {
  let userId;
  try{
    const self = await getLiveUser();
    userId = self.id
  }catch{
    userId = null
  }
  let streams=[]
  if(userId){
    streams =  await db.stream.findMany({
        where : {
            user : {
                NOT : {
                    blocking : {
                        some : {
                            blockedId : userId
                        }
                    }
                }
            },
          OR : [
              {
                  name : {
                      contains : term
                    }
              },
              {
                  user : {
                      username : {
                          contains : term
                      }
                  }
              }
          ],
        },
        select : {
          user : true,
          id : true,
          name : true,
          thumbnailUrl : true,
          isLive : true,
          updatedAt : true
        },
        orderBy : [
          {
              isLive : 'desc'
          },
          {
              updatedAt : 'desc'
          }
        ]
        
      });
  }else{
    streams =  await db.stream.findMany({
      where : {
        OR : [
            {
                name : {
                    contains : term
                  }
            },
            {
                user : {
                    username : {
                        contains : term
                    }
                }
            }
        ],
      },
      select : {
        user : true,
        id : true,
        name : true,
        thumbnailUrl : true,
        isLive : true,
        updatedAt : true
      },
      orderBy : [
        {
            isLive : 'desc'
        },
        {
            updatedAt : 'desc'
        }
      ]
      
    });
  }

  return streams
}
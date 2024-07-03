import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service"
import { notFound } from "next/navigation"
import { Action } from "./_components/action";
import { isBlockedByUser } from "@/lib/block-Service";
import { StreamPlayer } from "@/components/stream";

interface UserPAgeProps {
    params : {
        username : string
    };
};


const UserPage = async({params} :  UserPAgeProps) => {
   const user = await getUserByUsername(params.username);
   if(!user || !user.stream){
    notFound();
   }
   const isFollowing = await isFollowingUser(user.id);
   const isBlokced = await isBlockedByUser(user.id);

   if(isBlokced){
    notFound();
   }


    return(
        <StreamPlayer
        user = {user}
        stream={user.stream}
        isFollowing={isFollowing}
        
        />
    )
}

export default UserPage
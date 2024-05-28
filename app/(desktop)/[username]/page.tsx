import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service"
import { notFound } from "next/navigation"
import { Action } from "./_components/action";
import { isBlockedByUser } from "@/lib/block-Service";

interface UserPAgeProps {
    params : {
        username : string
    };
};


const UserPage = async({params} :  UserPAgeProps) => {
   const user = await getUserByUsername(params.username);
   if(!user){
    notFound();
   }
   const isFollowing = await isFollowingUser(user.id);
   const isBlockedByThisUser = await isBlockedByUser(user.id);

  
    return(
        <div className="flex flex-col gap-y-4">
            <p>User Page {user.username}</p>
            <p>User Page {user.externalUserId}</p>
            <p>User Page {user.id}</p>
            <p>is Following : {isFollowing.toString()}</p>
            <p>is blocked by this user : {isBlockedByThisUser.toString()}</p>
            <Action userId={user.id} isFollowing={isFollowing}/>
        </div>
    )
}

export default UserPage
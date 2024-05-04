import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service"
import { notFound } from "next/navigation"
import { Action } from "./_components/action";

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

    return(
        <div className="flex flex-col gap-y-4">
            <p>User Page {user.username}</p>
            <p>User Page {user.externalUserId}</p>
            <p>User Page {user.id}</p>
            <p>is Following : {isFollowing.toString()}</p>
            <Action userId={user.id} isFollowing={isFollowing}/>
        </div>
    )
}

export default UserPage
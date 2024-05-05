import { BlockUser, unblockUser } from "@/lib/block-Service";
import { revalidatePath } from "next/cache";

export const onBlock = async (id: string) => {
    try{
        const blockedUser = await BlockUser(id);
        revalidatePath("/");
        if(blockedUser){
            revalidatePath(`/${blockedUser?.blocked?.username}`)
        }
        return blockedUser
    }catch(error){
        console.log(error)
    }
}

export const onuUnblockUser = async (id: string) => {
    try{
        const unblockedUser = await unblockUser(id);
        revalidatePath("/");
        if(unblockedUser){
            revalidatePath(`/${unblockedUser?.blocked?.username}`)
        }
        return unblockedUser
    }catch(error){
        console.log(error)
    }
}
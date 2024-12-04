"use server"
import { getLiveUser } from "@/lib/authService";
import { BlockUser, unblockUser } from "@/lib/block-Service";
import { RoomServiceClient } from "livekit-server-sdk";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
)

export const  onBlock = async (id: string) => {
        const self = await getLiveUser();
        let blockedUser;
        try{
            const blockedUser = await BlockUser(id);
        }catch(error){
            // use is guest
        }

        try{
            await roomService.removeParticipant(self.id , id)
        }catch(error){
            // iser is kicked out
            
        }
      
        revalidatePath(`/u/${self.username}/community`);
        
        return blockedUser
    
}

export const onuUnblockUser = async (id: string) => {
    try{
        const self = await getLiveUser();
        const unblockedUser = await unblockUser(id);
        revalidatePath("/");
        revalidatePath(`/u/${self.username}/community`);
        return unblockedUser
    }catch(error){
        console.log(error)
    }
}
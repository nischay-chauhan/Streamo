"use server"
import {IngressAudioEncodingPreset , IngressInput , IngressClient , IngressVideoEncodingPreset , RoomServiceClient, type CreateIngressOptions, IngressVideoOptions, IngressAudioOptions   } from "livekit-server-sdk"

import { TrackSource } from "livekit-server-sdk"
import { db } from "@/lib/db"
import { getLiveUser } from "@/lib/authService"
import { SelfDecodingBody } from "svix/dist/openapi"
import { revalidatePath } from "next/cache"

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!,
)

const ingressCLient = new IngressClient(process.env.LIVEKIT_API_URL!);

export const resetIngress = async(hostIdentity : string) => {
    const ingresses = await ingressCLient.listIngress({
        roomName : hostIdentity
    });

    const rooms = await roomService.listRooms([hostIdentity]);

    for(const room of rooms){
        await roomService.deleteRoom(room.name);
    }

    for(const i of ingresses){
        if(i.ingressId){
            await ingressCLient.deleteIngress(i.ingressId);
        }
    }
};

export const createIngress  = async (ingressType : IngressInput) => {
    const self = await getLiveUser()

    const options : CreateIngressOptions = {
        name : self.username,
        roomName : self.id,
        participantName : self.username,
        participantIdentity : self.id
        
    };

    if(ingressType === IngressInput.WHIP_INPUT){
        options.enableTranscoding = true;
    }else{
        options.video = new IngressVideoOptions({
            source : TrackSource.CAMERA,
            encodingOptions : {
                case : 'preset',
                value : IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
            },
        });

        options.audio =  new IngressAudioOptions({
            source : TrackSource.MICROPHONE,
            encodingOptions : {
                case : 'preset',
                value : IngressAudioEncodingPreset.OPUS_STEREO_96KBPS
            }
        })

    }    
    const ingress = await ingressCLient.createIngress(
        ingressType,
        options
    );

    if(!ingress || !ingress.url || !ingress.streamKey){
        throw new Error("Failed to create Ingress");
    }

    await db.stream.update({
        where : {userId : self.id},
        data : {
            ingressId : ingress.ingressId,
            serverUrl : ingress.url,
            streamKey : ingress.streamKey
        }
    });

    revalidatePath(`/u/${self.username}/keys`);

    return ingress

}
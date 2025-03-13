"use server";

import {
  IngressAudioEncodingPreset,
  IngressInput,
  IngressClient,
  IngressVideoEncodingPreset,
  RoomServiceClient,
  type CreateIngressOptions,
  IngressVideoOptions,
  IngressAudioOptions,
  TrackSource
} from "livekit-server-sdk";

import { db } from "@/lib/db";
import { getLiveUser } from "@/lib/authService";
import { revalidatePath } from "next/cache";

const roomService = new RoomServiceClient(
  process.env.LIVEKIT_API_URL!,
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

const ingressClient = new IngressClient(process.env.LIVEKIT_API_URL!);

// Helper function for retrying requests with exponential backoff
const retryWithBackoff = async <T>(fn: () => Promise<T>, maxRetries = 5): Promise<T> => {
  let retryCount = 0;
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  while (retryCount < maxRetries) {
    try {
      return await fn(); 
    } catch (error: any) {
      if (error?.code === 429 && retryCount < maxRetries) {
        const backoffTime = Math.pow(2, retryCount) * 100; // Exponential backoff
        console.warn(`Rate limit hit. Retrying in ${backoffTime}ms...`);
        await delay(backoffTime);
        retryCount++;
      } else {
        throw error; // Re-throw other errors
      }
    }
  }
  throw new Error("Max retries reached");
};


export const resetIngress = async (hostIdentity : string) => {
  console.log("in this function");

  const ingresses = await retryWithBackoff(() =>
    ingressClient.listIngress({ roomName: hostIdentity })
  );

  const rooms = await retryWithBackoff(() =>
    roomService.listRooms([hostIdentity])
  );

  if (rooms === null) {
    return;
  }

  for (const room of rooms) {
    await retryWithBackoff(() => roomService.deleteRoom(room.name));
  }

  for (const i of ingresses) {
    if (i.ingressId) {
      await retryWithBackoff(() => ingressClient.deleteIngress(i.ingressId));
    }
  }
};

export const createIngress = async (ingressType : IngressInput) => {
  const self = await getLiveUser();
  console.log(self);

  await resetIngress(self.id);
  console.log("After reset Ingress");

   const options : CreateIngressOptions = {
        name : self.username,
        roomName : self.id,
        participantName : self.username,
        participantIdentity : self.id
        
    };
    console.log(options)
    console.log(ingressType)
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

  const ingress = await retryWithBackoff(() =>
    ingressClient.createIngress(ingressType, options)
  );

  console.log(ingress);

  if (!ingress || !ingress.url || !ingress.streamKey) {
    throw new Error("Failed to create Ingress");
  }

  await db.stream.update({
    where: { userId: self.id },
    data: {
      ingressId: ingress.ingressId,
      serverUrl: ingress.url,
      streamKey: ingress.streamKey
    }
  });

  revalidatePath(`/u/${self.username}/keys`);
  return ingress;
};
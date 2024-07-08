import { headers } from "next/headers";
import { WebhookReceiver } from "livekit-server-sdk";
import { db } from "@/lib/db";

const reciever = new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
);

export async function POST(req : Request) {
    const body = await req.text();
    const headerPayload = headers();
    const authorization = headerPayload.get("Authorization");

    if(!authorization){
        return new Response("No aithorization header" , {status : 400})
    }

    const event = await reciever.receive(body , authorization);

    if(event.event === "ingress_ended"){
        await db.stream.update({
            where : {
                ingressId : event.ingressInfo?.ingressId,
            },
            data : {
                isLive : false,
            }
        })
    }

    if(event.event === "ingress_started"){
        await db.stream.update({
            where : {
                ingressId : event.ingressInfo?.ingressId,
            },
            data : {
                isLive : true,
            }
        })
    }

    return new Response("OK")
}
import { db } from "./db";

export const getStreamByUserId = async(userId : string) => {
    const stream = await db.stream.findUnique({
        where : {
            userId
        }
    })
    console.log(stream);
    return stream
}
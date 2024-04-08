import { db } from "./db";
import { getLiveUser } from "./authService";

export const getRecommended = async() => {
    const users = await db.user.findMany({
        orderBy : {
            createdAt : "desc"
        }
    });

    return users;
}
import { Stream, User } from "@prisma/client";

interface ResultCardsProps{
    data : Stream & {user : User}
}

export const ResultCard = ({data} : ResultCardsProps) => {
    return(
        <div>
            <p>{data.name}</p>
        </div>
    )
}
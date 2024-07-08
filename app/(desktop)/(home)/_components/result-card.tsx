import { Stream, User } from "@prisma/client";

interface ResultCardsProps {
    data : Stream & {user : User};
}

export const ResultCard = ({data} : ResultCardsProps) => {
    return(
        <div>
            <p className="font-semibold text-primary">
                {data.name}
            </p>
            <p className="text-sm text-muted-foreground">
                {data.user.username}
            </p>
        </div>
    )
}
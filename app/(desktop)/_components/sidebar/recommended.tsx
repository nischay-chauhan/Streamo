import {User} from "@prisma/client"
interface RecommendedProps{
    data : User[]
}

export const Recommended = ({data} : RecommendedProps) => {
    return (
        <div>
            Recommended Users
        </div>
    )
}
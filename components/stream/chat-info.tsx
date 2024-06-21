import { useMemo } from "react";
import { Info } from "lucide-react";
import { Hint } from "../hint";

interface ChatInfoProps{
    isDelayed : boolean;
    isFollowersOnly : boolean;
}

export const ChatInfo = ({isDelayed , isFollowersOnly} : ChatInfoProps) => {

    return(
        <div>
            Chat info 
        </div>
    )
}
import { useMemo } from "react";
import { Info } from "lucide-react";
import { Hint } from "../hint";

interface ChatInfoProps{
    isDelayed : boolean;
    isFollowersOnly : boolean;
}

export const ChatInfo = ({isDelayed , isFollowersOnly} : ChatInfoProps) => {
    const hint = useMemo(() => {
        if(isFollowersOnly && !isDelayed){
            return " Only Followers cna chat "
        }

        if(isDelayed && !isFollowersOnly){
            return "Messages are Delayed by 3 seconds"
        }

        if(isDelayed && isFollowersOnly){
            return "Messages are Delayed by 3 seconds and Followers only"
        }

        return ""
    }, [isDelayed , isFollowersOnly]);


    const label = useMemo(() => {
        if(isFollowersOnly && !isDelayed){
            return "Followers only"
        }

        if(isDelayed && !isFollowersOnly){
            return "Slow mode"
        }

        if(isDelayed && isFollowersOnly){
            return "followers only and slow mode"
        }

        if(!isDelayed && !isFollowersOnly){
            return null;
        }
    }, [isDelayed , isFollowersOnly]);

    return(
        <div className="p-2 text-muted-foreground border bg-white/5 border-white/10 w-full rounded-t-md items-center gap-x-2">
            <Hint
            label={hint}
            >
            <Info className="h-5 w-5" />
            </Hint>
            <p className="text-xs font-semibold">{label}</p>
            
        </div>
    )
}
"use client"

import { useParticipants } from "@livekit/components-react";
import { useState } from "react";
import { useDebounceValue } from "usehooks-ts";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { CommunityItem } from "./community-item";
interface ChatCommunityProps {
    hostName: string;
    viewerName: string;
    isHidden: boolean;
}

export const ChatCommunity = ({hostName , viewerName , isHidden}: ChatCommunityProps) =>  {
    const [value , setValue] = useState("");
    const debouncedValue = useDebounceValue<string>(value, 500);
    const participants = useParticipants();

    const onChange = (newValue : string) => {
        setValue(newValue)
    }

    if(isHidden){
        return(
            <div className="flex flex-1 mt-10 justify-center">
                <p className="text-sm text-muted-foreground">
                    Community is Disabled
                </p>
            </div>
        )
    }
    return(
        <div className="p-4 ">
            <Input 
            onChange={(e) => onChange(e.target.value)}
            value={value}
            placeholder="Search Community"
            />
            <ScrollArea className="gap-y-2 mt-4">
            <p className="text-center text-sm text-muted-foreground hidden last:block p-2">
                No result
            </p>
            {participants.map((participant) => (
                <CommunityItem
                key = {participant.identity}
                hostName = {hostName}
                viewerName = {viewerName}
                participantName = {participant.name}
                participantIdentity = {participant.identity}
                 />
            ))}
            </ScrollArea>
            
        </div>
    )
}
import { ReceivedChatMessage } from "@livekit/components-react";
import { ChatMessage } from "./chat-message";
import { Skeleton } from "../ui/skeleton";

interface ChatListProps{
    messages : ReceivedChatMessage[];
    isHidden : boolean;
};

export const ChatList = ({messages , isHidden} : ChatListProps) => {
    if(isHidden || !messages || messages.length === 0){
        return(
            <div className="flex flex-1 mt-10 justify-center">
                <p className="text-sm text-muted-foreground">
                    {isHidden ? "Chat is disabled" : " Welcome to Chat"}
                </p>

            </div>
        )
    }
    return(
        <div className="flex flex-1 flex-col-reverse overflow-auto-y h-full p-3">
            {messages.map((message) => (
                <ChatMessage
                key={message.timestamp}
                data={message}
                />
            ))}
        </div>
    )
}

export const ChatSkeleton = () => {
    return(
        <div className="flex justify-center items-center  h-full p-3">
            <Skeleton className="h-6 w-1/2"/>
        </div>
    )
}
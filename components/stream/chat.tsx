"use client"
import { ConnectionState } from "livekit-client"
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar"
import { useChat, useConnectionState, useRemoteParticipant } from "@livekit/components-react"
import { useMediaQuery } from "usehooks-ts"
import { useEffect, useMemo, useState } from "react"
import { ChatHeader } from "./chatHeader"
import { ChatForm } from "./chat-form"

interface ChatPRops{
    hostName : string
    viewerName : string
    hostIdentity : string
    isFollowing : boolean
    isChatEnabled : boolean
    isChatDelayed : boolean
    isChatFollowersOnly : boolean
}

export const Chat = ({hostName , viewerName , hostIdentity , isFollowing , isChatEnabled , isChatDelayed , isChatFollowersOnly}: ChatPRops) => {
    const matches = useMediaQuery("(max-width: 1024px)")
    const {variant , onExpand} = useChatSidebar((state) => state)
    const connectionState = useConnectionState();
    console.log(hostIdentity)
    const participant = useRemoteParticipant(hostIdentity);
    const isOnline = participant && connectionState === ConnectionState.Connected;

    

    const isHidden = !isChatEnabled || !isOnline;
    const {chatMessages: messages , send} = useChat();
    const [value , setValue] = useState("")
    console.log(isChatEnabled , isOnline , isHidden);

    useEffect(() => {
        if(matches){
            onExpand()
        }
    }, [matches , onExpand])

    const reversedMessages = useMemo(() => {
        return messages.sort((a , b) => b.timestamp - a.timestamp)
    }, [messages])

    const onSubmit = () => {
        if(!send) return ;

        send(value);
        setValue("");
    }

    const onChange = (value : string) => {
        setValue(value);
    }
    return (
        <div className="flex flex-col bg-background border-1 border-b pt-0 h-[calc(100vh-80px)]">
            <ChatHeader />
            {variant === ChatVariant.chat && (
                <>
                <ChatForm
                onSubmit = {onSubmit}
                value = {value}
                onChange = {onChange}
                isHidden = {isHidden}
                isFollowersOnly = {isChatFollowersOnly}
                isDelayed = {isChatDelayed}
                isFollowing = {isFollowing}
                />
                </>
            )}
            {variant === ChatVariant.COMMUNITY && (
                <>
                <p>Community mode </p>
                </>
            )}
        </div>
    )
}
"use client"

import { ReceivedChatMessage } from "@livekit/components-react"

interface ChatMessageProps {
    data: ReceivedChatMessage;
}

export const ChatMessage = ({ data }: ChatMessageProps) => {
    return (
        <div>
            Chat message
        </div>
    )
}

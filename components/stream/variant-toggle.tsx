"use client"

import { ArrowLeftFromLine , ArrowRightFromLine, MessageSquare, Users } from "lucide-react"
import { Hint } from "../hint"
import { Button } from "../ui/button"
import { ChatVariant, useChatSidebar } from "@/store/use-chat-sidebar"

export const VariantToggle = () => {
    const {variant , onChnageVariant} = useChatSidebar((state) => state) 
    const isChat = variant === ChatVariant.chat

    const Icon =  isChat ? Users : MessageSquare

   
    const onToggle = () => {
        const newVariant = isChat ? ChatVariant.COMMUNITY : ChatVariant.chat
        onChnageVariant(newVariant)
    }
    const label = isChat ? "Community" : "Go back to chat"

    return(
        <Hint
        label={label}
        side="right"
        asChild
        >
        <Button
        onClick={onToggle}
        variant={"ghost"}
        className="h-auto p-2 hover:bg-white/10 hover:text-primary rounded-lg bg-transparent"
        >
        <Icon className="h-4 w-4" />
        </Button>
        </Hint>
    )
}
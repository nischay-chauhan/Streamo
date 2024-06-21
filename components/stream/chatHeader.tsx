"use client"
import { Skeleton } from "../ui/skeleton"
import { ChatTogglel } from "./chat-toggle"
export const ChatHeader = () => {
    return(
        <div className="relative p-3 border-b">
           <div className="absolute hidden lg:block left-2 top-2">
           <ChatTogglel />
           </div>
            <p className="font-semibold  text-primary text-center">
            Stream Chat
            </p>

        </div>
    )
}

export const ChatHEaderSkeleton = () => {
    return(
        <div className="relative border-b p-3 hidden md:block">
            <Skeleton className="absolute h-6 w-6 left-3 top-3"/>
            <Skeleton className="h-6 w-28 mx-auto" />

        </div>
    )
}
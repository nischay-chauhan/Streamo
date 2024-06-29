'use client'

import { useViewerToken } from "@/hooks/use-viewer";
import { Stream, User } from "@prisma/client";
import { LiveKitRoom } from "@livekit/components-react";
import { Video, VideoSkeleton } from "./video";
import { cn } from "@/lib/utils";
import { useChatSidebar } from "@/store/use-chat-sidebar";
import { Chat, ChatSkeleton } from "./chat";
import { ChatTogglel } from "./chat-toggle";
import { Header, HeaderSkeleton } from "./header";
import { InfoCard } from "./info-card";

interface StreamPlayerProps {
    user: User & { stream: Stream | null };
    stream: Stream;
    isFollowing: boolean;
}

export const StreamPlayer = ({ user, stream, isFollowing }: StreamPlayerProps) => {
    const { token, name, identity } = useViewerToken(user.id);
    const { collapsed } = useChatSidebar((state) => state);

    if (!token || !name || !identity) {
        return <StreamPlayerSkeleton />
    }

    return (
        <>
            {collapsed && (
                <div className="hidden lg:block fixed top-[100px] right-2 z-50">
                    <ChatTogglel />
                </div>
            )}
            <LiveKitRoom
                token={token}
                serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_WS_URL}
                className={cn("grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full")}
            >
                <div className={cn(
                    "space-y-4 col-span-1 lg:overflow-y-auto hidden-scrollbar pb-10",
                    collapsed ? "lg:col-span-3 xl:col-span-5 2xl:col-span-6" : "lg:col-span-2 xl:col-span-2 2xl:col-span-4"
                )}>
                    <Video 
                        hostName={user.username}
                        hostIdentity={user.id}
                    />
                    <Header
                    hostName={user.username}
                    hostIdentity={user.id}
                    viewerIdentity={identity}
                    imageUrl = {user.imageUrl}
                    isFollowing = {isFollowing}
                    name = {stream.name}
                    />
                    <InfoCard
                    hostIdentity={user.id}
                    viewerIdentity={identity}
                    name={stream.name}
                    thumbnailUrl={stream.thumbnailUrl}
                    />
                </div>
                <div className={cn("col-span-1  lg:col-span-1 xl:col-span-1 2xl:col-span-2 ", collapsed && "hidden")}>
                    <Chat 
                        viewerName={name}
                        hostName={user.username}
                        hostIdentity={user.id}
                        isFollowing={isFollowing}
                        isChatEnabled={stream.isChatEnabled}
                        isChatDelayed={stream.isChatDelayed}
                        isChatFollowersOnly={stream.isChatFollowersOnly}
                    />
                </div>
            </LiveKitRoom>
        </>
    )
}

export const StreamPlayerSkeleton = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6 h-full">
            <div className="space-y-4 col-span-1 lg:col-span-2 xl:col-span-2 2xl:col-span-4 lg:overflow-y-auto hidden-scrollbar pb-10">
                <VideoSkeleton />
                <HeaderSkeleton />
            </div>
            <div className="col-span-1 lg:col-span-1 xl:col-span-1 2xl:col-span-2">
                <ChatSkeleton />
            </div>
        </div>
    );
};

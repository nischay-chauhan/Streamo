"use client"

import { useParticipants, useRemoteParticipant } from "@livekit/components-react"
import { UserAvatar, UserAvatarSkeleton } from "../user-avatar"
import { VerifiedMark } from "./verified-mark"
import { UserIcon } from "lucide-react"
import { Actions, ActionSkeleton } from "./Actions"
import { Skeleton } from "../ui/skeleton"

interface HeaderProps {
    hostName: string
    hostIdentity: string
    imageUrl : string
    viewerIdentity : string
    name : string
    isFollowing : boolean
}
export const Header = ({hostIdentity , hostName , imageUrl , viewerIdentity , name , isFollowing}: HeaderProps) => {
    const participants = useParticipants();
    const participant = useRemoteParticipant(hostIdentity);

    const isLive = !!participant;
    
    const participantCount = participants.length-1;
    console.log(participantCount)
    const hostAsviewer =  `host-${hostIdentity}`
    const isHost = viewerIdentity === hostAsviewer;

    return(
        <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4 ">
            <div className="flex items-center gap-x-3">
            <UserAvatar
                imageUrl={imageUrl}
                username={name}
                isLive={isLive}
                showBadge


            />
             <div className="space-y-1">
                <div className="flex items-center gap-x-2">
                <h2 className="text-lg font-semibold">
                    {hostName}
                </h2>
                <VerifiedMark />
                </div>
                <p className="text-sm font-semibold">
                    {name}
                </p>
                {isLive ? (
                    <div className="font-semibold flex gap-x-1 items-center text-xs text-rose-500">
                        <UserIcon className="h-4 w-4"/>
                    <p>
                        {participantCount}{participantCount > 1 ? " viewers" : " viewer"}
                    </p>
                    </div>
                ): <p className="font-semibold text-xs text-muted-foreground">
                    Offline
                    </p>
                }
            </div>
            </div>
          <Actions
          isFollowing = {isFollowing}
          hostIdentity = {hostIdentity}
          isHost = {isHost}
          />
        </div>
    )
}

export const HeaderSkeleton = () => {
    return(
        <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4">
            <div className="flex items-center gap-x-3">
                <UserAvatarSkeleton imageUrl="" username="" size={36} />
                <div className="space-y-2">
                    <Skeleton className="h-6 w-32" />
                    <Skeleton className="h-4 w-24" />

                </div>
            </div>
            <ActionSkeleton />
        </div>
    )
}
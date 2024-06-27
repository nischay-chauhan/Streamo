"use client"

import { UserAvatar } from "../user-avatar"
import { VerifiedMark } from "./verified-mark"

interface HeaderProps {
    hostName: string
    hostIdentity: string
    imageUrl : string
    viewerIdentity : string
    name : string
    isFollowing : boolean
}
export const Header = ({hostIdentity , hostName , imageUrl , viewerIdentity , name , isFollowing}: HeaderProps) => {
    return(
        <div className="flex flex-col lg:flex-row gap-y-4 lg:gap-y-0 items-start justify-between px-4 ">
            <div className="flex items-center gap-x-3">
            <UserAvatar
                imageUrl={imageUrl}
                username={name}
                isLive={true}
                showBadge


            />
             <div className="space-y-1">
                <div className="flex items-center gap-x-2">
                <h2 className="text-lg font-semibold">
                    {hostName}
                </h2>
                <VerifiedMark />
                </div>
            </div>
            </div>
          
        </div>
    )
}
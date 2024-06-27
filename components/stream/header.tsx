"use client"

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
        <div>
            Chat Header
        </div>
    )
}
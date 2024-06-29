"use client"

interface InfoCardProps{
    name : string
    thumbnailUrl : string | null
    hostIdentity : string
    viewerIdentity : string
}

export const InfoCard = ({name , thumbnailUrl , hostIdentity , viewerIdentity} : InfoCardProps) => {
    return(
        <div>
            Info card
        </div>
    )
}
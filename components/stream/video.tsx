"use client"

interface VideoProps {
    hostName: string;
    hostIdentity: string;
}

export const Video = ({hostName , hostIdentity}:VideoProps) => {
    return(
        <div>
            Video Player component
        </div>
    )
}
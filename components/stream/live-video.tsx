"use client"
import { useRef } from "react";
import {useTracks} from "@livekit/components-react"
import {Participant , Track} from "livekit-client"
interface LiveVideoProps {
    participants : Participant;
}
export const LiveVideo = ({participants}: LiveVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);

    useTracks([
        Track.Source.Camera,
        Track.Source.Microphone
    ]).filter((track) => track.participant.identity === participants.identity).forEach((track) => {
        if(videoRef.current){
            track.publication.track?.attach(videoRef.current);
        }
    })
    return(
        <div 
        ref={wrapperRef}
        className="relative h-full flex">
           <video ref={videoRef} width={"100%"} />
        </div>
    )
}
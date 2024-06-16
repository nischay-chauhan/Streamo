"use client"
import { useRef , useState} from "react";
import {useTracks} from "@livekit/components-react"
import {Participant , Track} from "livekit-client"
import { FullScreenControl } from "./fullscreen-control";
import {useEventListener} from "usehooks-ts"
interface LiveVideoProps {
    participants : Participant;
}
export const LiveVideo = ({participants}: LiveVideoProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isFullscreen , setIsFullscreen] = useState(false)

    const toggleFullscreen = () => {
        if(isFullscreen){
            document.exitFullscreen();
        }else if(wrapperRef.current){
            wrapperRef.current.requestFullscreen();
        }
    }

    const handleFullScreenChange = () => {
        const isCurrentlyFullscreen = document.fullscreenElement !== null;
        setIsFullscreen(isCurrentlyFullscreen);
    }

    useEventListener("fullscreenchange" , handleFullScreenChange , wrapperRef)

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
        <div className="absolute top-0 h-full w-full opacity-0 hover:opacity-100 hover:transition-all">
            <div className="absolute bottom-0 flex h-14 items-center w-full justify-between bg-gradient-to-t from-neutral-900 px-4">
                <FullScreenControl
                isFullScreen={isFullscreen}
                onToggle={toggleFullscreen} 
                />

            </div>

        </div>
        </div>
    )
}
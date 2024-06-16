"use client"
import {Volume1 , Volume2 , VolumeX} from "lucide-react"
import { Slider } from "../ui/slider"
import { Hint } from "../hint"

interface VolumeControlProps{
    ontoggle: () => void
    onchange: (value : number) => void
    value : number
}

export const VolumeControl = ({ontoggle , onchange , value} : VolumeControlProps) => {
    const isMuted =  value === 0;
    const isAboutHalf = value > 50;
    let Icon = Volume1
    if(isMuted){
        Icon = VolumeX
    }else if(isAboutHalf){
        Icon = Volume2;
    }

    const label = isMuted ? "Unmute" : "Mute"
    const handleChange = (value : number[]) => {
        onchange(value[0]);
    }
    return (
        <div className="flex items-center gap-2">
            <Hint
            label={label}
            asChild>
                <button
                onClick={ontoggle}
                className="text-white hover:bg-white/10 p-1.5 rounded-lg"
                >
                    <Icon className="h-6 w-6" />
                </button>
            </Hint>

            <Slider
            className="w-[8rem] cursor-pointer"
            value={[value]}
            onValueChange={handleChange}
            min={0}
            max={100}
            step={1}
            />
        </div>
    );
};
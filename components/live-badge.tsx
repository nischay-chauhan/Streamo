import { cn } from "@/lib/utils";

interface LiveBadegeProps{
    className ?: string
}

export const LiveBadge = ({ className }: LiveBadegeProps) => {
    return (
        <div className={cn("bg-rose-500 text-[10px] text-center p-0.5 px-1.5 border border-backgeround rounded font-semibold tracking-wide", className)}>
            Live
        </div>
    )
}
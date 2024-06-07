"use client"
import { toast } from "sonner"
import { useTransition } from "react"
import { updateStream } from "@/actions/stream"
import { Switch } from "@/components/ui/switch"
import { Skeleton } from "@/components/ui/skeleton"

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly"

interface ToggleCardProps{
    label : string
    value : boolean
    field : FieldTypes

}
export const TOggleCard = ({label , value=false , field} : ToggleCardProps) => {
    const [isPending , startTransition] = useTransition()

    const onChange = () => {
        startTransition(() => {
            updateStream({[field] : !value})
            .then(() => {
                toast.success("Chat Updated")
            })
            .catch(() => {
                toast.error("Error updating chat")
            })
        })
    }

    return(
        <div className="rounded-xl bg-muted p-6">
            <div className="flex items-center justify-between">
            <p className="font-semibold shrink-0">
                {label}
            </p>
            <div className="space-y-2">
                <Switch
                onCheckedChange={onChange}
                disabled={isPending}
                checked={value}
                >
                    {value ? "On" : "Off"}
                </Switch> 
            </div>
            </div>
        </div>
    )
}


export const ToggleCardSkeleton = ()  =>  {
    return (
        <div className="rounded-xl bg-muted p-6">
            <div className="flex items-center justify-between">
                <p className="font-semibold shrink-0">
                    Chat
                </p>
                <div className="space-y-2">
                    <Skeleton className="h-5 w-24" />
                </div>
            </div>
        </div>
    )
}
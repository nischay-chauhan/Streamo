'use client'

import { Button } from "@/components/ui/button"
import { Dialog , DialogTrigger , DialogClose , DialogContent , DialogTitle , DialogHeader } from "@/components/ui/dialog" 

import { Alert , AlertDescription ,  AlertTitle } from "@/components/ui/alert"
import { Select , SelectContent , SelectItem , SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle } from "lucide-react"

import { IngressInput } from "livekit-server-sdk"
import { ElementRef, useRef, useState , useTransition } from "react"
import { createIngress } from "@/actions/ingress"
import { toast } from "sonner"


const RTMP = String(IngressInput.RTMP_INPUT);
const WHIP = String(IngressInput.WHIP_INPUT);

type IngressType = typeof RTMP | typeof WHIP

export const ConnectModal = () => {
    const closeRef = useRef<ElementRef<"button">>(null)
    const [isPending , startTransition] = useTransition();
    const [ingressType , setIngressType] = useState<IngressType>(RTMP);

    const onSubmit = () => {
        startTransition(() => {
            createIngress(parseInt(ingressType))
            .then(() => {toast.success("Ingress Created")
                    closeRef.current?.click()
        })
            .catch(() => toast.error("Error creating ingress"))
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={'primary'}>
                    Generate Connection
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Generate COnnection</DialogTitle>
                </DialogHeader>
                <Select
                disabled={isPending}
                value={ingressType}
                onValueChange={(value) => setIngressType(value as IngressType)}
                >
                    <SelectTrigger className="w-full "> 
                        <SelectValue placeholder="Ingress Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value={RTMP} >RTMP</SelectItem>
                        <SelectItem value={WHIP} >WHIP</SelectItem>
                    </SelectContent>
                </Select>
                <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>WARNING</AlertTitle>
                    <AlertDescription>
                        This action will reset all the connection of the active stream to the new server
                    </AlertDescription> 
                </Alert>
                <div className="flex justify-between">
                    <DialogClose ref={closeRef} asChild>
                        <Button variant={'ghost'}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={onSubmit} disabled={isPending} variant={'primary'}>
                        Generate
                    </Button>

                </div>
            </DialogContent>
        </Dialog>
    )
}
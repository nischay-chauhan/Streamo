'use client'

import { Button } from "@/components/ui/button"
import { Dialog , DialogTrigger , DialogClose , DialogContent , DialogTitle , DialogHeader } from "@/components/ui/dialog" 

import { Alert , AlertDescription ,  AlertTitle } from "@/components/ui/alert"
import { Select , SelectContent , SelectItem , SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertTriangle } from "lucide-react"
export const ConnectModal = () => {

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
                <Select>
                    <SelectTrigger className="w-full "> 
                        <SelectValue placeholder="Ingress Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="RTMP" >RTMP</SelectItem>
                        <SelectItem value="WHIP" >WHIP</SelectItem>
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
                    <DialogClose>
                        <Button variant={'ghost'}>
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={() => {}} variant={'primary'}>
                        Generate
                    </Button>

                </div>
            </DialogContent>
        </Dialog>
    )
}
"use client"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose

} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { useState , useRef , useTransition , ElementRef } from "react"
import { updateStream } from "@/actions/stream"
import { toast } from "sonner"
import { UploadDropzone } from "@/lib/uploadthing"
interface InfoModalProps{
    intialName : string
    intialThumbnail : string | null
}

export const InfoModal = ({intialName ,intialThumbnail} : InfoModalProps) => {
    const closeRef = useRef<ElementRef<"button">>(null)
    const [name , setName] = useState(intialName)
    const [isPending , startTransition] = useTransition()
    const [thumbnailUrl , setThumbnailUrl] = useState(intialThumbnail)
    const router = useRouter()
    const onChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const onSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        startTransition(() => {
           updateStream ({name : name})
           .then(() => {
               toast.success("Stream Updated")
               closeRef.current?.click()
           }).catch(() => {
               toast.error("Something went wrong")
           })
        })
    }

    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="link" size={'sm'} className="ml-auto">Edit
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Edit Stream
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={onSubmit} className="space-y-14">
                    <div className="space-y-2">
                        <Label>
                            Name
                        </Label>
                        <Input
                        placeholder="Stream Name"
                        value={name}
                        disabled={isPending}
                        onChange={onChange}
                        />

                    </div>
                    <div className="space-y-2 ">
                        <Label>
                            Thumbnail
                        </Label>
                        <div className="roundec-xl border outline-dashed outline-muted">
                            <UploadDropzone
                            endpoint="thumbnailUploader"
                            appearance={{
                                label : {
                                    color : "#FFFFFF"
                                },
                                allowedContent : {
                                    color : "#FFFFFF"
                                }
                            }}
                            onClientUploadComplete={(res) => {
                                setThumbnailUrl(res?.[0]?.url)
                                router.refresh()
                            }}
                            
                            />
                        </div>

                    </div>
                    <div className="flex justify-between ">
                        <DialogClose asChild>
                            <Button type="button" variant="ghost" size={'sm'}>Cancel
                            </Button>
                        </DialogClose>
                        <DialogClose ref={closeRef} asChild>
                            <Button type="submit" 
                            disabled={false}
                            variant="primary" size={'sm'} >Save
                            </Button>
                        </DialogClose>

                    </div>

                </form>
            </DialogContent>
        </Dialog>
    )
}
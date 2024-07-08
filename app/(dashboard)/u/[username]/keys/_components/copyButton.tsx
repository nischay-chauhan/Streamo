'use client'

import { Button } from "@/components/ui/button"
import { CheckCheck, Copy, CopyCheck } from "lucide-react"
import { useState } from "react"

interface CopyProps{
    value ?: string
}

export const CopyButton = ({value} : CopyProps) => {
    const [isCopied , setIsCopied] = useState(false)

    const onCopy = () => {
        if(!value ) return
        setIsCopied(true)
        navigator.clipboard.writeText(value)
        setTimeout(() => {
            setIsCopied(false)
        } , 2000)
    }

    const Icon = isCopied ? CheckCheck : Copy
    return(
       <Button
       onClick={onCopy}
       disabled={isCopied || !value}
       variant={'ghost'}
       size={'sm'}
       >
        <Icon className="h-4 w-4" />
       </Button>
    )
}
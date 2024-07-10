"use client"

import { onuUnblockUser } from "@/actions/block";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { toast } from "sonner";

interface UnblockButtonProps{
    userId : string
}

export const UnblockButton = ({userId} : UnblockButtonProps) => {
    const [isPending , startTransition] = useTransition();
    const OnClick = () => {
        startTransition(() => {
            onuUnblockUser(userId).then((data) => toast.success(`You have Unblocked ${data?.blocked.username}`)).catch(() => toast.error("Error Blocking"))
        })
    }
    return (
       <Button
       disabled={isPending}
       onClick={OnClick}
       variant={'link'}
       size={'sm'}
       className="text-blue-500 w-full"
       >
            UnBlock
       </Button>
    )
}
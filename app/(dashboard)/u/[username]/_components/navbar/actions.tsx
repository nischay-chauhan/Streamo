import { Button } from "@/components/ui/button"
import { currentUser, SignInButton, UserButton } from "@clerk/nextjs"
import { Clapperboard, LogOut } from "lucide-react"
import Link from "next/link"

export const Actions = () => {
    return (
       <div className="flex items-center justify-end gap-x-4 ml-4 lg:ml-0">
        <Button
        size={'sm'}
        variant={'ghost'}
        className="w-[100px] lg:w-[150px] h-[40px] lg:h-[50px] px-2 lg:px-4 hover:text-primary"
        asChild
        >
            <Link href={'/'}>
                <LogOut className="h-5 w-5 mr-2" />
                Exit
            </Link>
        </Button>
        <UserButton 
        afterSignOutUrl="/"
        />
       </div>
    )
}
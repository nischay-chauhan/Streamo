"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"


const ErrorPage = () => {
    return(
        <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
            <p className="text-4xl font-bold ">
                Something Went Wrong 
            </p>
            <Button variant={'secondary'} asChild>
                <Link href="/">
                Go back to Home
                </Link>

            </Button>
        </div>
    )
}

export default ErrorPage
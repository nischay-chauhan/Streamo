import { Button } from "@/components/ui/button"
import Link from "next/link"


const NotFoundPgae = () => {
    return(
        <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
            <h1 className="text-4xl">404</h1>
            <p>
                We could&apos;t find the Page you were looking for.
            </p>
            <Button variant={'secondary'} asChild>
                <Link href="/">
                Go back to Home
                </Link>

            </Button>
        </div>
    )
}

export default NotFoundPgae
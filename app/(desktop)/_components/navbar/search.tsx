"use client"
import qs from "query-string"
import { useState } from "react"
import  {SearchIcon , X} from "lucide-react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
export const Search = () => {
    return(
        <>
        <form
        className="realtive w-full lg:w-[400px] flex items-center"
        >
            <Input 
            placeholder="Search"
            className="rounded-r-none focus-visible:ring-0 focus-visible:ring-transparent
            focus-visible:ring-offset-0
            " 

            />
            <Button type="submit" size={"sm"} variant={"secondary"} className="rounded-l-none" >
                <SearchIcon className="h-5 w-5 text-muted-foreground"/>
            </Button>
        </form>
        </>
    )
}
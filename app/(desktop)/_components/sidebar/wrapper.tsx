"use client"
import { useSidebar } from "@/store/use-sidebar"
import { cn } from "@/lib/utils"

interface WrapperProps {
    children: React.ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
    const {collapsed} = useSidebar((state) => state)
    return(
        <aside className={cn("fixed left-0 flex flex-col w-60 h-full bg-background border-r border-gary-600 z-101" , collapsed && "w-[90px]")}>
            {children}
        </aside>
    )
}
"use client"
import { cn } from "@/lib/utils"
import { useCreatorSidebar } from "@/store/use-creator-sidebar"
import { Container } from "../container";

interface WrapperProps {
    children: React.ReactNode
}

export const Wrapper = ({ children }: WrapperProps) => {
    const {collapsed} = useCreatorSidebar((state) => state)
    return(
        <aside className={cn("fixed left-0 flex flex-col w-60 h-full bg-background border-r border-gary-600 z-101" , collapsed && "w-[90px]")}>
            <Container>
            {children}
            </Container>
        </aside>
    )
};


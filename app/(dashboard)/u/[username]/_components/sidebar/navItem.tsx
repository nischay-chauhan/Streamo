"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useCreatorSidebar } from "@/store/use-creator-sidebar"
import Link from "next/link"

interface NavItemProps {
    icon: React.ReactNode
    label: string
    href: string
    isactive: boolean
};

export const NavItem = ({ icon, label, href, isactive }: NavItemProps) => {
    const { collapsed } = useCreatorSidebar((state) => state)
    return (
        <li>
            <Button
                asChild
                variant={isactive ? "primary" : "ghost"}
                className="w-full h-full  justify-start text-left font-normal"
            >
                <Link href={href} className="w-full flex items-center gap-x-4">
                    <div className="w-full flex items-center gap-x-4">
                        <div className="shrink-0">
                            {icon}
                        </div>
                        {!collapsed &&
                            <div className="grow truncate">
                                {label}
                            </div>
                        }
                    </div>
                </Link>
            </Button>
        </li>
    )
}

export const NavItemSkeleton = () => {
    return (
        <li className="flex items-center gap-x-4 px-3 py-2">
            <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
            <div className="flex-1">
                <Skeleton className="h-6" />
            </div>
        </li>
    )
}
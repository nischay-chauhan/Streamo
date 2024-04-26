"use client "
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils" 
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useSidebar } from "@/store/use-sidebar"
import Link from "next/link"
import { UserAvatar } from "@/components/user-avatar"
import { LiveBadge } from "@/components/live-badge"

interface userItemPRops {
    username: string
    imageUrl: string
    isLive: boolean
}

export const UserItem = ({ username, imageUrl, isLive }: userItemPRops) => {
    const pathname = usePathname()
    const {collapsed} = useSidebar((state) => state);
    const href = `/${username}`
    const isActive = pathname === href
    return (
      <Button
      asChild
      variant={isActive ? "primary" : "ghost"}
      className={cn(
        "w-full justify-start text-left font-normal",
        !collapsed && "pl-2",
        isActive && "bg-accent"
      )}
      >
       <Link href={href}>
       
        <div className={cn("w-full flex items-center gap-x-4" , collapsed && "justify-center")}>
        <UserAvatar
        imageUrl = {imageUrl}
        username = {username}
        isLive = {isLive}
        showBadge
        />
        </div>
       </Link>
      </Button>
    )
}
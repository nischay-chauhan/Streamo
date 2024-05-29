"use client"

import { useUser } from "@clerk/nextjs"
import { usePathname } from "next/navigation"
import { Fullscreen , KeyRound , MessageSquare , Users } from "lucide-react"
import { NavItem } from "./navItem"
export const Navigation = () => {
    const pathname = usePathname();
    const {user} = useUser();
    const routes = [
        {
            label : "Stream",
            href : `/u/${user?.username}`,
            icon : <Fullscreen/>
        },
        {
            label : "Keys",
            href  : `/u/${user?.username}/keys`,
            icon : <KeyRound/>
        },
        {
            label : "Chat",
            href : `/u/${user?.username}/chat`,
            icon : <MessageSquare/>
        },
        {
            label : "Community",
            href : `/u/${user?.username}/community`,
            icon : <Users/>
        },
    ]
    return(
        <ul className="space-y-2 px-2 pt-4 lg:pt-6">
            {routes.map((route) => (
               <NavItem
               key={route.href}
               label={route.label}
               href={route.href}
               icon={route.icon}
               isactive={pathname === route.href}
               />
            ))}
        </ul>
    )
}
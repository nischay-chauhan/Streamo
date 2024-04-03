"use client"

import { Button } from "@/components/ui/button"
import { useSidebar } from "@/store/use-sidebar"
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react"

export const Toggle = () => {
    const {collapsed , onExpand , onCollapse} = useSidebar((state) => state)
    const label = collapsed ? "Expand" : "Collapse"
    return (
      <>
      {
        collapsed && (
            <div className="hidden lg:flex w-full items-center justify-center pt-4 mb-4">
                <Button className="h-auto p-2" variant={"ghost"} onClick={onExpand} aria-label={label} title={label}>
                    <ArrowRightFromLine className="h-4 w-4" />
                </Button>
            </div>
        )
      }
      {!collapsed && (
        <div className="p-3 pl-5 mb-2 flex items-center w-full">
            <p className="font-semibold text-primary">
                Here u Go
            </p>
            <Button className="h-auto p-2 ml-auto" variant={"ghost"}
            onClick={onCollapse}
            >
                <ArrowLeftFromLine className="h-4 w-4" />
            </Button>
        </div>
      )}
      </>
    )
}
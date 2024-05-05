import { getRecommended } from "@/lib/recommended"
import { Recommended, RecommendedSkeleton } from "./recommended"
import { Toggle } from "./toggle"
import { Wrapper } from "./wrapper"
import { getAllFollowedUsers } from "@/lib/follow-service"
import { Following } from "./following"

export const Sidebar = async() => {
    const recommended = await getRecommended();
    const following = await getAllFollowedUsers();
    return (
        <>
       <Wrapper>
        <Toggle />
        <div className="space-y-4 lg:ot-0 pt-4">
        <Recommended data={recommended} />
        <Following data={following} />
        </div>
       </Wrapper>
        </>
    )
}

export const sidebarSkeleton = () => {
    return(
        <aside className="fixed left-0 flex flex-col w-60 h-full bg-background border-r border-gary-600 z-101">
            <RecommendedSkeleton />
        </aside>
    )
}
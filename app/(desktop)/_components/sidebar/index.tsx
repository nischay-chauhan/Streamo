import { getRecommended } from "@/lib/recommended"
import { Recommended } from "./recommended"
import { Toggle } from "./toggle"
import { Wrapper } from "./wrapper"

export const Sidebar = async() => {
    const recommended = await getRecommended();
    return (
        <>
       <Wrapper>
        <Toggle />
        <div className="space-y-4 lg:ot-0 pt-4">
        <Recommended data={recommended} />
        </div>
       </Wrapper>
        </>
    )
}
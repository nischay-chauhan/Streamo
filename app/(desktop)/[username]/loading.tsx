import { StreamPlayerSkeleton } from "@/components/stream"
import { Skeleton } from "@/components/ui/skeleton"

const USernameLoading = () => {
    return (
       <div className="h-screen">
        <StreamPlayerSkeleton />
       </div>
    )
}

export default USernameLoading
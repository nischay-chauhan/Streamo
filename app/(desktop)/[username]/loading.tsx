import { StreamPlayerSkeleton } from "@/components/stream"
import { Skeleton } from "@/components/ui/skeleton"

const UsernameLoading = () => {
    return (
       <div className="h-screen w-full">
        <StreamPlayerSkeleton />
       </div>
    )
}

export default UsernameLoading
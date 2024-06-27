import { Skeleton } from "@/components/ui/skeleton"

const USernameLoading = () => {
    return (
        <div className="h-full grid grid-cols-1 ">
            <Skeleton className="h-[300px]" />
        </div>
    )
}

export default USernameLoading
import { Skeleton } from "@/components/ui/skeleton"
import { getStreams } from "@/lib/feed-service"
import { ResultCard } from "./result-card";

export const Results = async() => {
    const data = await getStreams();
    return (
       <div>
        <h2 className=" font-semibold text-primary">
            Suggested Streams for you 
        </h2>
        {
            data.length === 0 && (      
                    <p className="text-sm text-muted-foreground">
                        No streams found
                    </p>
       )}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {data.map((result) => (
                <ResultCard
                key = {result.id}
                data = {result}

                />
            ))}
       </div>
       </div>
    )
}

export const ResultSkeleton = () => {
    return(
        <div className="flex flex-col items-center gap-y-4 p-3">
            <div className="flex flex-xol items-center gap-y-4 p-3">
                <Skeleton className="h-10 w-full" />
            </div>
            <div className="flex items-center gap-x-2 ml-auto">
                <Skeleton className="h-7 w-7" />
                <Skeleton className="h-7 w-12" />
            </div>
        </div>
    )
}
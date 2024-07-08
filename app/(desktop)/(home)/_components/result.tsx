import { Skeleton } from "@/components/ui/skeleton"
import { getStreams } from "@/lib/feed-service"
import { ResultCard, ResultCardSkeleton } from "./result-card";

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
        <div className="">
           <Skeleton className="h-8 w-[200px] mb-4" />
           <div  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(4)].map((_,i) => (
                <ResultCardSkeleton key={i}/>
            ))}
           </div>
        </div>
    )
}
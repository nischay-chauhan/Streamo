import { getSearch } from "@/lib/search-service";
import { ResultCard } from "./result-card";

interface ResultsProps{
    term?: string
}

export const Results = async({term} : ResultsProps) => {
    const data = await getSearch(term);
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">
                Search Results for {term}
            </h2>
            {
                data.length === 0 && (      
                        <p className="text-sm text-muted-foreground">
                            No streams found , Try something Else
                        </p>
                )
            }
            <div className="flex flex-col gap-y-4">
                {data.map((result) => (
                    <ResultCard data = {result} key = {result.id} />
                ))}
            </div>
        </div>
    )
}

export const ResultSkeleton = () => {
    return(
        <div className="flex justify-center items-center  h-full p-3">
         
        </div>
    )
}
import { redirect } from "next/navigation";
import { Results, ResultSkeleton } from "./_components/result";
import { Suspense } from "react";

interface SearchPageProps {
    searchParams : {
        term ?: string
    };
}

const Search = ({searchParams}: SearchPageProps) => {
    if(!searchParams.term){
        redirect("/")
    }
    return (
        <div className="h-full p-8 max-w-screen-2xl mx-auto">
            <Suspense fallback={<ResultSkeleton />}>
            <Results term={searchParams.term} />
            </Suspense>
        </div>
    )
}

export default Search
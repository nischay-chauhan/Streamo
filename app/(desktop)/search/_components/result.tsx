interface ResultsProps{
    term?: string
}

export const Results = async({term} : ResultsProps) => {
    
    return (
        <div>
            <h2 className="text-lg font-semibold mb-4">
                Search Results for {term}
            </h2>
        </div>
    )
}

export const ResultSkeleton = () => {
    return(
        <div className="flex justify-center items-center  h-full p-3">
         
        </div>
    )
}
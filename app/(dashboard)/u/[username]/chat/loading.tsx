import { ToggleCardSkeleton } from "./_components/toggle-card"

const chatLoading = () => {
    return(
        <div className="space-y-6 w-full mt-8">
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />
        <ToggleCardSkeleton />

        </div>
    )
}

export default chatLoading
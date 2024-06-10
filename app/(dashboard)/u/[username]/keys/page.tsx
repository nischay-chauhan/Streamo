import { Button } from "@/components/ui/button"
import { UrlCard } from "./_components/url-card"
import { getLiveUser } from "@/lib/authService"
import { getStreamByUserId } from "@/lib/stream-service";

const KeysPage = async() => {
    const self = await getLiveUser();
    const stream = await getStreamByUserId(self.id);
    if(!stream){
        throw new Error("Stream not found")
    }
    return(
        <div className="p-6">
            <div className="flex items-center mb-4 justify-between">
            <h1 className="text-2xl font-bold">
                Keys and URL
            </h1>
            <Button variant={'primary'}>
                Generate
            </Button>
            </div>
            <div className="space-y-4">

            <UrlCard value={stream.serverUrl} />
            </div>
        </div>
    )
}

export default KeysPage
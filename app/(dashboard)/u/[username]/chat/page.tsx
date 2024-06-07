import { getLiveUser } from "@/lib/authService";
import { getStreamByUserId } from "@/lib/stream-service";
import { TOggleCard } from "./_components/toggle-card";

const ChatPage = async() => {
    const self = await getLiveUser();
    const stream = await getStreamByUserId(self.id);
    if(!stream){
        throw new Error("Stream not found")
    }
    return (
        <div className="p-6">
            <div className="mb-4">
                <h1 className="text-2xl font-bold">Chat Settings</h1>
            </div>
            <div className="space-y-4">
                <TOggleCard
                field = "isChatEnabled"
                label = "Enable Chat"
                value = {stream.isChatEnabled}
                />

                <TOggleCard
                field = "isChatDelayed"
                label = "Delay Chat"
                value = {stream.isChatDelayed}
                />

                <TOggleCard
                field = "isChatFollowersOnly"
                label = "Enable Chat"
                value = {stream.isChatFollowersOnly}
                />
            </div>
        </div>
    )
}

export default ChatPage
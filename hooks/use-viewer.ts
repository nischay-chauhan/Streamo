import {toast } from "sonner"
import { useEffect , useState } from "react"
import { JwtPayload , jwtDecode} from "jwt-decode"
import { createViewerToken } from "@/actions/token"

export const useViewerToken = (hostIdentity : string) => {
    const [token , setToken] = useState("")
    const [name , setName] = useState("")
    const [identity , setIdentity] = useState("")

    useEffect(() => {
        const createToken = async () => {
            try{
                const viewerToken = await createViewerToken(hostIdentity);
                setToken(viewerToken);
                const payload = jwtDecode(viewerToken) as JwtPayload & {name ?: string}
                const name = payload?.name
                const identity = payload.sub
                console.log(identity)
                if(identity){
                    setIdentity(identity);
                    
                }
                if(name){
                    setName(name);
                }

            }catch(error){
                console.log(error)
                toast.error("Error creating token");
            }
        }
        createToken()
    } , [hostIdentity]);

    return {token , name , identity}
}
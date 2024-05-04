"use server"


export const OnFollow = async (id: string) => {
    try{
        console.log("this is my server ccomponent")
        console.log(id)
    }catch(error){
        console.log(error)
    }
}
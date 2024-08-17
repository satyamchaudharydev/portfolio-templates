"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "../api/auth/[...nextauth]/route";


export const getAuthStatus = async () => {
    console.log("calling this fn")
    const userSession = await getServerSession(authOptions) as any;
    const userId = userSession?.['userId']
    console.log(userSession, "userSessoin")

    if(!userId){
        throw new Error("User not authenticated")
    }
    return {success: true}

}
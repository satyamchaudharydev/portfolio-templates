"use server"
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth"


export const getAuthStatus = async () => {
    const userSession = await getServerSession(authOptions) as any;
    const userId = userSession?.['userId']

    if(!userId){
        throw new Error("User not authenticated")
    }
    return {success: true}

}
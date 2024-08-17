import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function ProtectedPage(){
    const serverSession = await getServerSession()
    if(!serverSession || !serverSession.user) {
        redirect("/api/auth/signin")
    }

    return(
        <>
            {"Protected page"}
        </>
    )
}
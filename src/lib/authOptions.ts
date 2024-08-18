import { db } from "@/db";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google"


export const authOptions: NextAuthOptions = {
    session: {
        strategy: 'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""

        })
    ],

    callbacks: {
        async jwt({token, account}) {
            if (account) {
              token = Object.assign({}, token, { userId: account.providerAccountId });
            }
            return token
          },
          async session({session, token,user}) {
            if(session) {
                session = Object.assign({}, session, {userId: token.userId})
                }
            return session
          },
        
        async signIn({account,profile,credentials}) {
            if(!profile?.email){
                throw new Error("No Profile")
            }
            
            return true
        }
    }
}


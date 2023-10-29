import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
           
            async authorize(credentials, req) {
                const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }

                if (user) {
                    return user
                } else {
                    return null
                }
            }
        }),
    ],
    pages: {
        signIn: 'api/auth/signin',
        signOut: '/auth/signout',
        // error: '/auth/error', // Error code passed in query string as ?error=
        // verifyRequest: '/auth/verify-request', // (used for check email message)
        // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
    },
    
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
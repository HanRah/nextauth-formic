import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
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
                const user = { id: "1", name: credentials?.username, email: credentials?.username }

                if (user) {
                    return user
                } else {
                    return null
                }
            }
        }),
    ],
    pages: {
        signIn: '/signin',
    },

};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
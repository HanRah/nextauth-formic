import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials"

const authOptions: NextAuthOptions = {
    // Secret for Next-auth, without this JWT encryption/decryption won't work
    secret: process.env.NEXTAUTH_SECRET,

    // Configure one or more authentication providers
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
        })
    ],
};


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
import NextAuth, { NextAuthOptions } from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions : NextAuthOptions= {
  // Configure one or more authentication providers
  secret: "sarthak_is_turbo",
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn(params) {
      if (params.account) {
        const cookie = params.account.id_token;
        return true;
      } return false;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET as string,
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)
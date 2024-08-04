import NextAuth, { User, DefaultSession, Account, Session } from "next-auth"
import type { JWT } from "next-auth/jwt"
import GoogleProvider from "next-auth/providers/google"
import { cookies } from "next/headers";

interface BackendUser extends User {
  backendToken?: string;
}


declare module 'next-auth' {
  interface Session extends DefaultSession {
    backendToken?: string;
  }
}


const authOptions = {
  // client secret, this will help client identify whether the user is signed up or not, can change this to log out everyone
  secret: "random-secret",
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }: {user: User | BackendUser, account: Account | null}): Promise<boolean> {
      if (!account?.id_token) return false;
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: account.id_token,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        (user as BackendUser).backendToken = data.sessionToken;
        return true;
      } else {
        return false;
      }
    },

    async jwt({ token, user }: {token: JWT, user: User | BackendUser}) {
      if (user) {
        token.backendToken = (user as BackendUser).backendToken;
      }
      return token;
    },

    async session({ session, token }: {session: Session, token: JWT}) {
      session.backendToken = token.backendToken as string;
      cookies().set("auth", token.backendToken as string);
      return session;
    },
  },
}

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);



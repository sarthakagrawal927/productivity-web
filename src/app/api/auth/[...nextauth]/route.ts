import NextAuth, { NextAuthOptions, User, DefaultSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { cookies } from "next/headers";

interface BackendUser extends User {
  backendToken?: string;
}

declare module 'next-auth/jwt' {
  interface JWT {
    backendToken?: string;
  }
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    backendToken?: string;
  }
}


export const authOptions: NextAuthOptions = {
  secret: process.env.JWT_SECRET!,
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID!,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }): Promise<boolean> {
      if (!account?.id_token) return false;
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: account.id_token,
          user: {
            name: user.name,
            email: user.email,
            image: user.image,
          }
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

    async jwt({ token, user }) {
      if (user) {
        token.backendToken = (user as BackendUser).backendToken;
      }
      return token;
    },

    async session({ session, token }) {
      session.backendToken = token.backendToken as string;
      cookies().set("auth", token.backendToken as string);
      return session;
    },
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
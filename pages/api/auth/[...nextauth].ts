import { sign } from 'jsonwebtoken';
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { sendTokenToServer } from '../../../src/utils/auth';


export const authOptions = {
  secret: "simple",
  providers: [
    // Uncomment and adjust types for GitHub if needed
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    Google({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID || "my-default-client-id",
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET || "my-default-client-secret",
    }),
  ],
  callbacks: {
    async jwt({ token, user}: {token:any, user: any}) {
      if (user) 
      {
        console.log('JWT payload:', { token, user });
        if (!token) return;

        const algorithm = 'HS256'; // Choose the desired algorithm
        const secret = "simple"; // Replace with your secret key

        // Generate the JWT token
        const accessToken = sign(token, secret, { algorithm });
        console.log('JWT token:', accessToken);

        // Call function to send token to golang backend
        await sendTokenToServer(accessToken);
        return token;
      }
      else
      {
        console.log('No user information received from Google OAuth');
        return token; // Return unmodified token if no user data
      }
      
    },
    async session({ session, token }:{session:any, token: any}): Promise<any> {
      // Customize session object with user data (optional)
      if (token?.user) {
        session.user = token.user; // Add user data to session if available
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: 'auth-cookie',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  checks: ['none'],
};

export default NextAuth(authOptions);

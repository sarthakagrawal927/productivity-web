import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import { sendTokenToServer } from '../../../src/utils/auth';
import { sign } from 'jsonwebtoken';


export const authOptions = {
  secret: "simple",
  providers: [
    // Uncomment and adjust types for GitHub if needed
    // GithubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
    Google({
      clientId: "",//process.env.NEXT_GOOGLE_CLIENT_ID,
      clientSecret: ""//process.env.NEXT_GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt({ token/*, user*/ }) {
      // token.email = "duttaaniruddha31@gmail.com"; // Adjust email assignment as needed
      console.log('JWT payload:', token);

      const algorithm = 'HS256'; // Choose the desired algorithm
      const secret = "simple"; // Replace with your secret key

      // Generate the JWT token
      token.accessToken = sign(token, secret, { algorithm });
      console.log('JWT token:', token.accessToken);
      // Uncomment and implement sendTokenToServer function with appropriate types
      await sendTokenToServer(token.accessToken);
      // await sendTokenToServer("")

      return token;
    },
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        // httpOnly: true,
        sameSite: 'lax',
        path: '/',
        // secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  checks: ['none'],
  // database: process.env.DATABASE_URL,
};

export default NextAuth(authOptions);

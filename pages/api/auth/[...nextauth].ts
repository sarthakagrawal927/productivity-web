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
      // user.email = "duttaaniruddha31@gmail.com"; // Adjust email assignment as needed
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
    },
  },
  cookies: {
    sessionToken: {
      name: 'auth-cookie',
      options: {
        // httpOnly: true,
        sameSite: 'lax',
        path: '/',
        // secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  checks: ['none'],
};

export default NextAuth(authOptions);

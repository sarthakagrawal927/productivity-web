
import { signIn, useSession } from 'next-auth/react';
import { sendTokenToServer } from '../../utils/auth';


export async function signInHandler() {
  try {
    await signIn("google"); // Or any other provider
    const { data: session } = useSession();
    const token = session?.user?.accessToken;
    await sendTokenToServer(token); // Send to Golang server
  } catch (error) {
    // Handle login errors
    console.error("Login error:", error);
  }
}
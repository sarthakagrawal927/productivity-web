import { signOut } from 'next-auth/react';

const SignOut = () => {
  return (
    <div>
      <p>Are you sure you want to sign out?</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
};

export default SignOut;
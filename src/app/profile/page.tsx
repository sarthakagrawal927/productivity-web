"use client";
import { useSession } from 'next-auth/react';
import React from 'react';

const Profile = () => {
  const { data: session } = useSession();
  return (
    <div>
      {JSON.stringify(session)}
      Profile info upcoming here
    </div>
  );
};

export default Profile;
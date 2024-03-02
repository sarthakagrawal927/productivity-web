"use client";
import { useSession } from 'next-auth/react';
import HabitLogs from '@/components/Habit/HabitLogs';
import ErrorComponent from '@/components/common/ErrorComponent';
import { LogWithHabit } from '@/types';
import { baseServerSideFetch } from '@/utils/api';

const Profile = async () => {
  const { data: dailyLogs, err } = await baseServerSideFetch<LogWithHabit[]>(`/api/user/today/logs`);
  if (err) return <ErrorComponent message={err.message} />
  const { data: session } = useSession();
  return (
    <div>
      {JSON.stringify(session)}
      Profile info upcoming here
    </div>
  );
};

export default Profile;
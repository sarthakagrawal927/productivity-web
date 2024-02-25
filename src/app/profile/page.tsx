import HabitLogs from '@/components/Habit/HabitLogs';
import ErrorComponent from '@/components/common/ErrorComponent';
import { LogWithHabit } from '@/types';
import { baseServerSideFetch } from '@/utils/api';

const Profile = async () => {
  const { data: dailyLogs, err } = await baseServerSideFetch<LogWithHabit[]>(`/api/user/today/logs`);
  if (err) return <ErrorComponent message={err.message} />
  return (
    <HabitLogs logs={dailyLogs} />
  );
};

export default Profile;
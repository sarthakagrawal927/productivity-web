import HabitLogs from '@/components/Habit/HabitLogs';
import { LogWithHabit } from '@/types';
import { baseServerSideFetch } from '@/utils/api';

const Profile = async () => {
  const dailyLogs: LogWithHabit[] = await baseServerSideFetch(`/api/user/today/logs`);
  return (
    <div>
      <HabitLogs logs={dailyLogs} />
    </div>
  );
};

export default Profile;
import HabitLogs from '@/components/Habit/HabitLogs';
import Schedule from '@/components/Profile/Schedule';
import ErrorComponent from '@/components/common/ErrorComponent';
import { LogWithHabit, ScheduleEntry } from '@/types';
import { baseServerSideFetch } from '@/utils/ssr';

const Profile = async () => {
  const [{ data: dailyLogs, err }, { data, err: scheduleErr }] = await Promise.all([
    baseServerSideFetch<LogWithHabit[]>(`/api/user/today/logs`),
    baseServerSideFetch<{ schedule: ScheduleEntry[] }>(`/api/user/today/schedule`)
  ]);
  if (err || dailyLogs === null || scheduleErr || !data?.schedule) return <ErrorComponent message={err?.message || "No logs found"} />
  return (
    <div className='px-60'>
      <HabitLogs logs={dailyLogs} />
      <Schedule schedule={data.schedule} />
    </div>
  );
};

export default Profile;
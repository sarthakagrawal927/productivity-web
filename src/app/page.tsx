import React from 'react';
import HabitLogs from '@/components/Habit/HabitLogs';
import Schedule from '@/components/Profile/Schedule';
import FetchDataSSR from '@/components/common/FetchDataSSR';
import { LogWithHabit, ScheduleEntry } from '@/types';

const Profile = async () => {
  return (
    <div className='px-60'>
      <FetchDataSSR<[LogWithHabit[], { schedule: ScheduleEntry[] }]>
        fetchUrls={['/api/user/today/logs']}
        onSuccess={([dailyLogs]) => (
          <>
            <HabitLogs logs={dailyLogs} />
          </>
        )}
      />
    </div>
  );
};

export default Profile;
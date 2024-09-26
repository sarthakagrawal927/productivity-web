import HabitComponent from '@/components/Habit/index';
import FetchDataSSR from '@/components/common/FetchDataSSR';
import { Habit } from '@/types';

export default function HabitServerComponent() {
  return (
    <FetchDataSSR<[Habit[]]>
      fetchUrls={['/api/habit']}
      onSuccess={([habits]) => (
        <HabitComponent habits={habits} />
      )}
    />
  );
}
import HabitComponent from '@/components/Habit/index';
import { Habit } from '@/types';
import { baseServerSideFetch } from '@/utils/api';

export default async function Habit() {
  const habits: Habit[] = await baseServerSideFetch('/api/habit');
  return (
    <HabitComponent habits={habits} />
  )
}
import HabitComponent from '@/components/Habit/index';
import ErrorComponent from '@/components/common/ErrorComponent';
import { Habit } from '@/types';
import { baseServerSideFetch } from '@/utils/ssr';

export default async function HabitServerComponent() {
  const [{ data: habits, err }] = await Promise.all([
    baseServerSideFetch<Habit[]>('/api/habit'),
  ]);
  if (err || !habits) {
    return <ErrorComponent message={err?.message} />
  }
  return (
    <HabitComponent habits={habits} />
  )
}
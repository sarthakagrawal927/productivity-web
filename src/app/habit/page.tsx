import HabitComponent from '@/components/Habit/index';
import ErrorComponent from '@/components/common/ErrorComponent';
import { Consumable, Habit } from '@/types';
import { baseServerSideFetch } from '@/utils/api';

export default async function HabitServerComponent() {
  const [{ data: habits, err }, { data: consumables, err: err2 }] = await Promise.all([
    baseServerSideFetch<Habit[]>('/api/habit'),
    baseServerSideFetch<Consumable[]>('/api/consumable')
  ]);
  if (err || err2 || !habits || !consumables) {
    return <ErrorComponent message={err?.message || err2?.message} />
  }
  return (
    <HabitComponent habits={habits} consumables={consumables} />
  )
}
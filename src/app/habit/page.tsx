import HabitComponent from '@/components/Habit/index';
import { Consumable, Habit } from '@/types';
import { baseServerSideFetch } from '@/utils/api';

export default async function Habit() {
  const [habits, consumables]: [Habit[], Consumable[]] = await Promise.all([
    baseServerSideFetch('/api/habit'), baseServerSideFetch('/api/consumable')
  ]);
  return (
    <HabitComponent habits={habits} consumables={consumables} />
  )
}
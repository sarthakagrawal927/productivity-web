"use client";
import { Consumable, Habit } from '@/types';
import React from 'react';
import HabitForm from './HabitForm';
import HabitList from './HabitList';
import ConsumablesList from './ConsumablesList';
import ConsumablesForm from './ConsumablesForm';

const HabitClient = ({ habits, consumables }: { habits: Habit[], consumables: Consumable[] }) => {
  const [consumablesList, setConsumablesList] = React.useState<Consumable[]>(consumables);
  const [habitList, setHabitList] = React.useState<Habit[]>(habits);

  const addNewHabit = (habit: Habit) => {
    setHabitList([...habitList, habit]);
  }

  const addNewConsumable = (consumable: Consumable) => {
    setConsumablesList([...consumablesList, consumable]);
  }

  return (
    <>
      {habitList.length > 0 && <HabitList habits={habitList} />}
      <HabitForm addNewHabit={addNewHabit} />
      {consumablesList.length > 0 && <ConsumablesList consumables={consumablesList} />}
      <ConsumablesForm addNewConsumable={addNewConsumable} habits={habitList} />
    </>
  );
};

export default HabitClient;
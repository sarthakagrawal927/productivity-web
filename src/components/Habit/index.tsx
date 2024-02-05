"use client";
import { Consumable, Habit } from '@/types';
import React from 'react';
import HabitForm from './HabitForm';
import HabitList from './HabitList';
import ConsumablesList from './ConsumablesList';
import ConsumablesForm from './ConsumablesForm';

const HabitClient = ({ habits, consumables }: { habits: Habit[], consumables: Consumable[] }) => {
  const [habitList, setHabitList] = React.useState<Habit[]>(habits);
  const [consumablesList, setConsumablesList] = React.useState<Consumable[]>(consumables);

  const addNewHabit = (habit: Habit) => {
    setHabitList([...habitList, habit]);
  }

  const addNewConsumable = (consumable: Consumable) => {
    setConsumablesList([...consumablesList, consumable]);
  }

  return (
    <>
      <div className='lg:flex lg:flex-row'>
        <div className='flex-1 lg:w-5/12 px-10'>
          <HabitForm addNewHabit={addNewHabit} />
          <HabitList habits={habitList} />
        </div>
        <div className='flex-1 lg:w-5/12 px-10'>
          <ConsumablesForm addNewConsumable={addNewConsumable} habits={habitList} />
          <ConsumablesList consumables={consumablesList} />
        </div>
      </div>
    </>
  );
};

export default HabitClient;
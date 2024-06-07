"use client";
import { Habit } from '@/types';
import React from 'react';
import HabitForm from './HabitForm';
import HabitList from './HabitList';

const HabitClient = ({ habits }: { habits: Habit[] }) => {
  const [habitList, setHabitList] = React.useState<Habit[]>(habits);

  const addNewHabit = (habit: Habit) => {
    setHabitList([...habitList, habit]);
  }

  return (
    <>
      {habitList.length > 0 && <HabitList habits={habitList} />}
      <HabitForm addNewHabit={addNewHabit} />
    </>
  );
};

export default HabitClient;
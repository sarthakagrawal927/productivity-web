"use client";
import { Habit } from '@/types';
import React from 'react';
import HabitForm from './HabitForm';

const HabitList = ({ habits }: { habits: Habit[] }) => {
  const [habitList, setHabitList] = React.useState<Habit[]>(habits);

  const addNewHabit = (habit: Habit) => {
    setHabitList([...habitList, habit]);
  }

  return (
    <>
      <HabitForm addNewHabit={addNewHabit} />
      <ul>
        {habitList.map((habit) => (
          <li key={habit.ID}>{habit.title}</li>
        ))}
      </ul>
    </>
  );
};

export default HabitList;
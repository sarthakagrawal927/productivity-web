import { Journal } from '@/types';
import React from 'react';

const HabitClient = (props: { journalEntries: Journal[] }) => {
  return (
    <>
      hi
      {props.journalEntries.map((entry: Journal) => {
        return <p key={entry.ID}>Entry: {entry.title}</p>
      })}
    </>
  );
};

export default HabitClient;
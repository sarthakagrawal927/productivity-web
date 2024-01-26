"use client"
import { Journal } from '@/types';
import React, { useState } from 'react';
import JournalForm from './JournalForm';

const HabitClient = ({ journalEntries }: { journalEntries: Journal[] }) => {
  const [journalEntriesList, setJournalEntriesList] = useState<Journal[]>(journalEntries);

  const addNewJournalEntry = (newJournalEntry: Journal) => {
    setJournalEntriesList([...journalEntriesList, newJournalEntry]);
  }

  return (
    <>
      <JournalForm addNewEntry={addNewJournalEntry} />
      {journalEntriesList.map((entry: Journal) => {
        return <p key={entry.ID}>Entry: {entry.title}</p>
      })}
    </>
  );
};

export default HabitClient;
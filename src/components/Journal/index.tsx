"use client"
import { Journal } from '@/types';
import React, { useState } from 'react';
import JournalForm from './JournalForm';
import { formatDateString } from '@/utils/helpers';
import { JOURNAL_TYPE_TO_LABEL } from '@/utils/constants';

const HabitClient = ({ journalEntries }: { journalEntries: Journal[] }) => {
  const [journalEntriesList, setJournalEntriesList] = useState<Journal[]>(journalEntries);

  const addNewJournalEntry = (newJournalEntry: Journal) => {
    setJournalEntriesList([newJournalEntry, ...journalEntriesList]);
  }

  return (
    <div className='w-10/12'>
      <JournalForm addNewEntry={addNewJournalEntry} />
      <h2 className='text-3xl font-bold	pt-12 pb-8'>Past Entries</h2>
      {journalEntriesList.map((entry: Journal) => {
        return <div key={entry.ID} className='py-4'>
          <p className='text-xl pb-1'>{entry.title}</p>
          <p>{entry.desc}</p>
          <div className='flex flex-row justify-between pt1'>
            <p className='text-slate-400'>Created at: {formatDateString(entry.CreatedAt)}</p>
            <div className="badge badge-primary badge-outline">{JOURNAL_TYPE_TO_LABEL[entry.type]}</div>
          </div>
        </div>
      })}
    </div>
  );
};

export default HabitClient;
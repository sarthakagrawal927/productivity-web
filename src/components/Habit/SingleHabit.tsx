"use client"
import { HabitLog, HabitWithLogs } from '@/types';
import { HABIT_MODE_TO_LABEL, HABIT_STATUS_TO_LABEL } from '@/utils/constants';
import { getHabitFrequencyString } from '@/utils/entityHelpers';
import { formatDateString } from '@/utils/helpers';
import React from 'react';
import LogModal from './LogModal';

const SingleHabit = ({ habit, logs }: HabitWithLogs) => {
  const [allLogs, setAllLogs] = React.useState<HabitLog[]>(logs);
  const onLog = (log: HabitLog) => {
    setAllLogs([...allLogs, log]);
  }
  return (
    <div>
      <p>{habit.title}</p>
      <p>{habit.desc}</p>
      <p>Target: {getHabitFrequencyString(habit)}</p>
      <p>Status: {HABIT_STATUS_TO_LABEL[habit.status]}</p>
      <p>Logs:
      </p>
      <ul>
        {allLogs.map((log) => <li key={log.habit_id}>{log.result_count} {HABIT_MODE_TO_LABEL[habit.mode]} on {formatDateString(log.result_time)}</li>)}
      </ul>
      <LogModal habit={habit} onLog={onLog} />
      <button className='btn btn-accent' onClick={() => (document.getElementById('my_modal_1') as HTMLDialogElement)?.showModal()}>
        Log {habit.title}
      </button>
    </div >
  );
};

export default SingleHabit;
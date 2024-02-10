import { Habit } from '@/types';
import { HABIT_FREQUENCY_TYPE_TO_LABEL, HABIT_MODE, HABIT_STATUS_TO_LABEL } from '@/utils/constants';
import { formatDateString } from '@/utils/helpers';
import LogModal from './LogModal';
import { Dispatch, useState } from 'react';

const HABIT_MODE_TYPE_TO_DESC = {
  [HABIT_MODE.COUNT]: 'times',
  [HABIT_MODE.TIME]: 'minutes',
}

function getHabitFrequencyString(habit: Habit) {
  return `${habit.target} ${HABIT_MODE_TYPE_TO_DESC[habit.mode]} ${HABIT_FREQUENCY_TYPE_TO_LABEL[habit.frequency_type]}`;
}

function HabitTableBody({ habits, setActiveHabit }: { habits: Habit[], setActiveHabit: Dispatch<Habit> }) {
  return <table className="table table-zebra">
    <tbody>
      {habits.map((habit: Habit) => (
        <tr key={habit.ID}>
          <th>{habit.ID}</th>
          <td>
            <div className='font-bold'>{habit.title}</div>
            <div className='text-slate-400'>{habit.desc}</div>
          </td>
          <td>{getHabitFrequencyString(habit)}</td>
          <td>{HABIT_STATUS_TO_LABEL[habit.status]}</td>
          <td>{formatDateString(habit.CreatedAt)}</td>
          <td>
            <button className="btn btn-sm btn-accent" onClick={() => {
              setActiveHabit(habit);
              (document.getElementById('my_modal_1') as HTMLDialogElement).showModal()
            }}>
              Log
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
}

const HabitList = ({ habits }: { habits: Habit[] }) => {
  const [activeHabit, setActiveHabit] = useState<Habit | undefined>();
  const [showAntiHabits, setShowAntiHabits] = useState(false);
  return (
    <div className="overflow-x-auto">
      <LogModal habit={activeHabit} />
      <HabitTableBody habits={habits.filter(habit => !habit.anti)} setActiveHabit={setActiveHabit} />
      <div className="text-center mt-4">
        <button className="btn" onClick={() => setShowAntiHabits(!showAntiHabits)}>
          {showAntiHabits ? 'Hide' : 'Show'} Anti-Habits
        </button>
      </div>
      {showAntiHabits && <HabitTableBody habits={habits.filter(habit => habit.anti)} setActiveHabit={setActiveHabit} />}
    </div>
  );
};

export default HabitList;
import { Habit } from '@/types';
import { HABIT_FREQUENCY_TYPE_TO_LABEL, HABIT_MODE, HABIT_STATUS_TO_LABEL } from '@/utils/constants';
import { formatDateString } from '@/utils/helpers';

const HABIT_MODE_TYPE_TO_DESC = {
  [HABIT_MODE.COUNT]: 'times',
  [HABIT_MODE.TIME]: 'minutes',
}

function getHabitFrequencyString(habit: Habit) {
  return `${habit.target} ${HABIT_MODE_TYPE_TO_DESC[habit.mode]} ${HABIT_FREQUENCY_TYPE_TO_LABEL[habit.frequency_type]}`;
}

const HabitList = ({ habits }: { habits: Habit[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
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
                <button className="btn btn-sm btn-accent">
                  Log
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HabitList;
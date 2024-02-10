import { Habit } from '@/types';
import { HABIT_FREQUENCY_TYPE_TO_LABEL, HABIT_MODE, HABIT_STATUS_TO_LABEL } from '@/utils/constants';
import { formatDateString } from '@/utils/helpers';
import LogModal from './LogModal';
import { Dispatch, useState } from 'react';
import CustomTable, { CELL_TYPE } from '../common/CustomTable';

const HABIT_MODE_TYPE_TO_DESC = {
  [HABIT_MODE.COUNT]: 'times',
  [HABIT_MODE.TIME]: 'minutes',
}

function getHabitFrequencyString(habit: Habit) {
  return `${habit.target} ${HABIT_MODE_TYPE_TO_DESC[habit.mode]} ${HABIT_FREQUENCY_TYPE_TO_LABEL[habit.frequency_type]}`;
}

function HabitTableBody({ habits, setActiveHabit }: { habits: Habit[], setActiveHabit: Dispatch<Habit> }) {
  return <>
    <CustomTable
      rows={habits.map(habit => ({
        cells: [
          { kind: CELL_TYPE.TEXT, widthPercent: 2, text: habit.ID.toString(), additionalProps: {} },
          { kind: CELL_TYPE.TEXT_WITH_SUBTEXT, widthPercent: 60, text: habit.title, additionalProps: { subText: habit.desc } },
          { kind: CELL_TYPE.TEXT, widthPercent: 10, text: getHabitFrequencyString(habit), additionalProps: {} },
          { kind: CELL_TYPE.TEXT, widthPercent: 10, text: HABIT_STATUS_TO_LABEL[habit.status], additionalProps: {} },
          { kind: CELL_TYPE.TEXT, widthPercent: 10, text: formatDateString(habit.CreatedAt), additionalProps: {} },
          { kind: CELL_TYPE.BUTTON, widthPercent: 8, text: 'Log', additionalProps: { onClick: () => setActiveHabit(habit) } },
        ]
      }))}
    />
  </>
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
import { Habit } from '@/types';
import { getHabitFrequencyString, getHabitUsageString } from '@/utils/entityHelpers';
import { formatDateString, openHtmlDialog } from '@/utils/helpers';
import { useRouter } from 'next/navigation';
import { Dispatch, useState } from 'react';
import CustomTable, { CELL_TYPE } from '../common/CustomTable';
import LogModal from './LogModal';
import { LargeHeading } from '../common/Typography';
import { MODAL_IDS } from '@/utils/constants';

function HabitTableBody({ habits, setActiveHabit }: { habits: Habit[], setActiveHabit: Dispatch<Habit> }) {
  const router = useRouter();

  return <>
    <CustomTable
      rows={habits.map((habit, idx) => ({
        cells: [
          { kind: CELL_TYPE.TEXT, widthPercent: 2, text: (idx + 1).toString(), additionalProps: {} },
          { kind: CELL_TYPE.TEXT_WITH_SUBTEXT, widthPercent: 60, text: habit.title, additionalProps: { subText: habit.desc } },
          { kind: CELL_TYPE.TEXT, widthPercent: 16, text: getHabitFrequencyString(habit), additionalProps: {} },
          {
            kind: CELL_TYPE.TEXT_WITH_SUBTEXT, widthPercent: 16, text: getHabitUsageString(habit), additionalProps: {
              subText: `Streak: ${habit.current_streak.toString()}`
            }
          },
          // { kind: CELL_TYPE.TEXT, widthPercent: 16, text: formatDateString(habit.CreatedAt), additionalProps: {} },
          {
            kind: CELL_TYPE.BUTTON, widthPercent: 6, text: 'Log', additionalProps: {
              onClick: () => {
                openHtmlDialog(MODAL_IDS.LOG_MODAL);
                setActiveHabit(habit);
              }
            }
          },
        ],
        onClick: () => {
          router.push(`/habit/logs/${habit.ID}`)
        },
      }))}
    />
  </>
}

const HabitList = ({ habits }: { habits: Habit[] }) => {
  const [activeHabit, setActiveHabit] = useState<Habit | undefined>();
  const [showAntiHabits, setShowAntiHabits] = useState(false); // TODO: initialize based on local storage
  // TODO: add option to show archived habits
  return (
    <div className="overflow-x-auto">
      <div className='flex flex-row justify-between'>
        <LargeHeading>Active Habits</LargeHeading> {/* TODO: to show archived habits */}
        <button className="btn btn-circle text-xl font-bold" onClick={() => openHtmlDialog(MODAL_IDS.HABIT_FORM_MODAL)}>+</button>
      </div>
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
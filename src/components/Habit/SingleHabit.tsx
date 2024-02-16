"use client"
import { HabitLog, HabitWithLogs } from '@/types';
import { HABIT_STATUS, HABIT_STATUS_TO_LABEL, MODAL_IDS } from '@/utils/constants';
import { getHabitFrequencyString } from '@/utils/entityHelpers';
import { formatDateString, openHtmlDialog } from '@/utils/helpers';
import React from 'react';
import LogModal from './LogModal';
import { DescriptionText, LargeHeading, RegularText, StrongText } from '../common/Typography';
import Badge, { BadgeMode } from '../common/Badge';
import LogsBarGraph from '../common/Graphs/LogsBarGraph';
import HabitLogs from './HabitLogs';

const SingleHabit = ({ habit, logs }: HabitWithLogs) => {
  const [allLogs, setAllLogs] = React.useState<HabitLog[]>(logs);
  const onLog = (log: HabitLog) => {
    setAllLogs([...allLogs, log]);
  }
  // TODO: Beautify more, add option edit habit (& archive as well)
  return (
    <div>
      <LargeHeading text={habit.title} />
      <DescriptionText text={habit.desc} />
      <Badge mode={
        habit.status === HABIT_STATUS.ARCHIVED
          ? BadgeMode.DANGER
          : BadgeMode.SUCCESS}
        text={HABIT_STATUS_TO_LABEL[habit.status]}
      />
      <StrongText text={`Target: ${getHabitFrequencyString(habit)}`} />
      <DescriptionText text={`Started Since: ${formatDateString(habit.CreatedAt)}`} />
      <LargeHeading text='Logs' />
      <HabitLogs logs={allLogs.map(log => ({ ...log, mode: habit.mode }))} />
      <LogModal habit={habit} onLog={onLog} />
      {habit.status === HABIT_STATUS.ACTIVE && allLogs.length > 0 && <LogsBarGraph height={300} width={400} logs={allLogs} habit={habit} />}
      <button
        className='btn btn-accent'
        onClick={() => openHtmlDialog(MODAL_IDS.LOG_MODAL)}
      >
        Log {habit.title}
      </button>
    </div >
  );
};

export default SingleHabit;
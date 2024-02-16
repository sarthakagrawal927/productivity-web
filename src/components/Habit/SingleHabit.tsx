"use client"
import { HabitLog, HabitWithLogs } from '@/types';
import { HABIT_STATUS, HABIT_STATUS_TO_LABEL, MODAL_IDS } from '@/utils/constants';
import { HABIT_MODE_TYPE_TO_DESC, getHabitFrequencyString } from '@/utils/entityHelpers';
import { formatDateString, openHtmlDialog } from '@/utils/helpers';
import React from 'react';
import LogModal from './LogModal';
import { DescriptionText, LargeHeading, RegularText, StrongText } from '../common/Typography';
import Badge, { BadgeMode } from '../common/Badge';
import LogsBarGraph from '../common/Graphs/LogsBarGraph';

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
      <ul role='list' className='divide-y divide-slate-800'>
        {allLogs.map((log) => <li key={log.ID} className="flex justify-between gap-x-6 py-2">
          <RegularText text={`${log.result_count} ${HABIT_MODE_TYPE_TO_DESC[habit.mode]}`} />
          <DescriptionText text={formatDateString(log.result_time)} />
        </li>)}
      </ul>
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
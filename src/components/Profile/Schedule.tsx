'use client';
import React from 'react';
import { ScheduleEntry } from '@/types';
import CustomTable, { CELL_TYPE } from '../common/CustomTable';
import { LargeHeading } from '../common/Typography';

const Schedule: React.FC<{ schedule: ScheduleEntry[] }> = ({ schedule }) => {
  return (
    <>
      <LargeHeading>Today&apos; s Schedule</LargeHeading>
      <CustomTable
        rows={schedule.map((entry, idx) => ({
          cells: [
            { kind: CELL_TYPE.TEXT, widthPercent: 1, text: (idx + 1).toString(), additionalProps: {} },
            { kind: CELL_TYPE.TEXT, widthPercent: 80, text: entry.label, additionalProps: {} },
            {
              kind: CELL_TYPE.TEXT, widthPercent: 20, additionalProps: {},
              text: `${entry.start_time.hour}:${entry.start_time.minute} to ${entry.end_time.hour}:${entry.end_time.minute}`,
            },
          ],
        }))}
      />
    </>
  );
};

export default Schedule;
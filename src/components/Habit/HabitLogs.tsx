'use client';
import { LogWithHabit } from '@/types';
import { HABIT_MODE_TYPE_TO_DESC } from '@/utils/entityHelpers';
import { formatDateString } from '@/utils/helpers';
import { HABIT_MODE, MOOD_RATING_TO_LABEL } from '@/utils/constants';
import CustomTable, { CELL_TYPE, Cell } from '../common/CustomTable';

const HabitLogs = ({ logs }: { logs: LogWithHabit[] }) => {
  return (
    <CustomTable
      rows={logs.map((log, idx) => ({
        cells: [
          { kind: CELL_TYPE.TEXT, widthPercent: 1, text: (idx + 1).toString(), additionalProps: {} },
          log.title ? { kind: CELL_TYPE.TEXT, widthPercent: 20, text: log.title, additionalProps: {} } : undefined,
          {
            kind: CELL_TYPE.TEXT, widthPercent: 15, text: `${log.count} ${HABIT_MODE_TYPE_TO_DESC[log.mode || HABIT_MODE.COUNT]}`, additionalProps: {}
          },
          { kind: CELL_TYPE.TEXT, widthPercent: 15, text: formatDateString(log.logged_for_date), additionalProps: {} },
          { kind: CELL_TYPE.TEXT, widthPercent: 15, text: log.mood_rating ? MOOD_RATING_TO_LABEL[log.mood_rating] : '-', additionalProps: {} },
          { kind: CELL_TYPE.TEXT, widthPercent: 20, text: log.comment || '-', additionalProps: {} },
        ].filter(v => v !== undefined) as Cell<CELL_TYPE>[],
      }))}
    />
  );
};

export default HabitLogs;
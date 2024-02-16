import { LogWithHabit } from '@/types';
import { HABIT_MODE_TYPE_TO_DESC } from '@/utils/entityHelpers';
import { formatDateString } from '@/utils/helpers';
import { HABIT_MODE } from '@/utils/constants';
import CustomTable, { CELL_TYPE, Cell } from '../common/CustomTable';

const HabitLogs = ({ logs }: { logs: LogWithHabit[] }) => {
  return (
    <CustomTable
      rows={logs.map((log, idx) => ({
        cells: [
          { kind: CELL_TYPE.TEXT, widthPercent: 2, text: (idx + 1).toString(), additionalProps: {} },
          log.title ? { kind: CELL_TYPE.TEXT, widthPercent: 36, text: log.title, additionalProps: {} } : undefined,
          {
            kind: CELL_TYPE.TEXT, widthPercent: 30, text: `${log.result_count} ${HABIT_MODE_TYPE_TO_DESC[log.mode || HABIT_MODE.COUNT]}`, additionalProps: {}
          },
          { kind: CELL_TYPE.TEXT, widthPercent: 30, text: formatDateString(log.result_time), additionalProps: {} },
          { kind: CELL_TYPE.TEXT, widthPercent: 0, text: log.comment, additionalProps: {} },
        ].filter(v => v !== undefined) as Cell<CELL_TYPE>[],
      }))}
    />
  );
};

export default HabitLogs;
import React, { useMemo } from 'react';
import { Bar } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleBand, scaleLinear } from '@visx/scale';
import { Habit, HabitLog } from '@/types';
import { HABIT_FREQUENCY_TYPE } from '@/utils/constants';

const verticalMargin = 120;

export type BarsProps = {
  width: number;
  height: number;
  logs: HabitLog[],
  habit: Habit
};

// logs will be of 21 days, each day can have multiple entries, can definitely improve this, but will probably start sending this cleaned data from backend itself
const mergeLogsByDate = (logs: HabitLog[]) => {
  const mergedLogs = [];
  for (let i = 0; i < logs.length; i++) {
    const log = logs[i];
    log.result_time = log.result_time.split('T')[0];
    const date = log.result_time;
    const index = mergedLogs.findIndex((l) => l.result_time === date);
    if (index === -1) {
      mergedLogs.push({ ...log, result_time: log.result_time });
    } else {
      mergedLogs[index].result_count += log.result_count;
    }
  }
  return mergedLogs;
}

const handleAntiHabit = (mergedLogs: HabitLog[]) => {
  return mergedLogs.map((log) => {
    log.result_count = -log.result_count;
    return log;
  })
}

const getTwentyOnedays = (habitStartDate: string) => {
  const twentyOneDays = [];
  const startDate = new Date(habitStartDate);
  const endDate = new Date();
  for (let i = 0; i < 21; i++) {
    const date = new Date(endDate);
    date.setDate(date.getDate() - i);
    // do not take dates higher than today
    if (date < startDate) {
      break;
    }
    twentyOneDays.push(date.toISOString().split('T')[0]);
  }
  return twentyOneDays.reverse();
}


export default function LogsBarGraph({ width, height, habit, logs }: BarsProps) {
  const xMax = width;
  const yMax = height - verticalMargin;
  const habitStartDate = habit.CreatedAt;
  let mergedLogs = mergeLogsByDate(logs);
  if (habit.anti) mergedLogs = handleAntiHabit(mergedLogs)
  const twentyOneDays = getTwentyOnedays(habitStartDate);

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: twentyOneDays,
        padding: 0.4,
      }),
    [xMax, twentyOneDays],
  );

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...mergedLogs.map(log => log.result_count))],
      }),
    [mergedLogs, yMax],
  );

  return width < 10 ? null : (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="url(#teal)" rx={14} />
      <Group top={verticalMargin / 2}>
        {mergedLogs.map((d) => {
          const logDate = d.result_time;
          const barWidth = xScale.bandwidth();
          const barHeight = yMax - (yScale(d.result_count) ?? 0);
          const barX = xScale(logDate);
          const barY = yMax - barHeight;
          return (
            <Bar
              key={`bar-${logDate}`}
              x={barX}
              y={barY}
              width={barWidth}
              height={barHeight}
              fill={d.result_count > (habit.target / (habit.frequency_type === HABIT_FREQUENCY_TYPE.DAILY ? 1 : 7)) ? "rgba(23, 233, 217, .5)" : "red"}
              onClick={() => { }}
              onMouseEnter={() => { }}
            />
          );
        })}
      </Group>
    </svg>
  );
}
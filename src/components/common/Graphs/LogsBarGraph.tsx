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
const mergeLogsByDate = (logs: HabitLog[], habit: Habit) => {
  const lastTwentyOneDays = getTwentyOneDays(habit.CreatedAt);
  return Object.keys(lastTwentyOneDays).map((date) => ({
    date,
    result_count: lastTwentyOneDays[date],
    color: 'rgba(23, 233, 217, .5)'
  }));
}

const getTwentyOneDays = (habitStartDate: string) => {
  const twentyOneDays: { [date: string]: number } = {};
  const startDate = new Date(habitStartDate);
  const endDate = new Date();
  for (let i = 0; i < 21; i++) {
    const date = new Date(endDate);
    date.setDate(date.getDate() - i);
    if (date < startDate) break;
    twentyOneDays[date.toISOString().split('T')[0]] = 0;
  }
  return twentyOneDays;
}

const HabitFreqDivider: { [freq: number]: number } = {
  [HABIT_FREQUENCY_TYPE.DAILY]: 1,
  [HABIT_FREQUENCY_TYPE.WEEKLY]: 7,
  [HABIT_FREQUENCY_TYPE.MONTHLY]: 30,
}

export default function LogsBarGraph({ width, height, habit, logs }: BarsProps) {
  const xMax = width;
  const yMax = height - verticalMargin;
  const mergedLogs = mergeLogsByDate(logs, habit);

  // scales, memoize for performance
  const xScale = useMemo(
    () =>
      scaleBand<string>({
        range: [0, xMax],
        round: true,
        domain: mergedLogs.map(d => d.date),
        padding: 0.4,
      }),
    [xMax, mergedLogs],
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
          const logDate = d.date;
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
              fill={d.color}
              onClick={() => { }}
              onMouseEnter={() => { }}
            />
          );
        })}
      </Group>
    </svg>
  );
}
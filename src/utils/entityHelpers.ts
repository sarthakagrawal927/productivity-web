import { Habit, HabitLog } from "@/types";
import { HABIT_FREQUENCY_TYPE, HABIT_FREQUENCY_TYPE_TO_LABEL, HABIT_MODE } from "./constants";

export const HABIT_MODE_TYPE_TO_DESC = {
  [HABIT_MODE.COUNT]: 'times',
  [HABIT_MODE.TIME]: 'minutes',
  [HABIT_MODE.ML]: 'ml',
}

const HABIT_FREQ_COUNTER_LABEL: { [type: number]: string } = {
  [HABIT_FREQUENCY_TYPE.DAILY]: 'today',
  [HABIT_FREQUENCY_TYPE.WEEKLY]: 'this week',
  [HABIT_FREQUENCY_TYPE.MONTHLY]: 'this month',
}

export function getHabitFrequencyString(habit: Habit) {
  return `${habit.lower_limit}-${habit.upper_limit} ${HABIT_MODE_TYPE_TO_DESC[habit.mode]} ${HABIT_FREQUENCY_TYPE_TO_LABEL[habit.frequency_type]}`;
}

export function getHabitUsageString(habit: Habit) {
  return `${habit.existing_usage} ${HABIT_MODE_TYPE_TO_DESC[habit.mode]} ${HABIT_FREQ_COUNTER_LABEL[habit.frequency_type]}`;
}

export function handleHabitUpdateOnLog(habit: Habit, log: HabitLog): Habit {
  return {
    ...habit,
    existing_usage: habit.existing_usage + log.count,
  }
}
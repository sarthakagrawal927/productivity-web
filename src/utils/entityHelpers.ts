import { Habit } from "@/types";
import { HABIT_FREQUENCY_TYPE_TO_LABEL, HABIT_MODE } from "./constants";

const HABIT_MODE_TYPE_TO_DESC = {
  [HABIT_MODE.COUNT]: 'times',
  [HABIT_MODE.TIME]: 'minutes',
}

export function getHabitFrequencyString(habit: Habit) {
  return `${habit.target} ${HABIT_MODE_TYPE_TO_DESC[habit.mode]} ${HABIT_FREQUENCY_TYPE_TO_LABEL[habit.frequency_type]}`;
}
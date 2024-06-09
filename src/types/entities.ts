import { BaseType } from "./helpers";

export type Task = BaseType & {
  status: number;
  priority: number;
  deadline: string;
  time_to_spend: number;
}

export type Journal = BaseType & {
  type: number
}

export type Habit = BaseType & {
  user_id: number;
  anti: boolean;
  frequency_type: number;
  target: number;
  mode: number;
  status: number;
  existing_usage: number;
}

export type HabitLog =BaseType & {
  ID: number;
  habit_id: number;
  result_time: string;
  result_count: number;
  comment: string;
}

export type HabitWithLogs = {
  habit: Habit;
  logs: HabitLog[];
}

export type FoodItem = BaseType & {
  name: string;
  kcal: number;
  protein: number;
  fiber: number;
  quantity: number;
}

export type LogWithHabit = Partial<Habit> & HabitLog

export type ScheduleEntry = {
  label: string;
  start_time: {
    hour: number;
    minute: number;
  };
  end_time: {
    hour: number;
    minute: number;
  };
}

export type DayFoodLogType = {
  food_consumed: FoodItem[],
  total_food_consumed: FoodItem,
}
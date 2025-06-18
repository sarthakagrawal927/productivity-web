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
  frequency_type: number;
  upper_limit: number;
  lower_limit: number;
  priority: number;
  mode: number;
  status: number;
  score: number;
  existing_usage: number;
}

export type HabitLog = BaseType & {
  ID: number;
  user_id: number;
  habit_id: number;
  count: number;
  comment?: string;
  logged_for_date: string;
  mood_rating: number;
}

export type HabitWithLogs = {
  habit: Habit;
  logs: HabitLog[];
}

export type FoodItemSmall = {
  kcal: number;
  protein: number;
  fiber: number;
  carbs: number;
  fat: number;
  name: string;
  quantity: number;
  date: string;
}

export type FoodItem = BaseType & FoodItemSmall

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
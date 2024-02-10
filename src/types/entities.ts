import { BaseType } from "./helpers";

export type Task = BaseType & {
  status: number;
  due_date: string;
  priority: number;
  complexity: number;
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
}

export type HabitLog = {
  ID: number;
  habit_id: number;
  result_time: string;
  result_count: number;
}

export type HabitWithLogs = {
  habit: Habit;
  logs: HabitLog[];
}

export type Consumable = BaseType & {
  habit_id: number;
  smallest_unit_label: string;
  time_per_unit: number;
  num_total_unit: number;
  num_remaining_unit: number;
}
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
  current_streak: number;
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

export type Consumable = BaseType & {
  habit_id: number;
  smallest_unit_label: string;
  time_per_unit: number;
  num_total_unit: number;
  num_remaining_unit: number;
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
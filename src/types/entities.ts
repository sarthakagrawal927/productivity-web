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
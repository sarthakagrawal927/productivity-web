type BaseType = {
  ID: number;
  title: string;
  desc: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
}

export type Task = BaseType & {
  status: number;
  due_date: string;
  priority: number;
  complexity: number;
}

export type DropdownOption = {
  value: number;
  label: string;
}

export type Journal = BaseType & {
  type: number
}
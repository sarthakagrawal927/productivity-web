export type Task = {
  ID: number;
  title: string;
  desc: string;
  status: number;
  due_date: string;
  priority: number;
  complexity: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
}

export type DropdownOption = {
  value: number;
  label: string;
}
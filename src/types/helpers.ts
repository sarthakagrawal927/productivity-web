export type DropdownOption = {
  value: number;
  label: string;
}

export type BaseType = {
  ID: number;
  title: string;
  description: string;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;
}

export type NumORStr = number | string;
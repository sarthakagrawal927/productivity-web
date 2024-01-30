import { DropdownOption } from "@/types";

export function formatDateString(dateString: string) {
  return dateString.substring(0, 10);
}

export function getOptionsListFromValueLabelMap(valueLabelMap: { [key: number]: string }) : DropdownOption[] {
  return Object.keys(valueLabelMap).map(key => ({ value: Number(key), label: valueLabelMap[Number(key)] }));
}
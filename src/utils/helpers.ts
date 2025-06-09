import { DropdownOption } from "@/types";
import { MODAL_IDS } from "./constants";

export function formatDateString(dateString?: string) {
  if (!dateString) return "";
  return dateString.substring(0, 10);
}

export function getOptionsListFromValueLabelMap(valueLabelMap: {
  [key: number]: string;
}): DropdownOption[] {
  return Object.keys(valueLabelMap).map((key) => ({
    value: Number(key),
    label: valueLabelMap[Number(key)],
  }));
}

export function inWindow() {
  return typeof window !== "undefined";
}

export function openHtmlDialog(dialogId: MODAL_IDS) {
  if (!inWindow()) return;
  (document.getElementById(dialogId) as HTMLDialogElement)?.showModal();
}

export function closeHtmlDialog(dialogId: MODAL_IDS) {
  if (!inWindow()) return;
  (document.getElementById(dialogId) as HTMLDialogElement)?.close();
}

export function roundToTwoDecimals(num: number) {
  return Math.round((num + Number.EPSILON) * 100) / 100;
}

import { DropdownOption } from "@/types"

export const TASK_STATUS = {
  TODO: 1,
  IN_PROGRESS: 2,
  DONE: 3,
  BACKLOG: 4
}

export const PRIORITY = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3
}

export const COMPLEXITY = {
  LOW: 1,
  MEDIUM: 2,
  HIGH: 3
}

export enum DROP_DOWN_MODE {
  PRIORITY = 'PRIORITY',
  COMPLEXITY = 'COMPLEXITY',
  STATUS = 'STATUS'
}

export const TASK_STATUS_TO_LABEL : {[status: number]: string} = {
  [TASK_STATUS.TODO]: 'Todo',
  [TASK_STATUS.IN_PROGRESS]: 'In Progress',
  [TASK_STATUS.DONE]: 'Done',
  [TASK_STATUS.BACKLOG]: 'Backlog'
}

export const PRIORITY_TO_LABEL : {[priority: number]: string} = {
  [PRIORITY.LOW]: 'Low',
  [PRIORITY.MEDIUM]: 'Medium',
  [PRIORITY.HIGH]: 'High'
}

export const COMPLEXITY_TO_LABEL: { [complexity: number]: string } = {
  [COMPLEXITY.LOW]: 'Low',
  [COMPLEXITY.MEDIUM]: 'Medium',
  [COMPLEXITY.HIGH]: 'High'
};

export const DROPDOWN_MODE_VALUES: {
  [mode: string]: {
    defaultOption: DropdownOption;
    optionList: DropdownOption[];
  }
} = {
  [DROP_DOWN_MODE.STATUS]: {
    defaultOption: {
      value: 0,
      label: "Select status"
    },
    optionList: [
      { value: TASK_STATUS.TODO, label: TASK_STATUS_TO_LABEL[TASK_STATUS.TODO] },
      { value: TASK_STATUS.IN_PROGRESS, label: TASK_STATUS_TO_LABEL[TASK_STATUS.IN_PROGRESS] },
      { value: TASK_STATUS.DONE, label: TASK_STATUS_TO_LABEL[TASK_STATUS.DONE] },
      { value: TASK_STATUS.BACKLOG, label: TASK_STATUS_TO_LABEL[TASK_STATUS.BACKLOG] },
    ],
  },
  [DROP_DOWN_MODE.PRIORITY]: {
    defaultOption: {
      value: 0,
      label: "Select priority"
    },
    optionList: [
      { value: PRIORITY.LOW, label: PRIORITY_TO_LABEL[PRIORITY.LOW] },
      { value: PRIORITY.MEDIUM, label: PRIORITY_TO_LABEL[PRIORITY.MEDIUM] },
      { value: PRIORITY.HIGH, label: PRIORITY_TO_LABEL[PRIORITY.HIGH] },
    ]
  },
  [DROP_DOWN_MODE.COMPLEXITY]: {
    defaultOption: {
      value: 0,
      label: "Select complexity"
    },
    optionList: [
      { value: COMPLEXITY.LOW, label: COMPLEXITY_TO_LABEL[COMPLEXITY.LOW] },
      { value: COMPLEXITY.MEDIUM, label: COMPLEXITY_TO_LABEL[COMPLEXITY.MEDIUM] },
      { value: COMPLEXITY.HIGH, label: COMPLEXITY_TO_LABEL[COMPLEXITY.HIGH] },
    ]
  }
};

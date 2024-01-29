export const TASK_STATUS = {
  TODO: 1,
  IN_PROGRESS: 2,
  DONE: 3,
  BACKLOG: 4
}

export const PRIORITY = {
  NO: 1,
  LOW: 2,
  MEDIUM: 3,
  HIGH: 4
}

export const COMPLEXITY = {
  NO: 1,
  LOW: 2,
  MEDIUM: 3,
  HIGH: 4
}

export const JOURNAL_TYPE = {
  IDEA: 1,
  GRATITUDE: 2,
  MIND_CLEAR: 3,
  DAY_PLANNING: 4,
  DAY_WRAP: 5,
  EVENT: 6,
  FOOD_LOG: 7,
}

export const HABIT_FREQUENCY_TYPE = {
  DAILY: 1,
  WEEKLY: 2
}

export const HABIT_STATUS = {
  ACTIVE: 1,
  PAUSED: 2,
}

export const HABIT_MODE = {
  TIME: 1,
  COUNT: 2,
}

export enum TODO_DROPDOWN_MODE {
  PRIORITY = 'PRIORITY',
  COMPLEXITY = 'COMPLEXITY',
  STATUS = 'STATUS',
}

export enum HABIT_DROPDOWN_MODE {
  FREQUENCY_TYPE = 'FREQUENCY_TYPE',
  STATUS = 'STATUS',
  MODE = 'MODE'
}

export enum JOURNAL_DROPDOWN_MODE {
  TYPE = 'TYPE'
}

export const TASK_STATUS_TO_LABEL : {[status: number]: string} = {
  [TASK_STATUS.TODO]: 'Todo',
  [TASK_STATUS.IN_PROGRESS]: 'In Progress',
  [TASK_STATUS.DONE]: 'Done',
  [TASK_STATUS.BACKLOG]: 'Backlog'
}

export const PRIORITY_TO_LABEL: { [priority: number]: string } = {
  [PRIORITY.NO]: 'No Priority',
  [PRIORITY.LOW]: 'Low',
  [PRIORITY.MEDIUM]: 'Medium',
  [PRIORITY.HIGH]: 'High'
}

export const COMPLEXITY_TO_LABEL: { [complexity: number]: string } = {
  [COMPLEXITY.NO]: 'Complexity not set',
  [COMPLEXITY.LOW]: 'Low',
  [COMPLEXITY.MEDIUM]: 'Medium',
  [COMPLEXITY.HIGH]: 'High'
};

export const JOURNAL_TYPE_TO_LABEL: { [type: number]: string } = {
  [JOURNAL_TYPE.IDEA]: 'Idea',
  [JOURNAL_TYPE.GRATITUDE]: 'Gratitude',
  [JOURNAL_TYPE.MIND_CLEAR]: 'Mind Clear',
  [JOURNAL_TYPE.DAY_PLANNING]: 'Day Planning',
  [JOURNAL_TYPE.DAY_WRAP]: 'Day Wrap',
  [JOURNAL_TYPE.EVENT]: 'Event',
  [JOURNAL_TYPE.FOOD_LOG]: 'Food Log'
}

export const DROPDOWN_MODE_VALUES = {
  [TODO_DROPDOWN_MODE.STATUS]: {
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
  [TODO_DROPDOWN_MODE.PRIORITY]: {
    defaultOption: {
      value: 0,
      label: "Select priority"
    },
    optionList: [
      { value: PRIORITY.NO, label: PRIORITY_TO_LABEL[PRIORITY.NO] },
      { value: PRIORITY.LOW, label: PRIORITY_TO_LABEL[PRIORITY.LOW] },
      { value: PRIORITY.MEDIUM, label: PRIORITY_TO_LABEL[PRIORITY.MEDIUM] },
      { value: PRIORITY.HIGH, label: PRIORITY_TO_LABEL[PRIORITY.HIGH] },
    ]
  },
  [TODO_DROPDOWN_MODE.COMPLEXITY]: {
    defaultOption: {
      value: 0,
      label: "Select complexity"
    },
    optionList: [
      { value: COMPLEXITY.LOW, label: COMPLEXITY_TO_LABEL[COMPLEXITY.LOW] },
      { value: COMPLEXITY.MEDIUM, label: COMPLEXITY_TO_LABEL[COMPLEXITY.MEDIUM] },
      { value: COMPLEXITY.HIGH, label: COMPLEXITY_TO_LABEL[COMPLEXITY.HIGH] },
      { value: COMPLEXITY.NO, label: COMPLEXITY_TO_LABEL[COMPLEXITY.NO]}
    ]
  },
  [JOURNAL_DROPDOWN_MODE.TYPE]: {
    defaultOption: {
      value: 0,
      label: "Select journal type"
    },
    optionList: [
      { value: JOURNAL_TYPE.IDEA, label: JOURNAL_TYPE_TO_LABEL[JOURNAL_TYPE.IDEA] },
      { value: JOURNAL_TYPE.GRATITUDE, label: JOURNAL_TYPE_TO_LABEL[JOURNAL_TYPE.GRATITUDE] },
      { value: JOURNAL_TYPE.MIND_CLEAR, label: JOURNAL_TYPE_TO_LABEL[JOURNAL_TYPE.MIND_CLEAR] },
      { value: JOURNAL_TYPE.DAY_PLANNING, label: JOURNAL_TYPE_TO_LABEL[JOURNAL_TYPE.DAY_PLANNING] },
      { value: JOURNAL_TYPE.DAY_WRAP, label: JOURNAL_TYPE_TO_LABEL[JOURNAL_TYPE.DAY_WRAP] },
      { value: JOURNAL_TYPE.EVENT, label: JOURNAL_TYPE_TO_LABEL[JOURNAL_TYPE.EVENT] },
      { value: JOURNAL_TYPE.FOOD_LOG, label: JOURNAL_TYPE_TO_LABEL[JOURNAL_TYPE.FOOD_LOG] },
    ]
  },
};

export const HABIT_DROPDOWN_MODE_VALUES = {
  [HABIT_DROPDOWN_MODE.FREQUENCY_TYPE]: {
    defaultOption: {
      value: 0,
      label: "Select frequency type"
    },
    optionList: [
      { value: HABIT_FREQUENCY_TYPE.DAILY, label: 'Daily' },
      { value: HABIT_FREQUENCY_TYPE.WEEKLY, label: 'Weekly' },
    ]
  },
  [HABIT_DROPDOWN_MODE.STATUS]: {
    defaultOption: {
      value: HABIT_STATUS.ACTIVE,
      label: "Active"
    },
    optionList: [
      { value: HABIT_STATUS.PAUSED, label: 'Paused' },
      { value: HABIT_STATUS.ACTIVE, label: 'Active' },
    ]
  },
  [HABIT_DROPDOWN_MODE.MODE]: {
    defaultOption: {
      value: 0,
      label: "Select mode"
    },
    optionList: [
      { value: HABIT_MODE.TIME, label: 'Time (Minutes)' },
      { value: HABIT_MODE.COUNT, label: 'Count' },
    ]
  }
}
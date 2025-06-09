import { getOptionsListFromValueLabelMap } from "./helpers"

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

export const JOURNAL_TYPE = {
  IDEA: 1,
  GRATITUDE: 2,
  MIND_CLEAR: 3,
  DAY_PLANNING: 4,
  DAY_WRAP: 5,
  EVENT: 6,
  FOOD_LOG: 7,
  HIGHLIGHT_OF_THE_DAY: 8,
}

export const HABIT_FREQUENCY_TYPE = {
  DAILY: 1,
  WEEKLY: 2,
  MONTHLY: 3,
}

export const HABIT_STATUS = {
  ACTIVE: 1,
  ARCHIVED: 2,
}

export const HABIT_MODE = {
  TIME: 1,
  COUNT: 2,
  ML: 3,
}

export const HABIT_CATEGORY = {
  HEALTH: 1,
  FINANCE: 2,
  RELATIONSHIP: 3,
  BRAIN: 4,
  PRODUCTIVITY: 5,
}

export const MOOD_RATING = {
  VERY_BAD: 1,
  BAD: 2,
  NEUTRAL: 3,
  GOOD: 4,
  VERY_GOOD: 5,
}

export enum TODO_DROPDOWN_MODE {
  PRIORITY = 'PRIORITY',
  STATUS = 'STATUS',
}

export enum HABIT_DROPDOWN_MODE {
  FREQUENCY_TYPE = 'FREQUENCY_TYPE',
  // STATUS = 'STATUS',
  MODE = 'MODE',
  CATEGORY = 'CATEGORY',
  PRIORITY = 'PRIORITY'
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

export const JOURNAL_TYPE_TO_LABEL: { [type: number]: string } = {
  [JOURNAL_TYPE.IDEA]: 'Idea',
  [JOURNAL_TYPE.GRATITUDE]: 'Gratitude',
  [JOURNAL_TYPE.MIND_CLEAR]: 'Mind Clear',
  [JOURNAL_TYPE.DAY_PLANNING]: 'Day Planning',
  [JOURNAL_TYPE.DAY_WRAP]: 'Day Wrap',
  [JOURNAL_TYPE.EVENT]: 'Event',
  [JOURNAL_TYPE.FOOD_LOG]: 'FoodItem Log',
  [JOURNAL_TYPE.HIGHLIGHT_OF_THE_DAY]: 'Highlight of the Day',
}

export const HABIT_FREQUENCY_TYPE_TO_LABEL: { [type: number]: string } = {
  [HABIT_FREQUENCY_TYPE.DAILY]: 'Daily',
  [HABIT_FREQUENCY_TYPE.WEEKLY]: 'Weekly',
  [HABIT_FREQUENCY_TYPE.MONTHLY]: 'Monthly',
}

export const HABIT_STATUS_TO_LABEL: { [status: number]: string } = {
  [HABIT_STATUS.ACTIVE]: 'Active',
  [HABIT_STATUS.ARCHIVED]: 'Archived',
}

export const HABIT_MODE_TO_LABEL: { [mode: number]: string } = {
  [HABIT_MODE.TIME]: 'Time (Minutes)',
  [HABIT_MODE.COUNT]: 'Count',
  [HABIT_MODE.ML]: 'Volume (ml)',
}

export const HABIT_CATEGORY_TO_LABEL: { [category: number]: string } = {
  [HABIT_CATEGORY.HEALTH]: 'Health',
  [HABIT_CATEGORY.FINANCE]: 'Finance',
  [HABIT_CATEGORY.RELATIONSHIP]: 'Relationship',
  [HABIT_CATEGORY.BRAIN]: 'Brain',
  [HABIT_CATEGORY.PRODUCTIVITY]: 'Productivity',
}

export const MOOD_RATING_TO_LABEL: { [rating: number]: string } = {
  [MOOD_RATING.VERY_BAD]: 'Very Bad',
  [MOOD_RATING.BAD]: 'Bad',
  [MOOD_RATING.NEUTRAL]: 'Neutral',
  [MOOD_RATING.GOOD]: 'Good',
  [MOOD_RATING.VERY_GOOD]: 'Very Good',
}

export const DROPDOWN_MODE_VALUES = {
  [TODO_DROPDOWN_MODE.STATUS]: {
    defaultOption: {
      value: 0,
      label: "Select status"
    },
    optionList: getOptionsListFromValueLabelMap(TASK_STATUS_TO_LABEL),
  },
  [TODO_DROPDOWN_MODE.PRIORITY]: {
    defaultOption: {
      value: 0,
      label: "Select priority"
    },
    optionList: getOptionsListFromValueLabelMap(PRIORITY_TO_LABEL),
  },
  [JOURNAL_DROPDOWN_MODE.TYPE]: {
    defaultOption: {
      value: 0,
      label: "Select journal type"
    },
    optionList: getOptionsListFromValueLabelMap(JOURNAL_TYPE_TO_LABEL)
  },
};

export const HABIT_DROPDOWN_MODE_VALUES = {
  [HABIT_DROPDOWN_MODE.FREQUENCY_TYPE]: {
    defaultOption: {
      value: 0,
      label: "Select frequency type"
    },
    optionList: getOptionsListFromValueLabelMap(HABIT_FREQUENCY_TYPE_TO_LABEL)
  },
  // [HABIT_DROPDOWN_MODE.STATUS]: {
  //   defaultOption: {
  //     value: 0,
  //     label: "Select Status"
  //   },
  //   optionList: getOptionsListFromValueLabelMap(HABIT_STATUS_TO_LABEL)
  // },
  [HABIT_DROPDOWN_MODE.MODE]: {
    defaultOption: {
      value: 0,
      label: "Select mode"
    },
    optionList: getOptionsListFromValueLabelMap(HABIT_MODE_TO_LABEL)
  },
  [HABIT_DROPDOWN_MODE.CATEGORY]: {
    defaultOption: {
      value: 0,
      label: "Select category"
    },
    optionList: getOptionsListFromValueLabelMap(HABIT_CATEGORY_TO_LABEL)
  },
  [HABIT_DROPDOWN_MODE.PRIORITY]: {
    defaultOption: {
      value: 0,
      label: "Select priority"
    },
    optionList: getOptionsListFromValueLabelMap(PRIORITY_TO_LABEL)
  }
}

export enum MODAL_IDS  {
  LOG_MODAL = 'habit_log_modal',
  HABIT_FORM_MODAL = 'habit_form_modal',
  TODO_FORM_MODAL = 'todo_form_modal',
  FOOD_ITEM_FORM_MODAL = 'food_item_form_modal'
}
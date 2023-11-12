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

export const DROP_DOWN_MODE = {
  PRIORITY: 'PRIORITY',
  COMPLEXITY: 'COMPLEXITY',
  STATUS: 'STATUS'
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

export const COMPLEXITY_TO_LABEL : {[complexity: number]: string} = {
  [COMPLEXITY.LOW]: 'Low',
  [COMPLEXITY.MEDIUM]: 'Medium',
  [COMPLEXITY.HIGH]: 'High'
}
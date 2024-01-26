import { Task } from '@/types';
import React from 'react';
import SelectDropdown from '../common/SelectDropdown';
import { DROPDOWN_MODE_VALUES, TODO_DROWN_DONE_MODE } from '@/utils/constants';

type SingleTaskComponentProps = {
  task: Task;
  handleSelectValueChange: (status: number, taskId: number, mode: TODO_DROWN_DONE_MODE) => Promise<any>;
  handleDeleteClick: (taskId: number) => Promise<any>;
}

const SingleTaskComponent: React.FC<SingleTaskComponentProps> = ({ task, handleDeleteClick, handleSelectValueChange }) => {
  const { status, priority, complexity } = task;
  const INITIAL_VALUE_MAP: { [key in TODO_DROWN_DONE_MODE]: number } = {
    STATUS: status,
    PRIORITY: priority,
    COMPLEXITY: complexity,
  }

  return (
    <>
      <div className='flex flex-row justify-between w-full px-4 py-2'>
        <h3 className='text-xl'>{task.title} {task.desc.length > 0 ? `~  ${task.desc}` : ""}</h3>
        <div>
          {Object.values(TODO_DROWN_DONE_MODE).map((mode) =>
            <SelectDropdown
              key={mode}
              handleValueChange={async (status: number) =>
                await handleSelectValueChange(status, task.ID, mode)
              }
              initialValue={INITIAL_VALUE_MAP[mode]}
              {...DROPDOWN_MODE_VALUES[mode]}
            />
          )}
          <button className='px-4' onClick={() => handleDeleteClick(task.ID)}>Delete</button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default SingleTaskComponent;
import { Task } from '@/types';
import React from 'react';
import SelectDropdown from '../common/SelectDropdown';
import { DROPDOWN_MODE_VALUES, TODO_DROPDOWN_MODE } from '@/utils/constants';

type SingleTaskComponentProps = {
  task: Task;
  handleSelectValueChange: (status: number, taskId: number, mode: TODO_DROPDOWN_MODE) => Promise<{ err?: Error }>;
  handleDeleteClick: (taskId: number) => Promise<void>;
}

const SingleTaskComponent: React.FC<SingleTaskComponentProps> = ({ task, handleDeleteClick, handleSelectValueChange }) => {
  const { status, priority, complexity } = task;
  const INITIAL_VALUE_MAP: { [key in TODO_DROPDOWN_MODE]: number } = {
    STATUS: status,
    PRIORITY: priority,
    COMPLEXITY: complexity,
  }

  return (
    <>
      <div className='flex flex-row justify-between w-full px-4 py-2'>
        <span>
          <span className='text-xl'>{task.title}</span>
          <span className='text-l text-slate-400 pl-2'>{task.desc.length > 0 ? ` ${task.desc}` : ""}</span>
        </span>
        <div>
          {Object.values(TODO_DROPDOWN_MODE).map((mode) =>
            <span key={mode} className='px-2'>
              <SelectDropdown
                handleValueChange={async (status: number) =>
                  await handleSelectValueChange(status, task.ID, mode)
                }
                initialValue={INITIAL_VALUE_MAP[mode]}
                {...DROPDOWN_MODE_VALUES[mode]}
              />
            </span>
          )}
          <button className='px-4' onClick={() => handleDeleteClick(task.ID)}>Delete</button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default SingleTaskComponent;
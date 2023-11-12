import { Task } from '@/types';
import React from 'react';
import SelectStatusDropdown from '../common/SelectStatusDropdown';
import { DROP_DOWN_MODE } from '@/utils/constants';

type SingleTaskComponentProps = {
  task: Task;
  handleStatusChange: (status: number, taskId: number, mode: keyof typeof DROP_DOWN_MODE) => Promise<any>;
  handleDeleteClick: (taskId: number) => Promise<any>;
}

const SingleTaskComponent: React.FC<SingleTaskComponentProps> = ({ task, handleDeleteClick, handleStatusChange }) => {
  return (
    <>
      <div className='flex flex-row justify-between w-full px-4 py-2'>
        <h3 className='text-xl'>{task.title} {task.desc.length > 0 ? `~  ${task.desc}` : ""}</h3>
        <div>
          {Object.keys(DROP_DOWN_MODE).map((mode) =>
            <SelectStatusDropdown key={mode} handleStatusChange={async (status: number, mode: keyof typeof DROP_DOWN_MODE) => {
              return await handleStatusChange(status, task.ID, mode);
            }} dropdownViewMode="edit" value={task[mode.toLocaleLowerCase()]} dropdownMode={mode as keyof typeof DROP_DOWN_MODE} />
          )}
          <button className='px-4' onClick={() => handleDeleteClick(task.ID)}>Delete</button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default SingleTaskComponent;
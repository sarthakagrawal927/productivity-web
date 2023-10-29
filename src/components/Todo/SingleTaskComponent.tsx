import { Task } from '@/types';
import React from 'react';
import SelectStatusDropdown from '../common/SelectStatusDropdown';

type SingleTaskComponentProps = {
  task: Task;
  handleStatusChange: (status: number, taskId: number) => Promise<any>;
  handleDeleteClick: (taskId: number) => Promise<any>;
}

const SingleTaskComponent: React.FC<SingleTaskComponentProps> = ({ task, handleDeleteClick, handleStatusChange }) => {
  return (
    <>
      <div className='flex flex-row justify-between w-full px-4 py-2'>
        <h3 className='text-xl'>{task.title} {task.desc.length > 0 ? `~  ${task.desc}` : ""}</h3>
        <div>
          <SelectStatusDropdown handleStatusChange={async (status: number) => {
            return await handleStatusChange(status, task.ID);
          }} mode="edit" value={task.status} />
          <button className='px-4' onClick={() => handleDeleteClick(task.ID)}>Delete</button>
        </div>
      </div>
      <hr />
    </>
  );
};

export default SingleTaskComponent;
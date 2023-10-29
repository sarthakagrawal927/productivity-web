import { Task } from '@/types';
import React from 'react';
import SelectStatusDropdown from '../common/SelectStatusDropdown';
import { HTTP_METHOD, callApi } from '@/utils/api';

const SingleTaskComponent: React.FC<{ task: Task }> = ({ task }) => {

  const handleStatusChange = (status: number) => {
    callApi(`/api/task`, { status, id: task.ID }, HTTP_METHOD.PATCH);
  }

  return (
    <>
      <div className='flex flex-row justify-between w-full px-4 py-2'>
        <h3 className='text-xl'>{task.title} {task.desc.length > 0 ? `~${task.desc}` : ""}</h3>
        <SelectStatusDropdown handleStatusChange={handleStatusChange} mode="view" value={task.status} />
        <p>Delete</p>
      </div>
    </>
  );
};

export default SingleTaskComponent;
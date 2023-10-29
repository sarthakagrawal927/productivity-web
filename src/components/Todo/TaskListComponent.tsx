import { Task } from '@/types';
import React from 'react';
import SelectStatusDropdown from '../common/SelectStatusDropdown';
import SingleTaskComponent from './SingleTaskComponent';

const TaskListComponent: React.FC<{ taskList: Task[] }> = ({ taskList }) => {
  const [filteredTaskList, setFilteredTaskList] = React.useState<Task[]>(taskList);

  const handleStatusValueChange = (status: number) => {
    if (status === 0) {
      setFilteredTaskList(taskList);
    } else {
      setFilteredTaskList(taskList.filter((task) => task.status === status));
    }
  }

  return (
    <>
      <h1 className='text-3xl'>All Tasks</h1>
      <SelectStatusDropdown handleStatusChange={handleStatusValueChange} mode="view" />

      {filteredTaskList.map((task, idx) => (
        <SingleTaskComponent task={task} key={`${task.ID}_${task.title}_${idx}`} />
      ))}

    </>
  );
};

export default TaskListComponent;
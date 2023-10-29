import { Task } from '@/types';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import SelectStatusDropdown from '../common/SelectStatusDropdown';
import SingleTaskComponent from './SingleTaskComponent';
import { HTTP_METHOD, callApi } from '@/utils/api';

type TaskListComponentProps = {
  taskList: Task[];
  setTaskList: Dispatch<SetStateAction<Task[]>>;
}

const TaskListComponent: React.FC<TaskListComponentProps> = ({ taskList, setTaskList }) => {
  const [filteredTaskList, setFilteredTaskList] = React.useState<Task[]>(taskList);
  const filterStatusRef = React.useRef<number>(0);

  useEffect(() => {
    setFilteredValueList()
  }, [taskList]);

  const handleStatusValueChange = async (status: number) => {
    filterStatusRef.current = status;
    setFilteredValueList();
    return { err: null, data: null }
  }

  const setFilteredValueList = () => {
    if (filterStatusRef.current === 0) {
      setFilteredTaskList(taskList);
    } else {
      setFilteredTaskList(taskList.filter((task) => task.status === filterStatusRef.current));
    }
  }

  const handleStatusChange = async (status: number, taskId: number) => {
    const { err } = await callApi(`/api/todo`, { status, id: taskId }, HTTP_METHOD.PATCH);
    if (!err) {
      setTaskList(taskList => taskList.map((task) => {
        if (task.ID === taskId) {
          return { ...task, status };
        }
        return task;
      }));
    }
    return { err };
  }

  const handleDeleteClick = async (taskId: number) => {
    const { err } = await callApi(`/api/todo`, { id: taskId }, HTTP_METHOD.DELETE);
    if (!err) {
      setTaskList(taskList => taskList.filter((task) => task.ID !== taskId));
    }
  }

  return (
    <>
      <h1 className='text-3xl'>All Tasks</h1>
      <SelectStatusDropdown handleStatusChange={handleStatusValueChange} mode="view" />

      {filteredTaskList.map((task, idx) => (
        <SingleTaskComponent
          task={task}
          key={`${task.ID}_${task.title}_${idx}`}
          handleStatusChange={handleStatusChange}
          handleDeleteClick={handleDeleteClick} />
      ))}

    </>
  );
};

export default TaskListComponent;
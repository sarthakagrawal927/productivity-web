import { Task } from '@/types';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import SelectStatusDropdown from '../common/SelectStatusDropdown';
import SingleTaskComponent from './SingleTaskComponent';
import { HTTP_METHOD, callApi } from '@/utils/api';
import { DROP_DOWN_MODE } from '@/utils/constants';

type TaskListComponentProps = {
  taskList: Task[];
  setTaskList: Dispatch<SetStateAction<Task[]>>;
}

const TaskListComponent: React.FC<TaskListComponentProps> = ({ taskList, setTaskList }) => {
  const [filteredTaskList, setFilteredTaskList] = React.useState<Task[]>(taskList);
  const filterStatusRef = React.useRef<{ [mode: string]: number }>({
    'STATUS': 0,
    "COMPLEXITY": 0,
    "PRIORITY": 0,
  });

  useEffect(() => {
    setFilteredValueList()
  }, [taskList]);

  const handleStatusValueChange = async (value: number, mode: keyof typeof DROP_DOWN_MODE) => {
    filterStatusRef.current[mode] = value;
    setFilteredValueList();
    return { err: null, data: null }
  }

  const setFilteredValueList = () => {
    setFilteredTaskList(taskList.filter((task) =>
      (filterStatusRef.current.STATUS === 0 || filterStatusRef.current.STATUS === task.status) &&
      (filterStatusRef.current.COMPLEXITY === 0 || filterStatusRef.current.COMPLEXITY === task.complexity) &&
      (filterStatusRef.current.PRIORITY === 0 || filterStatusRef.current.PRIORITY === task.priority)
    ));
  }

  const handleStatusChange = async (value: number, taskId: number, mode: keyof typeof DROP_DOWN_MODE) => {
    const { err } = await callApi(`/api/todo`, { [mode.toLocaleLowerCase()]: value, id: taskId }, HTTP_METHOD.PATCH);
    if (!err) {
      setTaskList(taskList => taskList.map((task) => {
        if (task.ID === taskId) {
          return { ...task, [mode.toLocaleLowerCase()]: value };
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
      <div className='flex'>
        {Object.keys(DROP_DOWN_MODE).map((mode) =>
          <SelectStatusDropdown
            key={mode}
            handleStatusChange={handleStatusValueChange}
            dropdownViewMode="view"
            dropdownMode={mode as keyof typeof DROP_DOWN_MODE}
          />
        )}
      </div>
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
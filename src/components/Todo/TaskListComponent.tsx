import { Task } from '@/types';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import SelectDropdown from '../common/SelectDropdown';
import SingleTaskComponent from './SingleTaskComponent';
import { HTTP_METHOD, callApi } from '@/utils/api';
import { DROPDOWN_MODE_VALUES, DROP_DOWN_MODE } from '@/utils/constants';

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

  const handleFilterSelectChange = (value: number, mode: DROP_DOWN_MODE) => {
    filterStatusRef.current[mode] = value;
    setFilteredValueList();
  }

  const setFilteredValueList = () => {
    setFilteredTaskList(taskList.filter((task) =>
      (filterStatusRef.current.STATUS === 0 || filterStatusRef.current.STATUS === task.status) &&
      (filterStatusRef.current.COMPLEXITY === 0 || filterStatusRef.current.COMPLEXITY === task.complexity) &&
      (filterStatusRef.current.PRIORITY === 0 || filterStatusRef.current.PRIORITY === task.priority)
    ));
  }

  const handleSelectValueChange = async (value: number, taskId: number, mode: DROP_DOWN_MODE) => {
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
        {Object.values(DROP_DOWN_MODE).map((mode) =>
          <SelectDropdown
            key={mode}
            clearable
            handleValueChange={(status: number) => handleFilterSelectChange(status, mode)}
            enableDefault
            {...DROPDOWN_MODE_VALUES[mode]}
          />
        )}
      </div>
      {filteredTaskList.map((task, idx) => (
        <SingleTaskComponent
          task={task}
          key={`${task.ID}_${task.title}_${idx}`}
          handleSelectValueChange={handleSelectValueChange}
          handleDeleteClick={handleDeleteClick} />
      ))}
    </>
  );
};

export default TaskListComponent;
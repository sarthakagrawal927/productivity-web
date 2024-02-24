import { Task } from '@/types';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import SelectDropdown from '../common/SelectDropdown';
import SingleTaskComponent from './SingleTaskComponent';
import { HTTP_METHOD, callApi } from '@/utils/api';
import { DROPDOWN_MODE_VALUES, MODAL_IDS, TODO_DROPDOWN_MODE } from '@/utils/constants';
import { LargeHeading } from '../common/Typography';
import { openHtmlDialog } from '@/utils/helpers';
import TodoForm from './TodoForm';

type TaskListComponentProps = {
  tasks: Task[];
}

const TaskListComponent: React.FC<TaskListComponentProps> = ({ tasks }) => {
  const [taskList, setTaskList] = React.useState<Task[]>(tasks);
  const [filteredTaskList, setFilteredTaskList] = React.useState<Task[]>(taskList);
  const filterStatusRef = React.useRef<{ [mode: string]: number }>({
    'STATUS': 0,
    "PRIORITY": 0,
  });

  useEffect(() => {
    setFilteredValueList()
  }, [taskList]);

  const handleFilterSelectChange = (value: number, mode: TODO_DROPDOWN_MODE) => {
    filterStatusRef.current[mode] = value;
    setFilteredValueList();
  }

  const setFilteredValueList = () => {
    setFilteredTaskList(taskList.filter((task) =>
      (filterStatusRef.current.STATUS === 0 || filterStatusRef.current.STATUS === task.status) &&
      (filterStatusRef.current.PRIORITY === 0 || filterStatusRef.current.PRIORITY === task.priority)
    ));
  }

  const handleSelectValueChange = async (value: number, taskId: number, mode: TODO_DROPDOWN_MODE) => {
    const { err } = await callApi(`/api/todo`, { [mode.toLocaleLowerCase()]: value, id: taskId }, HTTP_METHOD.PATCH);
    if (!err) {
      setTaskList(taskList => taskList.map((task) => {
        if (task.ID === taskId) {
          return { ...task, [mode.toLocaleLowerCase()]: value };
        }
        return task;
      }));
    }
    return { err: err ? new Error(err?.statusText) : undefined }
  }

  const handleDeleteClick = async (taskId: number) => {
    const { err } = await callApi(`/api/todo`, { id: taskId }, HTTP_METHOD.DELETE);
    if (!err) {
      setTaskList(taskList => taskList.filter((task) => task.ID !== taskId));
    }
  }

  const addNewTask = (task: Task) => {
    setTaskList([...taskList, task]);
  }

  return (
    <>
      <TodoForm addNewTask={addNewTask} />
      <div className='flex flex-row justify-between'>
        <LargeHeading>Tasks</LargeHeading>
        <button className="btn btn-circle text-xl font-bold" onClick={() => openHtmlDialog(MODAL_IDS.TODO_FORM_MODAL)}>+</button>
      </div>
      <div className='flex pb-6'>
        {Object.values(TODO_DROPDOWN_MODE).map((mode) =>
          <div key={mode} className='px-3'>
            <SelectDropdown
              key={mode}
              handleValueChange={(status) => handleFilterSelectChange(status as number, mode)}
              enableDefault
              {...DROPDOWN_MODE_VALUES[mode]}
            />
          </div>
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
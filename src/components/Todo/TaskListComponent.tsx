import { Task } from '@/types';
import React, { useEffect } from 'react';
import SelectDropdown from '../common/SelectDropdown';
import { HTTP_METHOD, callApi } from '@/utils/api';
import { DROPDOWN_MODE_VALUES, MODAL_IDS, TODO_DROPDOWN_MODE } from '@/utils/constants';
import { LargeHeading } from '../common/Typography';
import { formatDateString, openHtmlDialog } from '@/utils/helpers';
import TodoForm from './TodoForm';
import CustomTable, { CELL_TYPE } from '../common/CustomTable';

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
          <div key={mode} className='pr-3'>
            <SelectDropdown
              key={mode}
              handleValueChange={(status) => handleFilterSelectChange(status as number, mode)}
              enableDefault
              {...DROPDOWN_MODE_VALUES[mode]}
            />
          </div>
        )}
      </div >

      <CustomTable
        rows={filteredTaskList.map((task, idx) => ({
          id: task.ID.toString(),
          cells: [
            { kind: CELL_TYPE.TEXT, widthPercent: 2, text: (idx + 1).toString(), additionalProps: {} },
            {
              kind: CELL_TYPE.TEXT_WITH_SUBTEXT, widthPercent: 66, text: task.title, additionalProps: {
                subText: task.desc
              }
            },
            { kind: CELL_TYPE.TEXT, widthPercent: 8, text: `Spend ${task.time_to_spend} mins`, additionalProps: {} },

            { kind: CELL_TYPE.TEXT, widthPercent: 8, text: task.deadline ? `Due ${formatDateString(task.deadline)}` : "No due date", additionalProps: {} },
            {
              kind: CELL_TYPE.CUSTOM, widthPercent: 14, text: '', additionalProps: {
                element: <div className='flex flex-row'>
                  {Object.values(TODO_DROPDOWN_MODE).map((mode) =>
                    <span key={mode} className='px-2'>
                      <SelectDropdown
                        handleValueChange={async (status) =>
                          await handleSelectValueChange(status as number, task.ID, mode)
                        }
                        initialValue={{ STATUS: task.status, PRIORITY: task.priority }[mode]}
                        {...DROPDOWN_MODE_VALUES[mode]}
                      />
                    </span>
                  )}
                </div>
              },
            },
            {
              kind: CELL_TYPE.BUTTON, widthPercent: 2, text: 'X', additionalProps: {
                onClick: async () => handleDeleteClick(task.ID)
              }
            },
          ],
        }))}
      />
    </>
  );
};

export default TaskListComponent;
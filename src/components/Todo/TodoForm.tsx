import { NumORStr, Task } from "@/types";
import { callApi } from "@/utils/api";
import { DROPDOWN_MODE_VALUES, TODO_DROPDOWN_MODE } from "@/utils/constants";
import React, { useState } from "react";
import SelectDropdown from "../common/SelectDropdown";
import TitleDescriptionInput, { SetEntityDispatch } from "../common/TitleDescriptionInput";

type TaskInput = {
  title: string,
  desc: string,
  status?: number,
  complexity?: number,
  priority?: number,
}

const defaultTaskInput = {
  title: "",
  desc: "",
}

const TodoForm: React.FC<TodoFormProps> = ({ addNewTask }) => {
  const [task, setTask] = useState<TaskInput>(defaultTaskInput);

  const handleTaskFieldChange = (key: string, newValue: NumORStr) => {
    setTask({ ...task, [key]: newValue });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callApi("/api/todo", task).then(({ data }) => {
      addNewTask(data.data);
    })
    setTask({ ...task, ...defaultTaskInput });
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Add a To-Do</h2>
      <form onSubmit={handleSubmit}>
        <TitleDescriptionInput
          title={task.title}
          desc={task.desc}
          setEntity={setTask as SetEntityDispatch}
        />
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium">
            Status
          </label>
          {Object.values(TODO_DROPDOWN_MODE).map((mode) =>
            <SelectDropdown
              key={mode}
              containerClassName="w-full"
              handleValueChange={(newVal: number) => handleTaskFieldChange(mode.toLocaleLowerCase(), newVal)}
              {...DROPDOWN_MODE_VALUES[mode]}
            />
          )}
        </div>
        <button
          type="submit"
          className="btn btn-primary"
        >
          Add To-Do
        </button>
      </form>
    </div>
  );
};

type TodoFormProps = {
  addNewTask: (task: Task) => void,
};

export default TodoForm;

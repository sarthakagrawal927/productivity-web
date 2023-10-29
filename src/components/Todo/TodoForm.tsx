import { Task } from "@/types";
import { callApi } from "@/utils/api";
import { TASK_STATUS, TASK_STATUS_TO_LABEL } from "@/utils/constants";
import React, { useState } from "react";
import SelectStatusDropdown from "../common/SelectStatusDropdown";

type TaskInput = {
  title: string,
  desc: string,
  status: number | undefined,
}

const defaultTaskInput = {
  title: "",
  desc: "",
  status: undefined,
}

const TodoForm: React.FC<TodoFormProps> = ({ addNewTask }) => {
  const [task, setTask] = useState<TaskInput>(defaultTaskInput);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, title: e.target.value });
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTask({ ...task, desc: e.target.value });
  }

  const handleStatusChange = (newStatus: number) => {
    setTask({ ...task, status: newStatus });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    callApi("/api/todo", task).then((res) => {
      console.log(res.data)
      addNewTask(res.data);
    })
    setTask(defaultTaskInput);
  }

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Add a To-Do</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium">
            Title
          </label>
          <input
            type="text"
            id="task"
            className="w-full p-2 bg-gray-800 text-white border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={task.title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            className="w-full p-2 bg-gray-800 text-white border rounded focus:outline-none focus:ring focus:border-blue-300"
            value={task.desc}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="status" className="block text-sm font-medium">
            Status
          </label>
          <SelectStatusDropdown handleStatusChange={handleStatusChange} />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
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

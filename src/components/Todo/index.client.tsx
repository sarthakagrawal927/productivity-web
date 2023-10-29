"use client"
import { Task } from '@/types';
import React from 'react'
import CreateNew from "./TodoForm";
import TaskList from './TaskListComponent';
import TaskListComponent from './TaskListComponent';

const TodoListClient = ({ tasks }: { tasks: Task[] }) => {
  const [taskList, setTaskList] = React.useState<Task[]>(tasks);

  const addNewTask = (task: Task) => {
    setTaskList([...taskList, task]);
  }

  return (
    <>
      <CreateNew addNewTask={addNewTask} />
      <TaskListComponent taskList={taskList} />
    </>
  );
};

export default TodoListClient;
"use client"
import { Task } from '@/types';
import React from 'react'
import TaskListComponent from './TaskListComponent';

const TodoListClient = ({ tasks }: { tasks: Task[] }) => {
  return (
    <TaskListComponent tasks={tasks} />
  );
};

export default TodoListClient;
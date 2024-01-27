import TodoListClient from '@/components/Todo/index';
import { Task } from '@/types';
import { baseServerSideFetch } from "@/utils/api";

export default async function Todo() {
  const tasks: Task[] = await baseServerSideFetch('/api/todo')
  return (
    <TodoListClient tasks={tasks} />
  )
}

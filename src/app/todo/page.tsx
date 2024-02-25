import TodoListClient from '@/components/Todo/index';
import ErrorComponent from '@/components/common/ErrorComponent';
import { Task } from '@/types';
import { baseServerSideFetch } from "@/utils/api";

export default async function Todo() {
  const { data: tasks, err } = await baseServerSideFetch<Task[]>('/api/todo')
  if (err || !tasks) return <ErrorComponent message={err.message} />;
  return (
    <TodoListClient tasks={tasks} />
  )
}

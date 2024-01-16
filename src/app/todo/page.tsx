import TodoListClient from '@/components/Todo/index';
import { Task } from '@/types';
import { HTTP_METHOD, callApi } from "@/utils/api";

async function getTodo() {
  const { data, err } = await callApi('/api/todo', {}, HTTP_METHOD.GET)
  if (err) throw new Error(err.statusText);
  return data.data;
}

export default async function Home() {
  const tasks: Task[] = await getTodo()
  return (
    <main className="flex min-h-screen flex-col items-center py-24">
      <TodoListClient tasks={tasks} />
    </main>
  )
}

import { Task } from "@/types";
import TodoListClient from "./index.client";

async function getTodo() {
  const res = await fetch("http://localhost:1323/api/todo", { cache: "no-store" })
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  return res.json()
}

export default async function TodoList() {
  const tasks: Task[] = await getTodo();
  return <TodoListClient tasks={tasks} />
}
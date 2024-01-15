import TodoList from '@/components/Todo/index.server'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24">
      <TodoList />
    </main>
  )
}

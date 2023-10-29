import TodoList from '@/components/Todo/index.server'
import TestComponent from '@/components/test'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center py-24">
      <TestComponent />
      <TodoList />
    </main>
  )
}

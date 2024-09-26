import TodoListClient from '@/components/Todo/index';
import FetchDataSSR from '@/components/common/FetchDataSSR';
import { Task } from '@/types';

export default function Todo() {
  return (
    <FetchDataSSR<[Task[]]>
      fetchUrls={['/api/todo']}
      onSuccess={([tasks]) => {
        return <TodoListClient tasks={tasks} />
      }
      }
    />
  );
}
import { Suspense } from 'react';
import TaskList from '../../components/TaskList';
import TaskFilters from '../../components/TaskFilters';
import NewTaskButton from '../../components/NewTaskButton';
import { Skeleton } from '../../components/ui/skeleton';

/**
 * 任務頁面 - 顯示所有任務並提供過濾和創建新任務的功能
 * 
 * @returns {JSX.Element} 任務頁面組件
 */
export default function TasksPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">我的任務</h1>
        <NewTaskButton />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6">
        <aside className="space-y-6">
          <TaskFilters />
        </aside>
        
        <main>
          <Suspense fallback={<TaskListSkeleton />}>
            <TaskList />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

/**
 * 任務列表骨架屏 - 在任務列表加載時顯示
 * 
 * @returns {JSX.Element} 骨架屏組件
 */
function TaskListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-3">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex justify-between">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      ))}
    </div>
  );
}

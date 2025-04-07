import { Suspense } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import KanbanBoard from '@/components/KanbanBoard';
import NewTaskButton from '@/components/NewTaskButton';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Kanban 看板頁面 - 以看板形式顯示任務
 * 
 * @returns {JSX.Element} Kanban 看板頁面組件
 */
export default function KanbanPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold">看板視圖</h1>
          <Button variant="outline" size="sm" asChild>
            <Link href="/tasks">列表視圖</Link>
          </Button>
        </div>
        <NewTaskButton />
      </div>
      
      <Suspense fallback={<KanbanSkeleton />}>
        <KanbanBoard />
      </Suspense>
    </div>
  );
}

/**
 * Kanban 看板骨架屏 - 在看板加載時顯示
 * 
 * @returns {JSX.Element} 骨架屏組件
 */
function KanbanSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-3">
          <Skeleton className="h-6 w-24 mb-4" />
          
          {Array.from({ length: 3 }).map((_, j) => (
            <div key={j} className="border rounded-lg p-3 space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-1/2" />
              <div className="flex justify-between">
                <Skeleton className="h-3 w-16" />
                <Skeleton className="h-3 w-16" />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

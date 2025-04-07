import { Skeleton } from './ui/skeleton';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';

/**
 * 任務詳細骨架屏組件 - 在任務詳細信息加載時顯示
 * 
 * @returns {JSX.Element} 任務詳細骨架屏組件
 */
export default function TaskDetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-9 w-40" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-3/4 mb-2" />
          <div className="flex gap-2">
            <Skeleton className="h-5 w-20" />
            <Skeleton className="h-5 w-20" />
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-24 w-full" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-40" />
            </div>
            
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>
        </CardContent>
        
        <CardFooter>
          <Skeleton className="h-4 w-32" />
        </CardFooter>
      </Card>
    </div>
  );
}

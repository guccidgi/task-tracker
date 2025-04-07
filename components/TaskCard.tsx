'use client';

import { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { Task, TaskPriority } from '../types/supabase';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { CalendarIcon, EditIcon, TrashIcon } from 'lucide-react';

// 優先級對應的樣式和標籤
const priorityConfig: Record<TaskPriority, { label: string; variant: 'default' | 'secondary' | 'destructive' | 'outline' }> = {
  low: { label: '低', variant: 'outline' },
  medium: { label: '中', variant: 'secondary' },
  high: { label: '高', variant: 'default' },
  urgent: { label: '緊急', variant: 'destructive' }
};

/**
 * 任務卡片組件 - 顯示單個任務的卡片視圖
 * 
 * @param {Object} props - 組件屬性
 * @param {Task} props.task - 任務對象
 * @returns {JSX.Element} 任務卡片組件
 */
export default function TaskCard({ task }: { task: Task }) {
  const [isCompleted, setIsCompleted] = useState(task.status === 'done');
  
  // 格式化日期
  const formattedDueDate = task.due_date 
    ? format(new Date(task.due_date), 'PPP', { locale: zhTW })
    : null;
  
  // 優先級配置
  const priority = priorityConfig[task.priority];
  
  return (
    <Card className="shadow-sm hover:shadow transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-2">
            <Checkbox 
              checked={isCompleted}
              onCheckedChange={(checked) => setIsCompleted(!!checked)}
              className="mt-1"
            />
            <div>
              <Link href={`/tasks/${task.id}`} className="font-medium hover:underline">
                <h3 className={isCompleted ? 'line-through text-muted-foreground' : ''}>
                  {task.title}
                </h3>
              </Link>
              {task.description && (
                <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                  {task.description}
                </p>
              )}
            </div>
          </div>
          <Badge variant={priority.variant}>{priority.label}</Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pb-2">
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {task.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-0">
        {formattedDueDate && (
          <div className="flex items-center text-xs text-muted-foreground">
            <CalendarIcon className="mr-1 h-3 w-3" />
            {formattedDueDate}
          </div>
        )}
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href={`/tasks/${task.id}/edit`}>
              <EditIcon className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="ghost" size="icon">
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { zhTW } from 'date-fns/locale';
import { supabase } from '../lib/supabase';
import { Task } from '../types/supabase';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import TaskDetailSkeleton from './TaskDetailSkeleton';
import { Skeleton } from '../components/ui/skeleton';
import { ArrowLeftIcon, CalendarIcon, EditIcon, TrashIcon } from 'lucide-react';

// u512au5148u7d1au6a19u7c64u914du7f6e
const priorityLabels = {
  low: { label: 'u4f4e', variant: 'outline' as const },
  medium: { label: 'u4e2d', variant: 'secondary' as const },
  high: { label: 'u9ad8', variant: 'default' as const },
  urgent: { label: 'u7dcau6025', variant: 'destructive' as const },
};

// u72c0u614bu6a19u7c64u914du7f6e
const statusLabels = {
  todo: { label: 'u5f85u8655u7406', variant: 'outline' as const },
  in_progress: { label: 'u9032u884cu4e2d', variant: 'secondary' as const },
  review: { label: 'u5be9u6838u4e2d', variant: 'default' as const },
  done: { label: 'u5df2u5b8cu6210', variant: 'default' as const },
};

/**
 * u4efbu52d9u8a73u7d30u8996u5716u7d44u4ef6 - u986fu793au4efbu52d9u7684u8a73u7d30u4fe1u606f
 * 
 * @param {Object} props - u7d44u4ef6u5c6cu6027
 * @param {string} props.taskId - u4efbu52d9 ID
 * @returns {JSX.Element} u4efbu52d9u8a73u7d30u8996u5716u7d44u4ef6
 */
export default function TaskDetailView({ taskId }: { taskId: string }) {
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchTask() {
      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .eq('id', taskId)
          .single();
        
        if (error) throw error;
        setTask(data);
      } catch (err: any) {
        console.error('Error fetching task:', err);
        setError(err.message || 'u8f09u5165u4efbu52d9u6642u767cu751fu932fu8aa4');
      } finally {
        setLoading(false);
      }
    }
    
    fetchTask();
  }, [taskId]);
  
  if (loading) return <TaskDetailSkeleton />;
  
  if (error) {
    return (
      <div className="text-center p-8">
        <p className="text-red-500 mb-4">{error}</p>
        <Button asChild>
          <Link href="/tasks">u8fd4u56deu4efbu52d9u5217u8868</Link>
        </Button>
      </div>
    );
  }
  
  if (!task) {
    return (
      <div className="text-center p-8">
        <p className="mb-4">u627eu4e0du5230u4efbu52d9</p>
        <Button asChild>
          <Link href="/tasks">u8fd4u56deu4efbu52d9u5217u8868</Link>
        </Button>
      </div>
    );
  }
  
  // u683cu5f0fu5316u65e5u671f
  const formattedDueDate = task.due_date 
    ? format(new Date(task.due_date), 'PPP', { locale: zhTW })
    : 'u7121u622au6b62u65e5u671f';
  
  const formattedCreatedDate = format(new Date(task.created_at), 'PPP', { locale: zhTW });
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Button variant="outline" size="sm" asChild>
          <Link href="/tasks">
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            u8fd4u56deu4efbu52d9u5217u8868
          </Link>
        </Button>
        
        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={`/tasks/${task.id}/edit`}>
              <EditIcon className="mr-2 h-4 w-4" />
              u7de8u8f2f
            </Link>
          </Button>
          <Button variant="outline" size="sm">
            <TrashIcon className="mr-2 h-4 w-4" />
            u522au9664
          </Button>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{task.title}</CardTitle>
              <div className="flex gap-2 mt-2">
                <Badge variant={statusLabels[task.status].variant}>
                  {statusLabels[task.status].label}
                </Badge>
                <Badge variant={priorityLabels[task.priority].variant}>
                  {priorityLabels[task.priority].label}u512au5148u7d1a
                </Badge>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {task.description && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">u63cfu8ff0</h3>
              <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                {task.description}
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">u622au6b62u65e5u671f</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formattedDueDate}
              </div>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-sm font-medium">u5275u5efau65e5u671f</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formattedCreatedDate}
              </div>
            </div>
          </div>
          
          {task.tags && task.tags.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">u6a19u7c64</h3>
              <div className="flex flex-wrap gap-2">
                {task.tags.map(tag => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
        
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            u4efbu52d9 ID: {task.id}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

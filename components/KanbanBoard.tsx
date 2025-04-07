'use client';

import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { supabase } from '../lib/supabase';
import { Task, TaskStatus } from '@/types/supabase';
import TaskCard from '@/components/TaskCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// 看板列定義
const columns: { id: TaskStatus; title: string }[] = [
  { id: 'todo', title: '待處理' },
  { id: 'in_progress', title: '進行中' },
  { id: 'review', title: '審核中' },
  { id: 'done', title: '已完成' },
];

/**
 * Kanban 看板組件 - 提供拖放式任務管理界面
 * 
 * @returns {JSX.Element} Kanban 看板組件
 */
export default function KanbanBoard() {
  const [tasks, setTasks] = useState<Record<TaskStatus, Task[]>>({
    todo: [],
    in_progress: [],
    review: [],
    done: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // 獲取任務數據
  useEffect(() => {
    async function fetchTasks() {
      try {
        const { data, error } = await supabase
          .from('tasks')
          .select('*')
          .order('position', { ascending: true });
        
        if (error) throw error;
        
        // 按狀態分組任務
        const groupedTasks: Record<TaskStatus, Task[]> = {
          todo: [],
          in_progress: [],
          review: [],
          done: [],
        };
        
        data.forEach((task: Task) => {
          groupedTasks[task.status].push(task);
        });
        
        setTasks(groupedTasks);
      } catch (err: any) {
        console.error('Error fetching tasks:', err);
        setError(err.message || '載入任務時發生錯誤');
      } finally {
        setLoading(false);
      }
    }
    
    fetchTasks();
  }, []);
  
  // 處理拖放結束事件
  const handleDragEnd = async (result: any) => {
    const { source, destination } = result;
    
    // 如果沒有目的地或目的地與源相同，則不做任何操作
    if (!destination || 
        (source.droppableId === destination.droppableId && 
         source.index === destination.index)) {
      return;
    }
    
    // 獲取拖動的任務
    const sourceStatus = source.droppableId as TaskStatus;
    const destStatus = destination.droppableId as TaskStatus;
    
    // 創建任務列表的副本
    const newTasks = { ...tasks };
    
    // 從源列表中移除任務
    const [movedTask] = newTasks[sourceStatus].splice(source.index, 1);
    
    // 更新任務狀態
    movedTask.status = destStatus;
    
    // 將任務添加到目標列表
    newTasks[destStatus].splice(destination.index, 0, movedTask);
    
    // 更新狀態
    setTasks(newTasks);
    
    // 更新數據庫
    try {
      // 更新任務狀態
      await supabase
        .from('tasks')
        .update({ 
          status: destStatus,
          position: destination.index,
        })
        .eq('id', movedTask.id);
      
      // 更新目標列中其他任務的位置
      const tasksToUpdate = newTasks[destStatus].map((task, index) => ({
        id: task.id,
        position: index,
      }));
      
      // 批量更新位置
      for (const task of tasksToUpdate) {
        if (task.id !== movedTask.id) {
          await supabase
            .from('tasks')
            .update({ position: task.position })
            .eq('id', task.id);
        }
      }
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };
  
  if (loading) {
    return <div className="text-center p-8">載入中...</div>;
  }
  
  if (error) {
    return <div className="text-red-500 text-center p-8">{error}</div>;
  }
  
  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {columns.map((column) => (
          <div key={column.id}>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  {column.title} ({tasks[column.id].length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Droppable droppableId={column.id}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="space-y-3 min-h-[200px]"
                    >
                      {tasks[column.id].map((task, index) => (
                        <Draggable
                          key={task.id}
                          draggableId={task.id}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <TaskCard task={task} />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </DragDropContext>
  );
}

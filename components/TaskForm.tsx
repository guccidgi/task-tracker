'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { supabase } from '../lib/supabase';
import { TaskPriority, TaskStatus, NewTask } from '../types/supabase';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Calendar } from './ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from './ui/popover';
import { CalendarIcon } from 'lucide-react';

// 表單驗證模式
const taskFormSchema = z.object({
  title: z.string().min(1, { message: '標題不能為空' }).max(100, { message: '標題不能超過100個字符' }),
  description: z.string().optional(),
  status: z.enum(['todo', 'in_progress', 'review', 'done']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  due_date: z.date().optional(),
  tags: z.string().optional(),
});

type TaskFormValues = z.infer<typeof taskFormSchema>;

/**
 * 任務表單組件 - 用於創建或編輯任務
 * 
 * @param {Object} props - 組件屬性
 * @param {Function} props.onSuccess - 表單提交成功後的回調函數
 * @param {Task} [props.initialData] - 初始任務數據（用於編輯現有任務）
 * @returns {JSX.Element} 任務表單組件
 */
export default function TaskForm({ onSuccess, initialData }: { onSuccess: () => void, initialData?: any }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // 初始化表單
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: initialData ? {
      ...initialData,
      due_date: initialData.due_date ? new Date(initialData.due_date) : undefined,
      tags: initialData.tags ? initialData.tags.join(', ') : '',
    } : {
      title: '',
      description: '',
      status: 'todo' as TaskStatus,
      priority: 'medium' as TaskPriority,
      due_date: undefined,
      tags: '',
    },
  });
  
  // 處理表單提交
  const onSubmit = async (values: TaskFormValues) => {
    setIsSubmitting(true);
    
    try {
      // 處理標籤
      const tags = values.tags
        ? values.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        : null;
      
      // 準備任務數據
      const taskData: Partial<NewTask> = {
        title: values.title,
        description: values.description || null,
        status: values.status,
        priority: values.priority,
        due_date: values.due_date ? values.due_date.toISOString() : null,
        tags,
      };
      
      if (initialData) {
        // 更新現有任務
        const { error } = await supabase
          .from('tasks')
          .update(taskData)
          .eq('id', initialData.id);
          
        if (error) throw error;
      } else {
        // 創建新任務
        // 注意：在實際應用中，您需要從身份驗證中獲取用戶 ID
        const { error } = await supabase
          .from('tasks')
          .insert({
            ...taskData,
            user_id: 'test-user-id', // 這應該是實際的用戶 ID
          });
          
        if (error) throw error;
      }
      
      // 成功回調
      onSuccess();
      form.reset();
    } catch (error) {
      console.error('Error saving task:', error);
      alert('保存任務時發生錯誤');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>標題</FormLabel>
              <FormControl>
                <Input placeholder="任務標題" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>描述</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="任務描述（可選）" 
                  className="resize-none" 
                  rows={3} 
                  {...field} 
                  value={field.value || ''}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>狀態</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="選擇狀態" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="todo">待處理</SelectItem>
                    <SelectItem value="in_progress">進行中</SelectItem>
                    <SelectItem value="review">審核中</SelectItem>
                    <SelectItem value="done">已完成</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel>優先級</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="選擇優先級" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="low">低</SelectItem>
                    <SelectItem value="medium">中</SelectItem>
                    <SelectItem value="high">高</SelectItem>
                    <SelectItem value="urgent">緊急</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="due_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>截止日期</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${!field.value ? "text-muted-foreground" : ""}`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {field.value ? format(field.value, 'PPP') : <span>選擇日期</span>}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                任務的截止日期（可選）
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>標籤</FormLabel>
              <FormControl>
                <Input placeholder="標籤（用逗號分隔）" {...field} />
              </FormControl>
              <FormDescription>
                用逗號分隔多個標籤，例如：工作, 重要, 會議
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={() => form.reset()}>重置</Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '保存中...' : initialData ? '更新任務' : '創建任務'}
          </Button>
        </div>
      </form>
    </Form>
  );
}

'use client';

import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { TaskStatus, TaskPriority } from '../types/supabase';
import { CheckIcon, ClockIcon, AlertTriangleIcon, CheckCircleIcon } from 'lucide-react';

// 狀態配置
const statusFilters: { value: TaskStatus; label: string; icon: React.ReactNode }[] = [
  { value: 'todo', label: '待處理', icon: <ClockIcon className="h-4 w-4" /> },
  { value: 'in_progress', label: '進行中', icon: <CheckIcon className="h-4 w-4" /> },
  { value: 'review', label: '審核中', icon: <AlertTriangleIcon className="h-4 w-4" /> },
  { value: 'done', label: '已完成', icon: <CheckCircleIcon className="h-4 w-4" /> },
];

// 優先級配置
const priorityFilters: { value: TaskPriority; label: string }[] = [
  { value: 'low', label: '低' },
  { value: 'medium', label: '中' },
  { value: 'high', label: '高' },
  { value: 'urgent', label: '緊急' },
];

/**
 * 任務過濾器組件 - 提供狀態和優先級過濾功能
 * 
 * @returns {JSX.Element} 任務過濾器組件
 */
export default function TaskFilters() {
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus | null>(null);
  const [selectedPriority, setSelectedPriority] = useState<TaskPriority | null>(null);
  
  return (
    <div className="space-y-6">
      {/* 狀態過濾 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">狀態</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <Button 
              variant={selectedStatus === null ? 'default' : 'outline'}
              className="w-full justify-start"
              onClick={() => setSelectedStatus(null)}
            >
              全部
            </Button>
            
            {statusFilters.map((status) => (
              <Button
                key={status.value}
                variant={selectedStatus === status.value ? 'default' : 'outline'}
                className="w-full justify-start"
                onClick={() => setSelectedStatus(status.value)}
              >
                <span className="mr-2">{status.icon}</span>
                {status.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* 優先級過濾 */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">優先級</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-2">
            <Button 
              variant={selectedPriority === null ? 'default' : 'outline'}
              className="w-full justify-start"
              onClick={() => setSelectedPriority(null)}
            >
              全部
            </Button>
            
            {priorityFilters.map((priority) => (
              <Button
                key={priority.value}
                variant={selectedPriority === priority.value ? 'default' : 'outline'}
                className="w-full justify-start"
                onClick={() => setSelectedPriority(priority.value)}
              >
                {priority.label}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { PlusIcon } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import TaskForm from './TaskForm';

/**
 * 新增任務按鈕組件 - 顯示一個按鈕，點擊後打開任務創建對話框
 * 
 * @returns {JSX.Element} 新增任務按鈕組件
 */
export default function NewTaskButton() {
  const [open, setOpen] = useState(false);
  
  const handleTaskCreated = () => {
    // 關閉對話框
    setOpen(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" />
          新增任務
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>新增任務</DialogTitle>
          <DialogDescription>
            創建一個新的任務。填寫下列表單並點擊提交。
          </DialogDescription>
        </DialogHeader>
        <TaskForm onSuccess={handleTaskCreated} />
      </DialogContent>
    </Dialog>
  );
}

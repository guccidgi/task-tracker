import { supabase } from '../lib/supabase';
import TaskCard from './TaskCard';
import { Task } from '../types/supabase';

/**
 * 任務列表組件 - 顯示所有任務卡片
 * 
 * @returns {Promise<JSX.Element>} 任務列表組件
 */
export default async function TaskList() {
  // 從 Supabase 獲取任務列表
  const { data: tasks, error } = await supabase
    .from('tasks')
    .select('*')
    .order('position', { ascending: true });
  
  if (error) {
    console.error('Error fetching tasks:', error);
    return <div className="text-red-500">載入任務時發生錯誤</div>;
  }
  
  if (!tasks || tasks.length === 0) {
    return (
      <div className="text-center p-8 border border-dashed rounded-lg">
        <h3 className="text-lg font-medium">目前沒有任務</h3>
        <p className="text-muted-foreground">點擊「新增任務」按鈕來創建您的第一個任務</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {tasks.map((task: Task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}

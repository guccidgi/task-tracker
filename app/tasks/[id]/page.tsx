import { notFound } from 'next/navigation';
import { supabase } from '../../../lib/supabase';
import TaskDetailView from '@/components/TaskDetailView';
import TaskDetailSkeleton from '@/components/TaskDetailSkeleton';
import { Suspense } from 'react';

/**
 * u4efbu52d9u8a73u7d30u9801u9762 - u986fu793au7279u5b9au4efbu52d9u7684u8a73u7d30u4fe1u606f
 * 
 * @param {Object} props - u7d44u4ef6u5c6cu6027
 * @param {Object} props.params - URL u53c3u6578
 * @param {string} props.params.id - u4efbu52d9 ID
 * @returns {Promise<JSX.Element>} u4efbu52d9u8a73u7d30u9801u9762u7d44u4ef6
 */
export default async function TaskPage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  // u5f9e Supabase u7372u53d6u4efbu52d9u8a73u7d30u4fe1u606f
  const { data: task, error } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .single();
  
  // u5982u679cu4efbu52d9u4e0du5b58u5728uff0cu8fd4u56de 404 u9801u9762
  if (error || !task) {
    notFound();
  }
  
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Suspense fallback={<TaskDetailSkeleton />}>
        <TaskDetailView taskId={id} />
      </Suspense>
    </div>
  );
}

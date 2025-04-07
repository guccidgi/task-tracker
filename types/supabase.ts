export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          title: string
          description: string | null
          status: 'todo' | 'in_progress' | 'review' | 'done'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          due_date: string | null
          user_id: string
          tags: string[] | null
          position: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          title: string
          description?: string | null
          status?: 'todo' | 'in_progress' | 'review' | 'done'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          due_date?: string | null
          user_id: string
          tags?: string[] | null
          position?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          title?: string
          description?: string | null
          status?: 'todo' | 'in_progress' | 'review' | 'done'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          due_date?: string | null
          user_id?: string
          tags?: string[] | null
          position?: number
        }
      }
      comments: {
        Row: {
          id: string
          created_at: string
          task_id: string
          user_id: string
          content: string
        }
        Insert: {
          id?: string
          created_at?: string
          task_id: string
          user_id: string
          content: string
        }
        Update: {
          id?: string
          created_at?: string
          task_id?: string
          user_id?: string
          content?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

// 導出常用類型
export type Task = Database['public']['Tables']['tasks']['Row'];
export type NewTask = Database['public']['Tables']['tasks']['Insert'];
export type UpdateTask = Database['public']['Tables']['tasks']['Update'];

export type Comment = Database['public']['Tables']['comments']['Row'];
export type NewComment = Database['public']['Tables']['comments']['Insert'];
export type UpdateComment = Database['public']['Tables']['comments']['Update'];

// 任務狀態類型
export type TaskStatus = 'todo' | 'in_progress' | 'review' | 'done';

// 任務優先級類型
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

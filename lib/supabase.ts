import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

/**
 * 創建 Supabase 客戶端實例
 * 用於與 Supabase 數據庫進行交互
 * 
 * @returns {SupabaseClient} Supabase 客戶端實例
 */
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

/**
 * 獲取當前已認證用戶
 * 
 * @returns {Promise<User | null>} 當前用戶或 null
 */
export async function getCurrentUser() {
  const { data: { session } } = await supabase.auth.getSession();
  return session?.user || null;
}

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string
          avatar_url: string | null
          level: number
          xp: number
          created_at: string
          updated_at: string
        }
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'created_at' | 'updated_at'>
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>
      }
      habits: {
        Row: {
          id: string
          user_id: string
          name: string
          description: string | null
          frequency: 'daily' | 'weekly' | 'monthly'
          category: string
          streak: number
          best_streak: number
          xp_reward: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['habits']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['habits']['Insert']>
      }
      goals: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          category: string
          priority: 'low' | 'medium' | 'high' | 'critical'
          progress: number
          target_date: string | null
          status: 'active' | 'completed' | 'paused' | 'abandoned'
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['goals']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['goals']['Insert']>
      }
      skills: {
        Row: {
          id: string
          user_id: string
          name: string
          category: string
          level: number
          xp: number
          practice_hours: number
          created_at: string
        }
        Insert: Omit<Database['public']['Tables']['skills']['Row'], 'id' | 'created_at'>
        Update: Partial<Database['public']['Tables']['skills']['Insert']>
      }
    }
  }
}

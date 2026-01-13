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
      profiles: {
        Row: {
          id: string
          email: string
          created_at: string
          subscription_tier: 'free' | 'premium'
          stripe_customer_id: string | null
        }
        Insert: {
          id: string
          email: string
          created_at?: string
          subscription_tier?: 'free' | 'premium'
          stripe_customer_id?: string | null
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          subscription_tier?: 'free' | 'premium'
          stripe_customer_id?: string | null
        }
      }
      subscriptions: {
        Row: {
          id: string
          user_id: string
          plan: 'free' | 'premium'
          status: 'active' | 'canceled' | 'past_due'
          current_period_end: string | null
          stripe_subscription_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          plan?: 'free' | 'premium'
          status?: 'active' | 'canceled' | 'past_due'
          current_period_end?: string | null
          stripe_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          plan?: 'free' | 'premium'
          status?: 'active' | 'canceled' | 'past_due'
          current_period_end?: string | null
          stripe_subscription_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      usage_tracking: {
        Row: {
          id: string
          user_id: string
          date: string
          generations_count: number
          reset_at: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          date?: string
          generations_count?: number
          reset_at?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          date?: string
          generations_count?: number
          reset_at?: string
          created_at?: string
        }
      }
      saved_generations: {
        Row: {
          id: string
          user_id: string
          content: Json
          title: string | null
          is_favorite: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          content: Json
          title?: string | null
          is_favorite?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          content?: Json
          title?: string | null
          is_favorite?: boolean
          created_at?: string
        }
      }
    }
  }
}

-- ============================================
-- CortexReach Database Schema
-- Complete setup for production deployment
-- ============================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABLES
-- ============================================

-- Profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'premium')),
  stripe_customer_id TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Usage tracking table (daily limits)
CREATE TABLE IF NOT EXISTS public.usage_tracking (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE DEFAULT CURRENT_DATE NOT NULL,
  generations_count INTEGER DEFAULT 0 CHECK (generations_count >= 0),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Saved generations table
CREATE TABLE IF NOT EXISTS public.saved_generations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title TEXT,
  subject TEXT,
  body TEXT,
  prospect_name TEXT,
  prospect_company TEXT,
  effectiveness_score INTEGER CHECK (effectiveness_score >= 0 AND effectiveness_score <= 100),
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usage_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_generations ENABLE ROW LEVEL SECURITY;

-- Profiles policies
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Usage tracking policies
DROP POLICY IF EXISTS "Users can view own usage" ON public.usage_tracking;
CREATE POLICY "Users can view own usage" 
  ON public.usage_tracking FOR SELECT 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own usage" ON public.usage_tracking;
CREATE POLICY "Users can insert own usage" 
  ON public.usage_tracking FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own usage" ON public.usage_tracking;
CREATE POLICY "Users can update own usage" 
  ON public.usage_tracking FOR UPDATE 
  USING (auth.uid() = user_id);

-- Saved generations policies
DROP POLICY IF EXISTS "Users can view own generations" ON public.saved_generations;
CREATE POLICY "Users can view own generations" 
  ON public.saved_generations FOR SELECT 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can insert own generations" ON public.saved_generations;
CREATE POLICY "Users can insert own generations" 
  ON public.saved_generations FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update own generations" ON public.saved_generations;
CREATE POLICY "Users can update own generations" 
  ON public.saved_generations FOR UPDATE 
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete own generations" ON public.saved_generations;
CREATE POLICY "Users can delete own generations" 
  ON public.saved_generations FOR DELETE 
  USING (auth.uid() = user_id);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_usage_tracking_user_date 
  ON public.usage_tracking(user_id, date DESC);

CREATE INDEX IF NOT EXISTS idx_saved_generations_user_id 
  ON public.saved_generations(user_id);

CREATE INDEX IF NOT EXISTS idx_saved_generations_created_at 
  ON public.saved_generations(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_saved_generations_favorite 
  ON public.saved_generations(user_id, is_favorite) 
  WHERE is_favorite = TRUE;

-- ============================================
-- FUNCTIONS
-- ============================================

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, subscription_tier)
  VALUES (NEW.id, NEW.email, 'free')
  ON CONFLICT (id) DO NOTHING;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get or create today's usage
CREATE OR REPLACE FUNCTION public.get_daily_usage(p_user_id UUID)
RETURNS TABLE (
  generations_count INTEGER,
  daily_limit INTEGER,
  remaining INTEGER
) AS $$
DECLARE
  v_count INTEGER;
  v_limit INTEGER;
  v_tier TEXT;
BEGIN
  -- Get user's subscription tier
  SELECT subscription_tier INTO v_tier
  FROM public.profiles
  WHERE id = p_user_id;
  
  -- Set limit based on tier
  v_limit := CASE 
    WHEN v_tier = 'premium' THEN 50
    ELSE 5
  END;
  
  -- Get or create today's usage
  INSERT INTO public.usage_tracking (user_id, date, generations_count)
  VALUES (p_user_id, CURRENT_DATE, 0)
  ON CONFLICT (user_id, date) DO NOTHING;
  
  -- Get current count
  SELECT COALESCE(ut.generations_count, 0) INTO v_count
  FROM public.usage_tracking ut
  WHERE ut.user_id = p_user_id 
    AND ut.date = CURRENT_DATE;
  
  RETURN QUERY SELECT 
    v_count,
    v_limit,
    GREATEST(0, v_limit - v_count);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to increment usage (atomic)
CREATE OR REPLACE FUNCTION public.increment_usage(p_user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  v_remaining INTEGER;
BEGIN
  -- Check remaining usage
  SELECT remaining INTO v_remaining
  FROM public.get_daily_usage(p_user_id);
  
  -- If no remaining usage, return false
  IF v_remaining <= 0 THEN
    RETURN FALSE;
  END IF;
  
  -- Increment usage
  INSERT INTO public.usage_tracking (user_id, date, generations_count)
  VALUES (p_user_id, CURRENT_DATE, 1)
  ON CONFLICT (user_id, date)
  DO UPDATE SET 
    generations_count = public.usage_tracking.generations_count + 1,
    updated_at = NOW();
  
  RETURN TRUE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get usage stats for dashboard
CREATE OR REPLACE FUNCTION public.get_usage_stats(p_user_id UUID)
RETURNS TABLE (
  total_generations BIGINT,
  today_count INTEGER,
  today_limit INTEGER,
  this_month_count BIGINT,
  subscription_tier TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::BIGINT as total_generations,
    COALESCE((
      SELECT generations_count 
      FROM public.usage_tracking 
      WHERE user_id = p_user_id AND date = CURRENT_DATE
    ), 0) as today_count,
    CASE 
      WHEN p.subscription_tier = 'premium' THEN 50
      ELSE 5
    END as today_limit,
    COALESCE((
      SELECT SUM(generations_count)::BIGINT
      FROM public.usage_tracking
      WHERE user_id = p_user_id 
        AND date >= DATE_TRUNC('month', CURRENT_DATE)
    ), 0) as this_month_count,
    p.subscription_tier
  FROM public.profiles p
  LEFT JOIN public.saved_generations sg ON sg.user_id = p.id
  WHERE p.id = p_user_id
  GROUP BY p.id, p.subscription_tier;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- TRIGGERS
-- ============================================

-- Trigger to create profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW 
  EXECUTE FUNCTION public.handle_new_user();

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS update_profiles_updated_at ON public.profiles;
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_usage_tracking_updated_at ON public.usage_tracking;
CREATE TRIGGER update_usage_tracking_updated_at
  BEFORE UPDATE ON public.usage_tracking
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

DROP TRIGGER IF EXISTS update_saved_generations_updated_at ON public.saved_generations;
CREATE TRIGGER update_saved_generations_updated_at
  BEFORE UPDATE ON public.saved_generations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at();

-- ============================================
-- INITIAL DATA (Optional)
-- ============================================

-- You can add any initial data here if needed

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Run these to verify setup:
-- SELECT * FROM public.profiles LIMIT 5;
-- SELECT * FROM public.usage_tracking LIMIT 5;
-- SELECT * FROM public.saved_generations LIMIT 5;
-- SELECT public.get_daily_usage('your-user-id-here');
-- SELECT * FROM public.get_usage_stats('your-user-id-here');

-- ============================================
-- NOTES
-- ============================================

-- Daily Limits:
-- - Free tier: 5 generations per day
-- - Premium tier: 50 generations per day

-- Usage tracking resets automatically at midnight (by date)
-- No cron job needed - handled by date-based queries

-- To upgrade a user to premium:
-- UPDATE public.profiles 
-- SET subscription_tier = 'premium' 
-- WHERE id = 'user-id-here';

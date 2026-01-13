import { createClient } from './supabase/server';
import { supabaseAdmin } from './supabase/admin';

const LIMITS = {
  free: 5,
  premium: 50,
};

export async function checkUsageLimit(userId: string): Promise<{ allowed: boolean; remaining: number; limit: number }> {
  const supabase = await createClient();
  
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('plan')
    .eq('user_id', userId)
    .single();

  const plan = subscription?.plan || 'free';
  const limit = LIMITS[plan as keyof typeof LIMITS];

  const today = new Date().toISOString().split('T')[0];
  
  const { data: usage } = await supabase
    .from('usage_tracking')
    .select('generations_count')
    .eq('user_id', userId)
    .eq('date', today)
    .single();

  const count = usage?.generations_count || 0;
  const remaining = Math.max(0, limit - count);

  return {
    allowed: count < limit,
    remaining,
    limit,
  };
}

export async function incrementUsage(userId: string): Promise<void> {
  const today = new Date().toISOString().split('T')[0];
  
  await supabaseAdmin
    .from('usage_tracking')
    .upsert({
      user_id: userId,
      date: today,
      generations_count: 1,
    }, {
      onConflict: 'user_id,date',
      ignoreDuplicates: false,
    })
    .then(async ({ error }) => {
      if (error) {
        await supabaseAdmin.rpc('increment_usage', {
          p_user_id: userId,
          p_date: today,
        });
      }
    });
}

export async function getRemainingGenerations(userId: string): Promise<number> {
  const { remaining } = await checkUsageLimit(userId);
  return remaining;
}

export async function resetUsage(userId: string): Promise<void> {
  const today = new Date().toISOString().split('T')[0];
  
  await supabaseAdmin
    .from('usage_tracking')
    .update({
      generations_count: 0,
      reset_at: new Date(Date.now() + 86400000).toISOString(),
    })
    .eq('user_id', userId)
    .eq('date', today);
}

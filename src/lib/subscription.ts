import { createClient } from './supabase/server';
import { supabaseAdmin } from './supabase/admin';

export async function getSubscriptionStatus(userId: string) {
  const supabase = await createClient();
  
  const { data, error } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', userId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateSubscription(
  userId: string,
  data: {
    plan?: string;
    status?: string;
    current_period_end?: string;
    stripe_subscription_id?: string;
  }
) {
  const { error } = await supabaseAdmin
    .from('subscriptions')
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq('user_id', userId);

  if (error) throw error;

  if (data.plan) {
    await supabaseAdmin
      .from('profiles')
      .update({ subscription_tier: data.plan })
      .eq('id', userId);
  }
}

export async function isPremiumUser(userId: string): Promise<boolean> {
  const subscription = await getSubscriptionStatus(userId);
  return subscription.plan === 'premium' && subscription.status === 'active';
}

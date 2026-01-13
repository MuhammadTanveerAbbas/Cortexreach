import { createClient } from './server';

export async function signUp(email: string, password: string) {
  const supabase = await createClient();
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  });
}

export async function signIn(email: string, password: string) {
  const supabase = await createClient();
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
}

export async function signOut() {
  const supabase = await createClient();
  return await supabase.auth.signOut();
}

export async function resetPassword(email: string) {
  const supabase = await createClient();
  return await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
  });
}

export async function updatePassword(newPassword: string) {
  const supabase = await createClient();
  return await supabase.auth.updateUser({
    password: newPassword,
  });
}

export async function getSession() {
  const supabase = await createClient();
  return await supabase.auth.getSession();
}

export async function getUser() {
  const supabase = await createClient();
  return await supabase.auth.getUser();
}

import { createClient } from './client';

export async function uploadFile(userId: string, file: File, path: string) {
  const supabase = createClient();
  const filePath = `${userId}/${path}`;
  
  return await supabase.storage
    .from('user-content')
    .upload(filePath, file, {
      upsert: true,
    });
}

export async function downloadFile(userId: string, path: string) {
  const supabase = createClient();
  const filePath = `${userId}/${path}`;
  
  return await supabase.storage
    .from('user-content')
    .download(filePath);
}

export async function deleteFile(userId: string, path: string) {
  const supabase = createClient();
  const filePath = `${userId}/${path}`;
  
  return await supabase.storage
    .from('user-content')
    .remove([filePath]);
}

export async function getPublicUrl(userId: string, path: string) {
  const supabase = createClient();
  const filePath = `${userId}/${path}`;
  
  return supabase.storage
    .from('user-content')
    .getPublicUrl(filePath);
}

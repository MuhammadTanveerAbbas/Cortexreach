import { NextResponse } from 'next/server';

export function errorResponse(message: string, status: number = 500) {
  return NextResponse.json({ error: message }, { status });
}

export function successResponse(data: any, status: number = 200) {
  return NextResponse.json(data, { status });
}

export async function withAuth<T>(
  handler: (userId: string) => Promise<T>
): Promise<NextResponse> {
  try {
    const { createClient } = await import('@/lib/supabase/server');
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return errorResponse('Unauthorized', 401);
    }

    const result = await handler(user.id);
    return successResponse(result);
  } catch (error) {
    console.error('API Error:', error);
    return errorResponse('Internal server error', 500);
  }
}

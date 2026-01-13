import { NextResponse } from 'next/server';
import { signOut } from '@/lib/supabase/auth';

export async function POST() {
  try {
    const { error } = await signOut();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

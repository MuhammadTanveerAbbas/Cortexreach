import { NextRequest, NextResponse } from 'next/server';
import { resetPassword, updatePassword } from '@/lib/supabase/auth';

export async function POST(request: NextRequest) {
  try {
    const { email, newPassword } = await request.json();

    if (newPassword) {
      const { error } = await updatePassword(newPassword);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (email) {
      const { error } = await resetPassword(email);
      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json(
      { error: 'Email or newPassword required' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

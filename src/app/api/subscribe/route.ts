import { NextResponse } from 'next/server';
import { z } from 'zod';

const emailSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const subscribers = new Set<string>();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = emailSchema.parse(body);

    if (subscribers.has(email)) {
      return NextResponse.json(
        { error: 'Email already subscribed' },
        { status: 409 }
      );
    }

    subscribers.add(email);
    console.log('✅ New subscriber:', email, `(Total: ${subscribers.size})`);
    
    await new Promise(resolve => setTimeout(resolve, 500));

    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed!' 
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }
    
    console.error('Subscribe error:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { signUp } from '@/lib/supabase/auth';
import { authRateLimit } from '@/lib/rate-limit';
import { trackEvent } from '@/lib/analytics';

export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = authRateLimit(request);
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { 
        error: 'Too many signup attempts. Please try again later.',
        retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
      },
      { 
        status: 429,
        headers: {
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
          'X-RateLimit-Reset': rateLimitResult.resetTime.toString(),
        }
      }
    );
  }

  try {
    const { email, password } = await request.json();

    // Input validation
    if (!email || !password) {
      trackEvent.error('Missing signup credentials', 'auth/signup');
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      trackEvent.error('Invalid email format', 'auth/signup');
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Password strength validation
    if (password.length < 6) {
      trackEvent.error('Weak password', 'auth/signup');
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const { data, error } = await signUp(email, password);

    if (error) {
      trackEvent.error(`Signup failed: ${error.message}`, 'auth/signup');
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ data }, { 
      status: 200,
      headers: {
        'X-RateLimit-Limit': rateLimitResult.limit.toString(),
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
      }
    });
  } catch (error) {
    trackEvent.error(`Signup server error: ${error}`, 'auth/signup');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { signIn } from '@/lib/supabase/auth';
import { authRateLimit } from '@/lib/rate-limit';
import { trackEvent } from '@/lib/analytics';

export async function POST(request: NextRequest) {
  // Apply rate limiting
  const rateLimitResult = authRateLimit(request);
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { 
        error: 'Too many login attempts. Please try again later.',
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
      trackEvent.error('Missing login credentials', 'auth/login');
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      trackEvent.error('Invalid email format', 'auth/login');
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    const { data, error } = await signIn(email, password);

    if (error) {
      trackEvent.error(`Login failed: ${error.message}`, 'auth/login');
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    return NextResponse.json({ data }, { 
      status: 200,
      headers: {
        'X-RateLimit-Limit': rateLimitResult.limit.toString(),
        'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
      }
    });
  } catch (error) {
    trackEvent.error(`Login server error: ${error}`, 'auth/login');
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

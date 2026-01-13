export const analytics = {
  event: (name: string, params?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && (window as Window & { gtag?: (...args: unknown[]) => void }).gtag) {
      ((window as unknown) as Window & { gtag: (...args: unknown[]) => void }).gtag('event', name, params);
    }
    // Also log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', name, params);
    }
  },
  
  pageView: (url: string) => {
    if (typeof window !== 'undefined' && (window as Window & { gtag?: (...args: unknown[]) => void }).gtag) {
      ((window as unknown) as Window & { gtag: (...args: unknown[]) => void }).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url,
      });
    }
  },
  
  identify: (userId: string, traits?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && (window as Window & { gtag?: (...args: unknown[]) => void }).gtag) {
      ((window as unknown) as Window & { gtag: (...args: unknown[]) => void }).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        user_id: userId,
        custom_map: traits,
      });
    }
  },
};

export const trackEvent = {
  // Authentication events
  userSignedUp: (email: string) => {
    analytics.event('sign_up', {
      method: 'email',
      email_domain: email.split('@')[1],
      timestamp: new Date().toISOString(),
    });
  },
  
  userSignedIn: (email: string) => {
    analytics.event('login', {
      method: 'email',
      email_domain: email.split('@')[1],
      timestamp: new Date().toISOString(),
    });
  },
  
  userSignedOut: () => {
    analytics.event('logout', {
      timestamp: new Date().toISOString(),
    });
  },
  
  // Dashboard events
  dashboardViewed: (tab: string) => {
    analytics.event('dashboard_viewed', {
      tab,
      timestamp: new Date().toISOString(),
    });
  },
  
  // Email generation events
  emailGenerated: (prospectName?: string, emailLength?: number) => {
    analytics.event('email_generated', {
      prospect_name: prospectName || 'unknown',
      email_length: emailLength,
      timestamp: new Date().toISOString(),
    });
  },
  
  emailAnalyzed: (score: number) => {
    analytics.event('email_analyzed', {
      effectiveness_score: score,
      score_category: score >= 80 ? 'high' : score >= 60 ? 'medium' : 'low',
      timestamp: new Date().toISOString(),
    });
  },
  
  emailCopied: (format: 'text' | 'html' | 'json' = 'text') => {
    analytics.event('email_copied', {
      format,
      timestamp: new Date().toISOString(),
    });
  },
  
  emailSaved: () => {
    analytics.event('email_saved', {
      timestamp: new Date().toISOString(),
    });
  },
  
  // Tool usage events
  toolUsed: (feature: string) => {
    analytics.event('tool_used', {
      feature,
      timestamp: new Date().toISOString(),
    });
  },
  
  // Engagement events
  demoLoaded: () => {
    analytics.event('demo_loaded', {
      timestamp: new Date().toISOString(),
    });
  },
  
  subscribed: (email: string) => {
    analytics.event('newsletter_subscribed', {
      email_domain: email.split('@')[1],
      timestamp: new Date().toISOString(),
    });
  },
  
  // Error tracking
  error: (error: string, context?: string) => {
    analytics.event('error_occurred', {
      error_message: error,
      context,
      timestamp: new Date().toISOString(),
    });
  },
};

export const analytics = {
  event: (name: string, params?: Record<string, unknown>) => {
    if (typeof window !== 'undefined' && (window as Window & { gtag?: (...args: unknown[]) => void }).gtag) {
      ((window as unknown) as Window & { gtag: (...args: unknown[]) => void }).gtag('event', name, params);
    }
  },
  
  pageView: (url: string) => {
    if (typeof window !== 'undefined' && (window as Window & { gtag?: (...args: unknown[]) => void }).gtag) {
      ((window as unknown) as Window & { gtag: (...args: unknown[]) => void }).gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: url,
      });
    }
  },
};

export const trackEvent = {
  emailGenerated: (prospectName?: string) => {
    analytics.event('email_generated', {
      prospect_name: prospectName || 'unknown',
      timestamp: new Date().toISOString(),
    });
  },
  
  emailAnalyzed: (score: number) => {
    analytics.event('email_analyzed', {
      effectiveness_score: score,
      timestamp: new Date().toISOString(),
    });
  },
  
  emailCopied: () => {
    analytics.event('email_copied', {
      timestamp: new Date().toISOString(),
    });
  },
  
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
};

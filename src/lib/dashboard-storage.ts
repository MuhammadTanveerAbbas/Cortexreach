// Dashboard data management utilities

export interface EmailData {
  subject: string;
  body: string;
  prospectName: string;
  timestamp: string;
  favorite?: boolean;
}

export interface UsageData {
  date: string;
  count: number;
}

export const dashboardStorage = {
  // Get all saved emails
  getEmails(): EmailData[] {
    if (typeof window === 'undefined') return [];
    const saved = localStorage.getItem('cortexreach_emails');
    return saved ? JSON.parse(saved) : [];
  },

  // Save a new email
  saveEmail(email: Omit<EmailData, 'timestamp'>): void {
    if (typeof window === 'undefined') return;
    const emails = this.getEmails();
    emails.push({
      ...email,
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('cortexreach_emails', JSON.stringify(emails));
  },

  // Get today's usage count
  getTodayUsage(): number {
    const emails = this.getEmails();
    const today = new Date().toDateString();
    return emails.filter((e) => new Date(e.timestamp).toDateString() === today).length;
  },

  // Get usage for last N days
  getUsageData(days: number = 30): UsageData[] {
    const emails = this.getEmails();
    return Array.from({ length: days }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (days - 1 - i));
      const dateStr = date.toDateString();
      const count = emails.filter((e) => new Date(e.timestamp).toDateString() === dateStr).length;
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        count,
      };
    });
  },

  // Get monthly usage
  getMonthlyUsage(): number {
    const emails = this.getEmails();
    const now = new Date();
    return emails.filter((e) => {
      const emailDate = new Date(e.timestamp);
      return emailDate.getMonth() === now.getMonth() && emailDate.getFullYear() === now.getFullYear();
    }).length;
  },

  // Clear all data
  clearAll(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('cortexreach_emails');
  },
};

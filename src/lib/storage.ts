// Local storage utilities for data persistence

export const storage = {
  saveEmail: (data: { subject: string; body: string; prospectName: string }) => {
    try {
      const emails = storage.getEmails();
      emails.unshift({ ...data, id: Date.now(), createdAt: new Date().toISOString() });
      localStorage.setItem('cortexreach_emails', JSON.stringify(emails.slice(0, 50)));
    } catch (error) {
      console.error('Failed to save email', error);
    }
  },

  getEmails: () => {
    try {
      const data = localStorage.getItem('cortexreach_emails');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  saveDraft: (data: Record<string, unknown>) => {
    try {
      localStorage.setItem('cortexreach_draft', JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save draft', error);
    }
  },

  getDraft: () => {
    try {
      const data = localStorage.getItem('cortexreach_draft');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  clearDraft: () => {
    try {
      localStorage.removeItem('cortexreach_draft');
    } catch (error) {
      console.error('Failed to clear draft', error);
    }
  }
};

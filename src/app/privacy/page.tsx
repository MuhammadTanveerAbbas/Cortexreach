import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl py-12 px-4">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
            <p>We collect information you provide directly:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account information (email, password)</li>
              <li>Prospect information you input for email generation</li>
              <li>Usage data and analytics</li>
              <li>Payment information (processed by Stripe)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
            <p>We use collected information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and improve our service</li>
              <li>Generate AI-powered email content</li>
              <li>Process payments and subscriptions</li>
              <li>Send service-related communications</li>
              <li>Analyze usage patterns</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. Data Storage and Security</h2>
            <p>We take security seriously:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Data is encrypted in transit and at rest</li>
              <li>We use Supabase for secure data storage</li>
              <li>Payment data is handled by Stripe (PCI compliant)</li>
              <li>We implement industry-standard security measures</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
            <p>We use third-party services:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Google AI (Gemini) - for email generation</li>
              <li>Groq AI - for email analysis</li>
              <li>Supabase - for authentication and database</li>
              <li>Stripe - for payment processing</li>
              <li>Vercel - for hosting</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Data Retention</h2>
            <p>We retain your data:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Account data: Until you delete your account</li>
              <li>Generated emails: Stored in browser localStorage</li>
              <li>Usage analytics: Aggregated and anonymized</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Delete your account and data</li>
              <li>Export your data</li>
              <li>Opt-out of marketing communications</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Cookies</h2>
            <p>We use cookies and similar technologies for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Authentication and session management</li>
              <li>Preferences and settings</li>
              <li>Analytics and performance monitoring</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
            <p>Our service is not intended for users under 18. We do not knowingly collect data from children.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Changes to Privacy Policy</h2>
            <p>We may update this policy. We will notify you of significant changes via email or service notification.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
            <p>For privacy concerns or data requests, contact us at: privacy@cortexreach.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}

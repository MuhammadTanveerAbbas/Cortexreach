import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl py-12 px-4">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>

        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        
        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
            <p>By accessing and using CortexReach, you accept and agree to be bound by these Terms of Service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. Use of Service</h2>
            <p>CortexReach provides AI-powered email generation tools. You agree to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use the service legally and ethically</li>
              <li>Not use the service for spam or unsolicited communications</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Not attempt to reverse engineer or abuse the service</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
            <p>You are responsible for:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Maintaining the confidentiality of your account</li>
              <li>All activities that occur under your account</li>
              <li>Notifying us of any unauthorized use</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">4. Subscription and Payments</h2>
            <p>For paid plans:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Subscriptions are billed monthly</li>
              <li>You can cancel anytime</li>
              <li>Refunds are handled on a case-by-case basis</li>
              <li>Prices may change with 30 days notice</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Content and Data</h2>
            <p>You retain ownership of content you input. We process data to provide the service but do not claim ownership.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Disclaimer</h2>
            <p>CortexReach is provided "as is" without warranties. We do not guarantee:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Specific results or reply rates</li>
              <li>Uninterrupted or error-free service</li>
              <li>Accuracy of AI-generated content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
            <p>We are not liable for any indirect, incidental, or consequential damages arising from your use of the service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
            <p>We may terminate or suspend access to our service immediately, without prior notice, for any breach of these Terms.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
            <p>We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">10. Contact</h2>
            <p>For questions about these Terms, contact us at: support@cortexreach.com</p>
          </section>
        </div>
      </div>
    </div>
  );
}

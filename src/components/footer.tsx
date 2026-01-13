import Logo from '@/components/logo';
import Link from 'next/link';
import { Github, Linkedin, Twitter, Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Logo className="h-7 w-7 text-sky-500" />
              <span className="text-lg font-bold">CortexReach</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              AI powered cold outreach that converts. 3x your reply rates with hyper personalized
              emails.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://twitter.com/m_tanveerabbas"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/muhammadtanveerabbas"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-500 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://github.com/muhammadtanveerabbas/CortexReach"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-500 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="mailto:support@cortexreach.com"
                className="hover:text-sky-500 transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="font-bold mb-4">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground hover:text-sky-500 transition-colors"
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-muted-foreground hover:text-sky-500 transition-colors"
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="font-bold mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="mailto:support@cortexreach.com"
                  className="text-muted-foreground hover:text-sky-500 transition-colors"
                >
                  Contact Support
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/muhammadtanveerabbas/CortexReach/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-sky-500 transition-colors"
                >
                  Report Issues
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Developer */}
          <div>
            <h3 className="font-bold mb-4">Developer</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://muhammadtanveerabbas.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-sky-500 transition-colors"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/muhammadtanveerabbas"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-sky-500 transition-colors"
                >
                  GitHub Profile
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CortexReach. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/privacy" className="hover:text-sky-500 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-sky-500 transition-colors">
                Terms of Service
              </Link>
              <a
                href="https://github.com/muhammadtanveerabbas/CortexReach"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sky-500 transition-colors flex items-center gap-1"
              >
                <Github className="h-4 w-4" />
                Star on GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

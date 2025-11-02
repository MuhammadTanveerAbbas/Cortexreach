
import Logo from '@/components/logo';
import { Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-2.5">
          <div className="flex items-center gap-2">
            <Logo className="h-6 w-6 text-primary" />
            <p className="text-center text-sm leading-loose md:text-left">
              Built by{' '}
              <a
                href="https://muhammadtanveerabbas.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="font-medium"
              >
                Muhammad Tanveer Abbas
              </a>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <a href="https://linkedin.com/in/muhammadtanveerabbas" target="_blank" rel="noopener noreferrer">
            <Linkedin className="h-5 w-5 hover:text-primary transition-colors" />
          </a>
          <a href="https://github.com/muhammadtanveerabbas" target="_blank" rel="noopener noreferrer">
            <Github className="h-5 w-5 hover:text-primary transition-colors" />
          </a>
          <a href="https://x.com/m_tanveerabbas" target="_blank" rel="noopener noreferrer">
            <svg className="h-5 w-5 hover:text-primary transition-colors" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
        <p className="text-center text-sm text-muted-foreground md:text-left">
          © 2024 CortexReach. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

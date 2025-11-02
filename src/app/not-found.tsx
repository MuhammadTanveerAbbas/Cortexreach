"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home, Zap, BrainCircuit, Github } from 'lucide-react';
import Logo from '@/components/logo';
import { useEffect, useState } from 'react';

export default function NotFound() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/30 relative overflow-hidden">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-6 w-6 text-primary" />
            <span className="font-bold">CortexReach</span>
          </Link>
          <a 
            href="https://github.com/MuhammadTanveerAbbas/CortexReach" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Github className="h-5 w-5" />
            <span className="font-medium hidden sm:inline">GitHub</span>
          </a>
        </div>
      </header>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className={`relative z-10 max-w-2xl w-full text-center transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* 404 with AI Brain Icon */}
          <div className="mb-8 relative">
            <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-primary/10 mb-6 relative">
              <BrainCircuit className="h-16 w-16 text-primary animate-pulse" />
              <div className="absolute inset-0 rounded-full border-4 border-primary/20 animate-ping" />
            </div>
            <h1 className="text-8xl sm:text-9xl font-extrabold bg-gradient-to-r from-foreground to-foreground/50 bg-clip-text text-transparent mb-4">
              404
            </h1>
          </div>

          {/* Message */}
          <div className="space-y-4 mb-10">
            <h2 className="text-2xl sm:text-4xl font-bold">
              Oops! Page Not Found
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md mx-auto px-4">
              Looks like this page took a detour. Even our AI couldn't locate it!
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Back to Home
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
              <Link href="/tool">
                <Zap className="mr-2 h-5 w-5" />
                Try AI Tool
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

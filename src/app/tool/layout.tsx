"use client";

import Link from "next/link";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-lg shadow-lg' : 'bg-background/80 backdrop-blur-sm'}`}>
        <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8 max-w-full">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-7 w-7 text-sky-500" />
            <span className="text-lg font-bold">CortexReach</span>
          </Link>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/tool">Dashboard</Link>
            </Button>
            <Button size="sm" className="bg-sky-500 hover:bg-sky-600 text-white font-semibold" asChild>
              <Link href="/">Home</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t bg-background/95 backdrop-blur-lg">
            <nav className="container flex flex-col gap-4 py-4 px-4">
              <div className="flex flex-col gap-2">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/tool">Dashboard</Link>
                </Button>
                <Button size="sm" className="bg-sky-500 hover:bg-sky-600 text-white" asChild>
                  <Link href="/">Home</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        <div className="container mx-auto px-0 sm:px-4">
          {children}
        </div>
      </main>
    </div>
  );
}

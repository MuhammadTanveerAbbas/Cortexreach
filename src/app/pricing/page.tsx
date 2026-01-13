'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, Shield, Users, Zap, ArrowRight, ChevronDown, Menu, X } from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/logo';
import { Footer } from '@/components/footer';

const faqs = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes, cancel anytime with no questions asked. Your subscription remains active until the end of the billing period.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit cards, debit cards, and digital wallets through Stripe.',
  },
  {
    q: 'Is there a refund policy?',
    a: 'Contact support within 30 days if you have issues. Refunds are handled on a case-by-case basis.',
  },
  {
    q: 'Can I upgrade or downgrade my plan?',
    a: 'Absolutely! You can change your plan at any time. Changes take effect immediately.',
  },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navbar */}
      <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-lg shadow-lg' : 'bg-background/80 backdrop-blur-sm'}`}>
        <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8 max-w-full">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-7 w-7 text-sky-500" />
            <span className="text-lg font-bold">CortexReach</span>
          </Link>

          <div className="hidden md:flex items-center gap-3">
            <Button size="sm" className="bg-sky-500 hover:bg-sky-600 text-white font-semibold" asChild>
              <Link href="/dashboard">Create Account</Link>
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
                <Button size="sm" className="bg-sky-500 hover:bg-sky-600 text-white" asChild>
                  <Link href="/dashboard">Create Account</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container px-4 py-12 sm:py-16 md:py-20 lg:py-24">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16 space-y-3 sm:space-y-4">
          <Badge className="mb-3 sm:mb-4 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm">Simple, Transparent Pricing</Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
            Choose Your Plan
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Start free, upgrade when you need more power. No hidden fees.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto mb-12 sm:mb-16 md:mb-20">
          {/* Free Plan */}
          <Card className="border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-xl">
            <CardHeader className="pb-6 sm:pb-8">
              <div className="space-y-2">
                <CardTitle className="text-xl sm:text-2xl">Free</CardTitle>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-bold">$0</span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">Perfect for trying out CortexReach</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <ul className="space-y-3 sm:space-y-4">
                {[
                  '5 generations per day',
                  'Basic AI features',
                  'Email effectiveness scoring',
                  'Export to TXT',
                  'Community support',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 sm:gap-3">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full text-sm" size="lg" variant="outline" asChild>
                <Link href="/dashboard">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Premium Plan */}
          <Card className="border-2 border-primary relative hover:shadow-2xl transition-all duration-300 scale-100 md:scale-105">
            <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-primary to-sky-500 text-white px-4 py-1 sm:px-6 sm:py-1.5 text-xs sm:text-sm">
                <Sparkles className="h-3 w-3 mr-1" />
                Most Popular
              </Badge>
            </div>
            <CardHeader className="pb-6 sm:pb-8 pt-6 sm:pt-8">
              <div className="space-y-2">
                <CardTitle className="text-xl sm:text-2xl">Premium</CardTitle>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
                    $20
                  </span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">For professionals who need more</p>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              <ul className="space-y-3 sm:space-y-4">
                {[
                  '50 generations per day',
                  'Advanced AI features',
                  'Priority email analysis',
                  'Save unlimited emails',
                  'Export to TXT, HTML, JSON',
                  'Priority support',
                  'Early access to new features',
                  'Analytics dashboard',
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 sm:gap-3">
                    <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-gradient-to-r from-primary to-sky-500 hover:opacity-90 text-sm" size="lg">
                <Zap className="mr-2 h-4 w-4" />
                Upgrade to Premium
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Social Proof */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 md:mb-20 items-center">
          <div className="flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-green-500/10 border border-green-500/20">
            <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
            <span className="text-xs sm:text-sm font-medium">30-day money-back guarantee</span>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Frequently Asked Questions</h2>
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, i) => (
              <Card
                key={i}
                className="border-2 cursor-pointer hover:border-primary/50 transition-all"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                <CardHeader className="pb-3 sm:pb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm sm:text-base">{faq.q}</h3>
                    <ChevronDown
                      className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform ${openFaq === i ? 'rotate-180' : ''}`}
                    />
                  </div>
                </CardHeader>
                {openFaq === i && (
                  <CardContent className="pt-0 animate-fade-in">
                    <p className="text-muted-foreground text-xs sm:text-sm">{faq.a}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
      </div>
      
      <Footer />
    </div>
  );
}

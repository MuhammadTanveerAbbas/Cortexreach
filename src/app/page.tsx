'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  ArrowRight,
  Zap,
  BrainCircuit,
  Pen,
  Users,
  TrendingUp,
  Shield,
  Clock,
  Target,
  CheckCircle,
  Sparkles,
  Check,
  X,
  ChevronDown,
  Github,
} from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/logo';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Footer } from '@/components/footer';
import { trackEvent } from '@/lib/analytics';

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        trackEvent.subscribed(email);
        alert('🎉 Successfully subscribed! Check your email.');
        setEmail('');
      } else {
        alert('❌ ' + data.error);
      }
    } catch {
      alert('❌ Failed to subscribe. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-6 w-6 text-sky-500" />
            <span className="font-bold">CortexReach</span>
          </Link>
          <a
            href="https://github.com/MuhammadTanveerAbbas/CortexReach"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <Github className="h-5 w-5 text-sky-500" />
            <span className="font-medium">GitHub</span>
          </a>
        </div>
      </header>

      <main className="flex-1">
        {/* 1. Hero Section */}
        <section className="relative overflow-hidden">
          <div className="container relative py-20 md:py-28">
            <div
              className={`mx-auto max-w-4xl text-center transition-all duration-1000 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
            >
              {/* Badge */}
              <div className="mb-8 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-5 py-2 text-sm font-semibold backdrop-blur-xl">
                  <Sparkles className="h-4 w-4 text-sky-500" />
                  <span>Transform Your Cold Outreach</span>
                </div>
              </div>

              {/* Main heading */}
              <h1 className="mb-6 font-headline text-3xl font-black tracking-tight sm:text-5xl md:text-7xl">
                <span className="block leading-tight">Turn Cold Leads into</span>
                <span className="mt-2 block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent leading-tight">
                  Warm Conversations
                </span>
              </h1>

              {/* Description */}
              <p className="mx-auto mb-8 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg md:text-xl px-4">
                The world's first unified AI copilot that researches prospects, crafts hyper
                personalized emails, and predicts success rates.
              </p>

              {/* CTA buttons */}
              <div className="mb-8 flex flex-col items-center justify-center gap-3 sm:flex-row px-4">
                <Button
                  size="default"
                  className="w-full sm:w-auto h-10 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-semibold shadow-xl transition-all hover:shadow-2xl hover:scale-105"
                  asChild
                >
                  <Link href="/tool">
                    <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-sky-500" />
                    <span>Start Free Trial</span>
                  </Link>
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  className="w-full sm:w-auto h-10 sm:h-12 px-6 sm:px-8 text-sm sm:text-base font-semibold transition-all hover:scale-105"
                  asChild
                >
                  <Link href="#pricing">
                    View Pricing
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 text-sky-500" />
                  </Link>
                </Button>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground px-4">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-sky-500" />
                  <span className="font-medium">No credit card required</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-sky-500" />
                  <span className="font-medium">14 day free trial</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <CheckCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-sky-500" />
                  <span className="font-medium">Cancel anytime</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. How It Works */}
        <section className="py-12 md:py-20">
          <div className="container px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl font-bold md:text-4xl mb-2 md:mb-3">How It Works</h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Three simple steps to transform your cold outreach
              </p>
            </div>
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border border-border/50 hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-sky-500/10 text-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      1
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-sky-500/5 flex items-center justify-center mx-auto mb-4">
                      <BrainCircuit className="h-6 w-6 text-sky-500" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Paste Prospect Info</h3>
                    <p className="text-sm text-muted-foreground">
                      Drop LinkedIn profile, bio, or any prospect data. Get key insights instantly.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border border-border/50 hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-sky-500/10 text-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      2
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-sky-500/5 flex items-center justify-center mx-auto mb-4">
                      <Pen className="h-6 w-6 text-sky-500" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Generate Email</h3>
                    <p className="text-sm text-muted-foreground">
                      AI crafts hyper personalized email with compelling subject line in seconds.
                    </p>
                  </CardContent>
                </Card>
                <Card className="border border-border/50 hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-sky-500/10 text-foreground flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                      3
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-sky-500/5 flex items-center justify-center mx-auto mb-4">
                      <Target className="h-6 w-6 text-sky-500" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">Analyze & Send</h3>
                    <p className="text-sm text-muted-foreground">
                      Get effectiveness score, optimization tips, then send with confidence.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* 4. Results & Impact */}
        <section className="py-12 md:py-20">
          <div className="container px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl font-bold md:text-4xl mb-2 md:mb-3">Real Results, Real Impact</h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                See the measurable difference CortexReach makes
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <Card className="border border-border/50 bg-card/50 backdrop-blur">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 rounded-full bg-red-900/20 flex items-center justify-center">
                      <X className="h-4 w-4 text-red-500" />
                    </div>
                    Before CortexReach
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-sky-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold">30+ minutes per email</p>
                      <p className="text-xs text-muted-foreground">Manual research and writing</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-sky-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold">2-5% reply rate</p>
                      <p className="text-xs text-muted-foreground">Generic template emails</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="h-4 w-4 text-sky-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold">No success prediction</p>
                      <p className="text-xs text-muted-foreground">Guesswork and hope</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Users className="h-4 w-4 text-sky-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold">5+ tools needed</p>
                      <p className="text-xs text-muted-foreground">Fragmented workflow</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-green-500/30 bg-card/50 backdrop-blur">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="w-8 h-8 rounded-full bg-green-900/20 flex items-center justify-center">
                      <Check className="h-4 w-4 text-green-500" />
                    </div>
                    With CortexReach
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Clock className="h-4 w-4 text-sky-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold">30 seconds per email</p>
                      <p className="text-xs text-muted-foreground">AI powered automation</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-sky-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold">8-15% reply rate</p>
                      <p className="text-xs text-muted-foreground">Hyper personalized content</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Target className="h-4 w-4 text-sky-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold">AI effectiveness scoring</p>
                      <p className="text-xs text-muted-foreground">Data-driven optimization</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Sparkles className="h-4 w-4 text-sky-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold">All-in-one platform</p>
                      <p className="text-xs text-muted-foreground">Unified workflow</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 5. Features */}
        <section className="py-12 md:py-20">
          <div className="container px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl font-bold md:text-4xl mb-2 md:mb-3">Everything You Need</h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                All-in-one platform to research, write, and optimize cold emails
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 max-w-5xl mx-auto">
              <Card className="border border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 mx-auto">
                    <BrainCircuit className="h-6 w-6 text-sky-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">AI Prospect Research</h3>
                  <p className="text-sm text-muted-foreground">
                    Instant intelligence extraction from any prospect data source.
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 mx-auto">
                    <Pen className="h-6 w-6 text-sky-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Hyper Personalization</h3>
                  <p className="text-sm text-muted-foreground">
                    Human-like emails that reference specific prospect details.
                  </p>
                </CardContent>
              </Card>
              <Card className="border border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10 mx-auto">
                    <Target className="h-6 w-6 text-sky-500" />
                  </div>
                  <h3 className="text-lg font-bold mb-2">Predictive Analytics</h3>
                  <p className="text-sm text-muted-foreground">
                    AI-powered scores and suggestions before you send.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 6. Comparison Table */}
        <section className="py-12 md:py-20">
          <div className="container px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl font-bold md:text-4xl mb-2 md:mb-3">
                CortexReach vs Manual Outreach
              </h2>
              <p className="text-sm md:text-base text-muted-foreground">
                See why teams are switching to AI-powered outreach
              </p>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-3 gap-px border border-border/50 rounded-lg overflow-hidden bg-border/50">
                <div className="p-3 text-sm font-bold bg-card">Feature</div>
                <div className="p-3 text-sm font-bold bg-card text-center">Manual</div>
                <div className="p-3 text-sm font-bold bg-primary/10 text-center">CortexReach</div>

                <div className="p-3 text-sm bg-card">Research Time</div>
                <div className="p-3 text-sm bg-card text-center text-muted-foreground">30+ min</div>
                <div className="p-3 text-sm bg-card text-center font-semibold">30 sec</div>

                <div className="p-3 text-sm bg-card">Reply Rate</div>
                <div className="p-3 text-sm bg-card text-center text-muted-foreground">2-5%</div>
                <div className="p-3 text-sm bg-card text-center font-semibold">8-15%</div>

                <div className="p-3 text-sm bg-card">Personalization</div>
                <div className="p-3 bg-card text-center">
                  <X className="h-4 w-4 mx-auto text-red-500" />
                </div>
                <div className="p-3 bg-card text-center">
                  <Check className="h-4 w-4 mx-auto text-green-500" />
                </div>

                <div className="p-3 text-sm bg-card">Effectiveness Score</div>
                <div className="p-3 bg-card text-center">
                  <X className="h-4 w-4 mx-auto text-red-500" />
                </div>
                <div className="p-3 bg-card text-center">
                  <Check className="h-4 w-4 mx-auto text-green-500" />
                </div>

                <div className="p-3 text-sm bg-card">Spam Prevention</div>
                <div className="p-3 bg-card text-center">
                  <X className="h-4 w-4 mx-auto text-red-500" />
                </div>
                <div className="p-3 bg-card text-center">
                  <Check className="h-4 w-4 mx-auto text-green-500" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 7. Why Choose CortexReach */}
        <section className="py-12 md:py-20">
          <div className="container px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl font-bold md:text-4xl mb-2 md:mb-3">Why Choose CortexReach?</h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Built for modern sales professionals
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <Card className="border border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10">
                      <Zap className="h-6 w-6 text-sky-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">Lightning Fast</h3>
                      <p className="text-sm text-muted-foreground">
                        Generate personalized emails in 30 seconds. No more spending hours
                        researching and writing.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10">
                      <Target className="h-6 w-6 text-sky-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">Highly Accurate</h3>
                      <p className="text-sm text-muted-foreground">
                        AI-powered insights extract key information from any prospect data with
                        precision.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10">
                      <Shield className="h-6 w-6 text-sky-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">Privacy First</h3>
                      <p className="text-sm text-muted-foreground">
                        Your data is encrypted and secure. We never store or share your prospect
                        information.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-sky-500/10">
                      <TrendingUp className="h-6 w-6 text-sky-500" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-2">Proven Results</h3>
                      <p className="text-sm text-muted-foreground">
                        3x higher reply rates compared to manual outreach. Data-driven optimization.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 8. Pricing */}
        <section id="pricing" className="py-12 md:py-20">
          <div className="container px-4">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl font-bold md:text-4xl mb-2 md:mb-3">Simple, Transparent Pricing</h2>
              <p className="text-sm md:text-base text-muted-foreground">
                Choose the plan that fits your needs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <CardDescription>Get started for free</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$0</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span>10 emails/month</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span>AI research & writing</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span>Basic effectiveness analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span>Community support</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6" variant="outline" asChild>
                    <Link href="/tool">Get Started Free</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-foreground relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-foreground text-background px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </div>
                <CardHeader>
                  <CardTitle>Pro</CardTitle>
                  <CardDescription>For professionals</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$49</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span>500 emails/month</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span>Everything in Free</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span>Advanced analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span>Email templates</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6" asChild>
                    <Link href="/tool">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <CardDescription>For large teams</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">$199</span>
                    <span className="text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span>Unlimited emails</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span>Everything in Pro</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span>Team collaboration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span>Custom integrations</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <span>Dedicated support</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-6" variant="outline" asChild>
                    <Link href="/tool">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 9. FAQ */}
        <section className="py-12 md:py-28 bg-muted/30">
          <div className="container px-4">
            <div className="text-center mb-8 md:mb-16">
              <h2 className="font-headline text-2xl font-bold md:text-5xl mb-3 md:mb-4">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="max-w-3xl mx-auto space-y-3">
              {[
                {
                  q: 'How does the AI personalization work?',
                  a: 'Our AI analyzes prospect data (LinkedIn profiles, bios, articles) to extract key insights, pain points, and interests. It then crafts emails that reference specific details, making each message feel personally written.',
                },
                {
                  q: 'Can I edit the AI-generated emails?',
                  a: 'Absolutely! All emails are fully editable with our rich text editor. The AI provides a strong foundation, and you can customize any part before sending.',
                },
                {
                  q: "What's the effectiveness score based on?",
                  a: 'Our AI analyzes subject lines, email structure, personalization depth, call-to-action clarity, and spam indicators to predict open rates, click rates, and reply rates.',
                },
                {
                  q: 'Do you integrate with email clients?',
                  a: 'Yes! You can copy emails to any email client (Gmail, Outlook, etc.). Enterprise plans include direct integrations and API access.',
                },
                {
                  q: 'Is there a free trial?',
                  a: 'Yes! All plans include a 14 day free trial with no credit card required. Cancel anytime during the trial period.',
                },
              ].map((faq, i) => (
                <Card
                  key={i}
                  className="cursor-pointer"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{faq.q}</CardTitle>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${
                          openFaq === i ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </CardHeader>
                  {openFaq === i && (
                    <CardContent>
                      <p className="text-muted-foreground">{faq.a}</p>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 10. Email Capture / CTA */}
        <section id="contact" className="py-12 md:py-32">
          <div className="container text-center px-4">
            <h2 className="font-headline text-2xl font-bold tracking-tight md:text-6xl mb-4 md:mb-6">
              Ready to 3x Your Reply Rates?
            </h2>
            <p className="mx-auto mt-3 md:mt-4 max-w-2xl text-sm md:text-lg text-muted-foreground mb-6 md:mb-10">
              Join 500+ sales professionals transforming their outreach. Start your free trial
              today.
            </p>
            <form onSubmit={handleEmailSubmit} className="max-w-md mx-auto flex gap-2 mb-6 md:mb-8">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? 'Subscribing...' : 'Get Started'}
              </Button>
            </form>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5 md:gap-2">
                <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-sky-500" />
                <span>14 day free trial</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-sky-500" />
                <span>No credit card</span>
              </div>
              <div className="flex items-center gap-1.5 md:gap-2">
                <CheckCircle className="h-3.5 w-3.5 md:h-4 md:w-4 text-sky-500" />
                <span>Cancel anytime</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

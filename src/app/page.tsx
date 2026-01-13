'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Zap,
  BrainCircuit,
  Pen,
  TrendingUp,
  Shield,
  Target,
  CheckCircle,
  Sparkles,
  Check,
  Clock,
  BarChart3,
  FileText,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import Logo from '@/components/logo';
import { Card, CardContent } from '@/components/ui/card';
import { Footer } from '@/components/footer';

export default function Home() {
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
      <header
        className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-lg shadow-lg' : 'bg-background/80 backdrop-blur-sm'}`}
      >
        <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8 max-w-full">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="h-7 w-7 text-sky-500" />
            <span className="text-lg font-bold">CortexReach</span>
          </Link>

          <div className="hidden md:flex items-center gap-3">
            <Button
              size="sm"
              className="bg-sky-500 hover:bg-sky-600 text-white font-semibold"
              asChild
            >
              <Link href="/signup">Create Account</Link>
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
                  <Link href="/signup">Create Account</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* 1. Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-background via-sky-950/5 to-background">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-900/20 via-background to-background"></div>
          <div className="container relative mx-auto px-4 py-12 sm:py-16 md:py-20 lg:py-28">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-4 sm:mb-6 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/30 bg-sky-500/10 px-3 py-1 sm:px-4 sm:py-1.5 text-xs sm:text-sm font-semibold backdrop-blur-xl">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-sky-500" />
                  <span>AI Powered Cold Outreach</span>
                </div>
              </div>

              <h1 className="mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight">
                <span className="block">Turn Cold Leads into</span>
                <span className="mt-2 block bg-gradient-to-r from-sky-400 to-blue-600 bg-clip-text text-transparent">
                  Warm Conversations
                </span>
              </h1>

              <p className="mx-auto mb-6 sm:mb-8 max-w-2xl text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground px-4">
                Generate personalized emails with AI research, effectiveness predictions, and
                optimization suggestions.
              </p>

              <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row items-center justify-center gap-3 px-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-sm sm:text-base"
                  asChild
                >
                  <Link href="/signup">
                    <Zap className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                    Start Free
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto font-semibold hover:scale-105 transition-all text-sm sm:text-base"
                  asChild
                >
                  <Link href="/pricing">
                    View Pricing
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground px-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-sky-500" />
                  <span>Start free today</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 sm:h-4 sm:w-4 text-sky-500" />
                  <span>5 emails daily free</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2. How It Works */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-background via-sky-950/5 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">How It Works</h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-4">
                Three simple steps to transform your outreach game
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
              <Card className="border-border/50 bg-card/50 backdrop-blur text-center hover:border-sky-500/50 transition-all duration-300">
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <Clock className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-red-500" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">Time-Consuming Research</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Spending 30+ minutes researching each prospect manually kills productivity
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-card/50 backdrop-blur text-center hover:border-sky-500/50 transition-all duration-300">
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-orange-500/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <FileText className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-orange-500" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">Generic Templates</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Copy-paste templates get 2-5% reply rates and damage your sender reputation
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border/50 bg-card/50 backdrop-blur text-center hover:border-sky-500/50 transition-all duration-300">
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-yellow-500/10 flex items-center justify-center mx-auto mb-3 sm:mb-4">
                    <BarChart3 className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-yellow-500" />
                  </div>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">No Success Prediction</h3>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    Sending emails blindly without knowing what works wastes opportunities
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* 3. Problem Section */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Why CortexReach?</h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto px-4">
                Traditional cold outreach is broken. We fix it.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Features Section */}
        <section id="features" className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Why Choose CortexReach?
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-4">
                AI-powered tools to help you write better cold emails
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-6xl mx-auto">
              {[
                {
                  icon: BrainCircuit,
                  title: 'AI Prospect Research',
                  desc: 'Automatically extract insights from LinkedIn profiles, company websites, and recent news in seconds',
                },
                {
                  icon: Pen,
                  title: 'Personalized Writing',
                  desc: 'Generate personalized emails based on prospect information you provide',
                },
                {
                  icon: Target,
                  title: 'Effectiveness Scoring',
                  desc: 'Get AI-generated effectiveness scores (0-100) to help evaluate your emails',
                },
                {
                  icon: Zap,
                  title: 'Fast Generation',
                  desc: 'Create personalized emails in under 30 seconds using AI',
                },
                {
                  icon: TrendingUp,
                  title: 'Smart Optimization',
                  desc: 'Receive AI powered suggestions to improve subject lines, tone, and call-to-actions',
                },
                {
                  icon: Shield,
                  title: 'Secure Processing',
                  desc: 'Your data is processed securely with standard encryption practices',
                },
              ].map((feature, i) => (
                <Card
                  key={i}
                  className="border-border/50 bg-card/50 backdrop-blur hover:border-sky-500/50 transition-all duration-300 group hover:shadow-xl hover:shadow-sky-500/10"
                >
                  <CardContent className="p-4 sm:p-6 md:p-8">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 flex items-center justify-center mb-4 sm:mb-6 group-hover:from-sky-500/30 group-hover:to-blue-600/30 transition-all duration-300">
                      <feature.icon className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-sky-500 group-hover:scale-110 transition-transform duration-300" />
                    </div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 group-hover:text-sky-400 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Pricing Preview */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-background via-sky-950/5 to-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">How It Works</h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-4">
                Three simple steps to transform your outreach game
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="relative">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-r from-sky-500/10 via-transparent to-blue-500/10 rounded-3xl"></div>

                <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 p-4 sm:p-6 md:p-8 lg:p-12">
                  {/* Step 1 */}
                  <div className="text-center group">
                    <div className="relative mb-4 sm:mb-6 md:mb-8">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center mx-auto text-2xl sm:text-2xl md:text-3xl font-bold shadow-2xl shadow-sky-500/30 group-hover:scale-110 transition-transform duration-300">
                        1
                      </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-sky-500/20 group-hover:border-sky-500/40 transition-all duration-300">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                        <BrainCircuit className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-sky-500" />
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Add Prospect Info</h3>
                      <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                        Simply paste LinkedIn profiles, company websites, or any prospect
                        information. Our AI instantly analyzes and extracts key insights.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="text-center group">
                    <div className="relative mb-4 sm:mb-6 md:mb-8">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center mx-auto text-2xl sm:text-2xl md:text-3xl font-bold shadow-2xl shadow-sky-500/30 group-hover:scale-110 transition-transform duration-300">
                        2
                      </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-sky-500/20 group-hover:border-sky-500/40 transition-all duration-300">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                        <Pen className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-sky-500" />
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Generate Email</h3>
                      <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                        AI generates emails based on the information you provide. Quality depends on input quality.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="text-center group">
                    <div className="relative mb-4 sm:mb-6 md:mb-8">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-sky-400 to-blue-600 text-white flex items-center justify-center mx-auto text-2xl sm:text-2xl md:text-3xl font-bold shadow-2xl shadow-sky-500/30 group-hover:scale-110 transition-transform duration-300">
                        3
                      </div>
                    </div>

                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 sm:p-5 md:p-6 border border-sky-500/20 group-hover:border-sky-500/40 transition-all duration-300">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br from-sky-500/20 to-blue-600/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                        <Target className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-sky-500" />
                      </div>
                      <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-3 sm:mb-4">Optimize & Send</h3>
                      <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                        Get AI effectiveness scores and suggestions to help improve your emails before sending.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Pricing Preview */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">Simple Pricing</h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg">Start free, upgrade when you're ready</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto">
              <Card className="border-border/50 bg-card/50 backdrop-blur">
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Free</h3>
                  <p className="text-muted-foreground mb-4 sm:mb-6 text-xs sm:text-sm">Perfect for trying out CortexReach</p>
                  <div className="mb-4 sm:mb-6">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold">$0</span>
                    <span className="text-muted-foreground text-sm">/month</span>
                  </div>
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">5 generations/day</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">Basic AI features</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">Email effectiveness scoring</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">Community support</span>
                    </li>
                  </ul>
                  <Button className="w-full text-sm" variant="outline" asChild>
                    <Link href="/signup">Get Started Free</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-2 border-sky-500 bg-card/50 backdrop-blur relative">
                <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 bg-sky-500 text-white px-3 py-0.5 sm:px-4 sm:py-1 rounded-full text-xs sm:text-sm font-bold">
                  Most Popular
                </div>
                <CardContent className="p-4 sm:p-6 md:p-8">
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">Premium</h3>
                  <p className="text-muted-foreground mb-4 sm:mb-6 text-xs sm:text-sm">For professionals who need more</p>
                  <div className="mb-4 sm:mb-6">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold">$20</span>
                    <span className="text-muted-foreground text-sm">/month</span>
                  </div>
                  <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">50 generations/day</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">Advanced AI features</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">Priority email analysis</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">Priority support</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="h-4 w-4 sm:h-5 sm:w-5 text-sky-500 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">Export to all formats</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-sky-500 hover:bg-sky-600 text-white text-sm" asChild>
                    <Link href="/signup">Start Premium</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
            <div className="text-center mt-8 sm:mt-12">
              <Button variant="outline" size="lg" asChild className="text-sm">
                <Link href="/pricing">
                  View Full Pricing Details
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* 6. Key Benefits */}
        <section id="benefits" className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 sm:mb-12 md:mb-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
                Built for Real Results
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg lg:text-xl max-w-3xl mx-auto px-4">
                Honest approach to AI-powered email generation
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 max-w-5xl mx-auto">
              <Card className="border-border/50 bg-card/50 backdrop-blur p-4 sm:p-6 md:p-8">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">Research-Backed Personalization</h3>
                    <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                      Uses proven sales psychology principles and personalization techniques that
                      top sales professionals rely on.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur p-4 sm:p-6 md:p-8">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">Save Hours of Manual Work</h3>
                    <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                      Eliminate the time-consuming research phase. Focus on what matters - building
                      relationships and closing deals.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur p-4 sm:p-6 md:p-8">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-purple-500" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">Privacy-First Approach</h3>
                    <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                      Your prospect data is processed securely and never stored. We respect privacy
                      as much as you do.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="border-border/50 bg-card/50 backdrop-blur p-4 sm:p-6 md:p-8">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                    <Target className="h-5 w-5 sm:h-6 sm:w-6 text-orange-500" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">Learn What Works</h3>
                    <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm">
                      Get insights into why certain emails perform better, helping you improve your
                      overall outreach strategy.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* 7. Final CTA */}
        <section className="py-12 sm:py-16 md:py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center bg-gradient-to-r from-sky-950/50 to-blue-950/50 rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 border border-sky-500/20">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4">
                Ready to Transform Your Outreach?
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                Try CortexReach and see if AI-powered email generation works for your outreach.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-sky-500 hover:bg-sky-600 text-white font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all text-sm sm:text-base"
                  asChild
                >
                  <Link href="/signup">
                    Start Generating for Free
                    <ChevronRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto font-semibold hover:scale-105 transition-all text-sm sm:text-base"
                  asChild
                >
                  <Link href="mailto:support@cortexreach.com">Talk to Sales</Link>
                </Button>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mt-4 sm:mt-6">
                Start free • 5 emails daily • Upgrade anytime
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

'use client';

import { useState, useTransition, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Loader,
  Sparkles,
  Copy,
  Save,
  RefreshCw,
  Download,
  Brain,
  Target,
  MailOpen,
  Send,
  AlertCircle,
  TestTube,
} from 'lucide-react';
import { generatePersonalizedEmails } from '@/ai/flows/generate-personalized-emails';
import { summarizeProspectInsights } from '@/ai/flows/summarize-prospect-insights';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const demoData = [
  {
    name: 'Sarah Chen',
    company: 'TechFlow Solutions',
    title: 'VP of Marketing',
    details: 'Sarah Chen is the VP of Marketing at TechFlow Solutions, a fast-growing B2B SaaS company. She has 8+ years of experience in digital marketing and recently spoke at MarketingCon 2024 about AI-driven customer acquisition. Her LinkedIn shows she\'s passionate about data-driven marketing strategies and has been actively posting about the challenges of scaling marketing teams in competitive markets.'
  },
  {
    name: 'Michael Rodriguez',
    company: 'InnovateCorp',
    title: 'Head of Sales',
    details: 'Michael Rodriguez leads the sales team at InnovateCorp, a mid-market software company specializing in project management tools. He has 10+ years in B2B sales and recently achieved 150% of quota. His recent LinkedIn activity shows interest in sales automation and improving team productivity. He frequently shares insights about modern sales methodologies and building high-performing sales teams.'
  },
  {
    name: 'Emily Watson',
    company: 'GrowthLab',
    title: 'Founder & CEO',
    details: 'Emily Watson is the Founder and CEO of GrowthLab, a boutique growth consulting firm. She previously worked at Google and Stripe in growth roles. Her company helps B2B startups scale from $1M to $10M ARR. She recently published an article about the importance of personalized outreach in modern sales and has been vocal about the challenges of finding quality lead generation tools.'
  }
];

export default function ToolTab() {
  const [isGenerating, startGenerating] = useTransition();
  const [prospectDetails, setProspectDetails] = useState('');
  const [prospectName, setProspectName] = useState('');
  const [prospectCompany, setProspectCompany] = useState('');
  const [prospectJobTitle, setProspectJobTitle] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [progress, setProgress] = useState(0);
  const [dailyUsage, setDailyUsage] = useState({ used: 0, limit: 5 });
  const { toast } = useToast();

  const handleDemoData = () => {
    const randomDemo = demoData[Math.floor(Math.random() * demoData.length)];
    setProspectName(randomDemo.name);
    setProspectCompany(randomDemo.company);
    setProspectJobTitle(randomDemo.title);
    setProspectDetails(randomDemo.details);
    
    toast({
      title: '🎯 Demo Data Loaded!',
      description: `Loaded sample data for ${randomDemo.name}`,
    });
  };

  useEffect(() => {
    // Load daily usage
    const savedEmails = JSON.parse(localStorage.getItem('cortexreach_emails') || '[]');
    const today = new Date().toDateString();
    const todayCount = savedEmails.filter((e: any) => new Date(e.timestamp).toDateString() === today).length;
    setDailyUsage({ used: todayCount, limit: 5 });
  }, [subject]);

  const handleGenerate = () => {
    if (!prospectDetails.trim()) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please provide prospect details.',
      });
      return;
    }

    if (dailyUsage.used >= dailyUsage.limit) {
      toast({
        variant: 'destructive',
        title: 'Daily Limit Reached',
        description: 'Upgrade to Premium for 50 generations per day.',
      });
      return;
    }

    startGenerating(async () => {
      try {
        setSubject('');
        setBody('');
        setProgress(0);

        setProgress(30);
        const summaryResult = await summarizeProspectInsights({ prospectDetails });
        
        setProgress(70);
        const emailResult = await generatePersonalizedEmails({
          prospectName: prospectName || 'there',
          prospectCompany: prospectCompany || 'your company',
          prospectJobTitle: prospectJobTitle || 'professional',
          emailContext: summaryResult.summary,
        });

        setProgress(100);
        setSubject(emailResult.subjectLine);
        setBody(emailResult.body);

        toast({
          title: '✨ Email Generated!',
          description: 'Your personalized email is ready.',
        });
      } catch {
        toast({
          variant: 'destructive',
          title: 'Generation Failed',
          description: 'Please try again.',
        });
      }
    });
  };

  const handleSave = () => {
    if (!subject && !body) return;
    
    const savedEmails = JSON.parse(localStorage.getItem('cortexreach_emails') || '[]');
    savedEmails.push({
      subject,
      body,
      prospectName: prospectName || 'Unknown',
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('cortexreach_emails', JSON.stringify(savedEmails));

    toast({
      title: '✅ Saved!',
      description: 'Email saved to your collection.',
    });
  };

  const handleCopy = () => {
    if (!subject && !body) return;
    const plainText = `Subject: ${subject}\n\n${body.replace(/<[^>]*>/g, '\n')}`;
    navigator.clipboard.writeText(plainText);
    toast({
      title: '✅ Copied!',
      description: 'Email copied to clipboard.',
    });
  };

  const handleExport = () => {
    if (!subject && !body) return;
    const content = `Subject: ${subject}\n\n${body.replace(/<[^>]*>/g, '\n')}`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `email-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const limitReached = dailyUsage.used >= dailyUsage.limit;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Email Generator
          </h1>
          <p className="text-lg text-muted-foreground font-medium mt-1">
            Create personalized cold outreach emails with AI
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={handleDemoData}
            className="font-semibold"
          >
            <TestTube className="mr-2 h-4 w-4" />
            Load Demo
          </Button>
          <Badge variant={limitReached ? 'destructive' : 'default'} className="text-sm px-4 py-2 font-semibold">
            {dailyUsage.used}/{dailyUsage.limit} today
          </Badge>
        </div>
      </div>

      {limitReached && (
        <Card className="border-2 border-orange-500/50 bg-orange-500/5">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-500 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">Daily limit reached</p>
                <p className="text-sm text-muted-foreground">
                  Upgrade to Premium for 50 generations per day and unlock advanced features.
                </p>
                <Button className="mt-3" size="sm" asChild>
                  <Link href="/pricing">Upgrade Now</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm hover:border-sky-500/30 transition-all duration-300">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-3 text-xl font-bold">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 flex items-center justify-center">
                <Brain className="h-5 w-5 text-sky-500" />
              </div>
              Prospect Research
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="details" className="flex items-center gap-2 text-base font-semibold">
                <Target className="h-4 w-4 text-sky-500" />
                Prospect Background
              </Label>
              <Textarea
                id="details"
                placeholder="Paste LinkedIn profile, bio, recent articles, or any prospect information..."
                className="min-h-[160px] resize-none text-base leading-relaxed font-medium"
                value={prospectDetails}
                onChange={(e) => setProspectDetails(e.target.value)}
              />
            </div>

            <div className="grid gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-sm font-semibold">Name (Optional)</Label>
                <Input
                  id="name"
                  placeholder="e.g., Sarah Chen"
                  className="font-medium"
                  value={prospectName}
                  onChange={(e) => setProspectName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-sm font-semibold">Company (Optional)</Label>
                <Input
                  id="company"
                  placeholder="e.g., TechCorp"
                  className="font-medium"
                  value={prospectCompany}
                  onChange={(e) => setProspectCompany(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title" className="text-sm font-semibold">Job Title (Optional)</Label>
                <Input
                  id="title"
                  placeholder="e.g., VP of Marketing"
                  className="font-medium"
                  value={prospectJobTitle}
                  onChange={(e) => setProspectJobTitle(e.target.value)}
                />
              </div>
            </div>

            <Button
              className="w-full bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold shadow-lg hover:shadow-xl transition-all duration-300"
              size="lg"
              onClick={handleGenerate}
              disabled={isGenerating || limitReached}
            >
              {isGenerating ? (
                <>
                  <Loader className="mr-2 h-5 w-5 animate-spin" />
                  Generating... {progress}%
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Generate Email
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output Section */}
        <Card className="border-2 border-border/50 bg-card/50 backdrop-blur-sm hover:border-green-500/30 transition-all duration-300">
          <CardHeader className="pb-6">
            <CardTitle className="flex items-center gap-3 text-xl font-bold">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <MailOpen className="h-5 w-5 text-green-500" />
              </div>
              Generated Email
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="subject" className="text-sm font-semibold">Subject Line</Label>
              <Input
                id="subject"
                placeholder="Your subject line will appear here..."
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="font-semibold text-base"
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="body" className="text-sm font-semibold">Email Body</Label>
              <Textarea
                id="body"
                placeholder="Your personalized email content will appear here..."
                className="min-h-[200px] resize-none text-base leading-relaxed font-medium"
                value={body.replace(/<[^>]*>/g, '\n')}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="font-semibold"
                onClick={handleCopy}
                disabled={!subject && !body}
              >
                <Copy className="mr-2 h-4 w-4" />
                Copy
              </Button>
              <Button
                variant="outline"
                className="font-semibold"
                onClick={handleSave}
                disabled={!subject && !body}
              >
                <Save className="mr-2 h-4 w-4" />
                Save
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="font-semibold"
                onClick={handleGenerate}
                disabled={isGenerating || !prospectDetails.trim() || limitReached}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate
              </Button>
              <Button
                variant="outline"
                className="font-semibold"
                onClick={handleExport}
                disabled={!subject && !body}
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

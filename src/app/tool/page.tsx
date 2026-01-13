'use client';

import { useState, useTransition, useRef, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton, SkeletonCard } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import {
  Loader,
  Pen,
  Copy,
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Sparkles,
  MailOpen,
  MousePointerClick,
  Target,
  Lightbulb,
  TrendingUp,
  Award,
  Brain,
  Zap,
  CheckCircle,
  BarChart3,
  Send,
  Download,
  FileText,
  Keyboard,
} from 'lucide-react';
import { generatePersonalizedEmails } from '@/ai/flows/generate-personalized-emails';
import {
  rateEmailEffectiveness,
  RateEmailEffectivenessOutput,
} from '@/ai/flows/rate-email-effectiveness';
import { summarizeProspectInsights } from '@/ai/flows/summarize-prospect-insights';
import { useToast } from '@/hooks/use-toast';
import { storage } from '@/lib/storage';
import { trackEvent } from '@/lib/analytics';

const suggestionIcons = [Lightbulb, TrendingUp, Award];

const demoProspects = [
  {
    details: `Sarah Chen is the VP of Marketing at InnovateTech, a fast growing SaaS company in the AI space. She recently wrote a blog post titled "The Future of AI in Marketing Automation" where she emphasized the need for more personalized and human like customer interactions. She's active on LinkedIn, often sharing insights about marketing trends and leadership. In her bio, she mentions being passionate about mentorship and sustainable tech.`,
    name: 'Sarah Chen',
    company: 'InnovateTech',
    title: 'VP of Marketing',
  },
  {
    details: `Alex Rodriguez is the Head of Growth at QuantumLeap, a startup focused on predictive analytics. He was recently featured on a podcast discussing the challenges of scaling data infrastructure. He's a known advocate for using data driven strategies to achieve product market fit. His company, QuantumLeap, just secured Series A funding to expand their engineering team.`,
    name: 'Alex Rodriguez',
    company: 'QuantumLeap',
    title: 'Head of Growth',
  },
  {
    details: `Dr. Emily Carter is the Chief Technology Officer at BioGenetics Inc., a leading firm in genomic research. She published a paper on CRISPR technology's impact on modern medicine. Her work is highly respected in the academic community, and she often speaks at biotech conferences. She is looking for ways to accelerate their research data processing pipeline.`,
    name: 'Dr. Emily Carter',
    company: 'BioGenetics Inc.',
    title: 'CTO',
  },
  {
    details: `Michael B. Jordan is a Senior Sales Director at Nexus Solutions, a company that provides cybersecurity solutions to financial institutions. He posted on LinkedIn about the rising threat of phishing attacks in the banking sector. He's looking for innovative ways to protect his clients and has shown interest in AI driven security platforms.`,
    name: 'Michael B. Jordan',
    company: 'Nexus Solutions',
    title: 'Senior Sales Director',
  },
];

export default function ComposerPage() {
  const [isGenerating, startGenerating] = useTransition();
  const [isAnalyzing, startAnalyzing] = useTransition();
  const [isLoadingDemo, startLoadingDemo] = useTransition();
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const { toast } = useToast();

  // State for Prospect
  const [prospectDetails, setProspectDetails] = useState('');
  const [prospectName, setProspectName] = useState('');
  const [prospectCompany, setProspectCompany] = useState('');
  const [prospectJobTitle, setProspectJobTitle] = useState('');
  const [insights, setInsights] = useState('');

  // State for Email Composer
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const editorRef = useRef<HTMLDivElement>(null);

  // State for Email Rater
  const [effectivenessResult, setEffectivenessResult] =
    useState<RateEmailEffectivenessOutput | null>(null);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'Enter':
          e.preventDefault();
          if (!isGenerating && prospectDetails.trim()) {
            // handleGenerateEmail will be called directly
          }
          break;
        case 'e':
          e.preventDefault();
          if (!isAnalyzing && (subject.trim() || body.trim())) {
            // handleAnalyzeEmail will be called directly
          }
          break;
        case 'c':
          if (e.shiftKey) {
            e.preventDefault();
            // handleCopyEmail will be called directly
          }
          break;
        case '/':
          e.preventDefault();
          setShowKeyboardShortcuts(!showKeyboardShortcuts);
          break;
      }
    }
  }, [isGenerating, isAnalyzing, prospectDetails, subject, body, showKeyboardShortcuts]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setIsVisible(true);
    const draft = storage.getDraft();
    if (draft) {
      setProspectDetails(draft.prospectDetails || '');
      setProspectName(draft.prospectName || '');
      setProspectCompany(draft.prospectCompany || '');
      setProspectJobTitle(draft.prospectJobTitle || '');
      setSubject(draft.subject || '');
      setBody(draft.body || '');
    }
  }, []);

  useEffect(() => {
    if (subject || body || prospectDetails) {
      const timer = setTimeout(() => {
        storage.saveDraft({
          prospectDetails,
          prospectName,
          prospectCompany,
          prospectJobTitle,
          subject,
          body,
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [prospectDetails, prospectName, prospectCompany, prospectJobTitle, subject, body]);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== body) {
      editorRef.current.innerHTML = body;
    }
  }, [body]);

  const handleBodyChange = (e: React.FormEvent<HTMLDivElement>) => {
    setBody(e.currentTarget.innerHTML);
  };

  const handleFormat = (command: string) => {
    if (editorRef.current) {
      document.execCommand(command, false, undefined);
      editorRef.current.focus();
      setBody(editorRef.current.innerHTML);
    }
  };

  const handleExportEmail = (format: 'txt' | 'html' | 'json') => {
    if (!subject && !body) {
      toast({
        variant: 'destructive',
        title: 'Nothing to Export',
        description: 'Please generate or write an email first.',
      });
      return;
    }

    let content = '';
    let filename = '';
    let mimeType = '';

    switch (format) {
      case 'txt':
        content = `Subject: ${subject}\n\n${body.replace(/<[^>]*>/g, '\n').replace(/\n+/g, '\n').trim()}`;
        filename = `email-${Date.now()}.txt`;
        mimeType = 'text/plain';
        break;
      case 'html':
        content = `<!DOCTYPE html><html><head><title>${subject}</title></head><body><h2>${subject}</h2><div>${body}</div></body></html>`;
        filename = `email-${Date.now()}.html`;
        mimeType = 'text/html';
        break;
      case 'json':
        content = JSON.stringify({
          subject,
          body: body.replace(/<[^>]*>/g, '\n').replace(/\n+/g, '\n').trim(),
          htmlBody: body,
          prospectName: prospectName || 'Unknown',
          prospectCompany: prospectCompany || '',
          prospectJobTitle: prospectJobTitle || '',
          generatedAt: new Date().toISOString(),
          effectivenessScore: effectivenessResult?.effectivenessScore || null,
        }, null, 2);
        filename = `email-${Date.now()}.json`;
        mimeType = 'application/json';
        break;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    trackEvent.emailCopied();

    toast({
      title: '✅ Email Exported',
      description: `Email exported as ${format.toUpperCase()} file.`,
    });
  };

  const handleGenerateEmail = () => {
    if (!prospectDetails.trim()) {
      toast({
        variant: 'destructive',
        title: 'Missing Prospect Information',
        description: 'Please provide prospect details to generate a personalized email.',
      });
      return;
    }

    setCurrentStep(2);
    startGenerating(async () => {
      try {
        // Check usage limit
        const usageResponse = await fetch('/api/usage');
        const usageData = await usageResponse.json();
        
        if (usageData.remaining <= 0) {
          toast({
            variant: 'destructive',
            title: 'Daily Limit Reached',
            description: 'You\'ve reached your daily generation limit. Upgrade to Premium for more.',
          });
          setCurrentStep(1);
          return;
        }

        setSubject('');
        setBody('');
        setInsights('');
        setEffectivenessResult(null);
        setGenerationProgress(0);

        // Simulate realistic progress updates
        const updateProgress = (progress: number) => {
          setGenerationProgress(progress);
        };

        // Step 1: Analyze prospect with progress simulation
        updateProgress(15);
        await new Promise(resolve => setTimeout(resolve, 400));
        updateProgress(30);
        await new Promise(resolve => setTimeout(resolve, 500));
        updateProgress(45);
        await new Promise(resolve => setTimeout(resolve, 400));
        
        const summaryResult = await summarizeProspectInsights({ prospectDetails });
        setInsights(summaryResult.summary);
        updateProgress(60);
        await new Promise(resolve => setTimeout(resolve, 500));

        // Step 2: Generate email with progress simulation
        updateProgress(75);
        await new Promise(resolve => setTimeout(resolve, 600));
        updateProgress(88);
        await new Promise(resolve => setTimeout(resolve, 400));
        
        const emailResult = await generatePersonalizedEmails({
          prospectName: prospectName || 'there',
          prospectCompany: prospectCompany || 'your company',
          prospectJobTitle: prospectJobTitle || 'professional',
          emailContext: summaryResult.summary,
        });

        updateProgress(96);
        await new Promise(resolve => setTimeout(resolve, 300));
        
        setSubject(emailResult.subjectLine);
        setBody(emailResult.body);
        updateProgress(100);
        await new Promise(resolve => setTimeout(resolve, 200));
        setCurrentStep(3);

        trackEvent.emailGenerated(prospectName);

        toast({
          title: '✨ Email Generated Successfully!',
          description: 'Your hyper personalized email is ready for review.',
        });
      } catch {
        setCurrentStep(1);
        setGenerationProgress(0);
        toast({
          variant: 'destructive',
          title: 'Generation Failed',
          description: 'AI service temporarily unavailable. Please try again.',
        });
      }
    });
  };

  const handleAnalyzeEmail = () => {
    if (!body.trim() && !subject.trim()) {
      toast({
        variant: 'destructive',
        title: 'No Email Content',
        description: 'Please generate or write an email before analyzing effectiveness.',
      });
      return;
    }

    startAnalyzing(async () => {
      try {
        setEffectivenessResult(null);
        const cleanBody = body.replace(/<[^>]*>/g, '').trim();
        const result = await rateEmailEffectiveness({
          emailContent: `Subject: ${subject}\n\n${cleanBody}`,
          targetAudience: prospectJobTitle || 'professional',
          goal: 'Get a reply and start a conversation',
        });
        setEffectivenessResult(result);

        trackEvent.emailAnalyzed(result.effectivenessScore);

        toast({
          title: '🎯 Analysis Complete!',
          description: `Effectiveness score: ${result.effectivenessScore}/100`,
        });
      } catch {
        toast({
          variant: 'destructive',
          title: 'Analysis Failed',
          description: 'AI analysis service temporarily unavailable.',
        });
      }
    });
  };

  const handleCopyEmail = () => {
    if (!subject && !body) {
      toast({
        variant: 'destructive',
        title: 'Nothing to Copy',
        description: 'Please generate or write an email first.',
      });
      return;
    }
    const plainTextBody = body.replace(/<[^>]*>/g, '\n');
    navigator.clipboard.writeText(`Subject: ${subject}\n\n${plainTextBody}`);
    storage.saveEmail({ subject, body, prospectName: prospectName || 'Unknown' });

    trackEvent.emailCopied();

    toast({
      title: '✅ Email Copied & Saved',
      description: 'Email copied to clipboard and saved to history.',
    });
  };

  const handleDemoClick = () => {
    startLoadingDemo(async () => {
      await new Promise((resolve) => setTimeout(resolve, 300));
      const randomProspect = demoProspects[Math.floor(Math.random() * demoProspects.length)];
      setProspectDetails(randomProspect.details);
      setProspectName(randomProspect.name);
      setProspectCompany(randomProspect.company);
      setProspectJobTitle(randomProspect.title);

      trackEvent.demoLoaded();

      toast({
        title: 'Demo Content Loaded',
        description: 'Click "Generate Email" to see the AI in action.',
      });
    });
  };

  const isPending = isGenerating || isAnalyzing || isLoadingDemo;

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-background via-background to-primary/5 transition-all duration-1000 ${
        isVisible ? 'animate-fade-in' : 'opacity-0'
      }`}
    >
      {/* Keyboard Shortcuts Help */}
      {showKeyboardShortcuts && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Keyboard className="h-5 w-5" />
                Keyboard Shortcuts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Generate Email</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+Enter</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Analyze Email</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+E</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Copy Email</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+Shift+C</kbd>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Toggle Shortcuts</span>
                <kbd className="px-2 py-1 bg-muted rounded text-xs">Ctrl+/</kbd>
              </div>
              <Button 
                className="w-full mt-4" 
                onClick={() => setShowKeyboardShortcuts(false)}
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Progress Indicator */}
      <div className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b">
        <div className="container py-2.5 md:py-4">
          <div className="flex items-center justify-center flex-wrap gap-2">
            <div className="flex items-center gap-2 md:gap-4">
              <div
                className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium transition-all ${
                  currentStep >= 1
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <Brain className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span>Research</span>
              </div>
              <div
                className={`w-4 md:w-8 h-0.5 transition-all ${
                  currentStep >= 2 ? 'bg-primary' : 'bg-muted'
                }`}
              />
              <div
                className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium transition-all ${
                  currentStep >= 2
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <Pen className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span>Draft</span>
              </div>
              <div
                className={`w-4 md:w-8 h-0.5 transition-all ${
                  currentStep >= 3 ? 'bg-primary' : 'bg-muted'
                }`}
              />
              <div
                className={`flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 md:py-1.5 rounded-full text-xs md:text-sm font-medium transition-all ${
                  currentStep >= 3
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                <BarChart3 className="h-3.5 w-3.5 md:h-4 md:w-4" />
                <span>Analyze</span>
              </div>
            </div>
            {isGenerating && (
              <div className="flex items-center gap-2 text-xs md:text-sm text-muted-foreground">
                <Loader className="h-3.5 w-3.5 md:h-4 md:w-4 animate-spin" />
                <span className="hidden sm:inline">AI Processing... {generationProgress}%</span>
                <span className="sm:hidden">{generationProgress}%</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container py-4 md:py-8 px-4">
        <div className="grid grid-cols-1 gap-4 md:gap-6 lg:gap-8 lg:grid-cols-5">
          {/* Column 1: Prospect Research */}
          <Card className="flex flex-col lg:col-span-2 border-2 w-full">
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="flex items-center gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 rounded-lg bg-sky-500/10">
                  <Brain className="h-4 w-4 md:h-5 md:w-5 text-sky-500" />
                </div>
                <div>
                  <div className="text-base md:text-lg font-bold">AI Prospect Research</div>
                  <div className="text-xs md:text-sm text-muted-foreground font-normal">
                    Step 1: Paste prospect information
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col flex-1 space-y-4 md:space-y-6">
              <div className="space-y-2 md:space-y-3">
                <Label
                  htmlFor="prospect-details"
                  className="text-xs md:text-sm font-medium flex items-center gap-2"
                >
                  <Target className="h-3 w-3 md:h-4 md:w-4 text-sky-500" />
                  Prospect Background
                </Label>
                <Textarea
                  id="prospect-details"
                  placeholder="Paste LinkedIn profile, bio, recent articles, or any prospect information here...\n\nExample: 'Sarah Chen is VP of Marketing at TechCorp. She recently published an article about AI in marketing automation and is passionate about data-driven strategies.'"
                  className="min-h-[180px] md:min-h-[240px] resize-none border-2 focus:border-primary/50 transition-colors pr-4 text-sm scrollbar-thin scrollbar-thumb-sky-500 scrollbar-track-muted hover:scrollbar-thumb-sky-600"
                  value={prospectDetails}
                  onChange={(e) => setProspectDetails(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 gap-3 md:gap-4">
                <div className="space-y-2">
                  <Label htmlFor="prospect-name" className="text-sm font-medium">
                    Name (Optional)
                  </Label>
                  <Input
                    id="prospect-name"
                    placeholder="e.g., Sarah Chen"
                    value={prospectName}
                    onChange={(e) => setProspectName(e.target.value)}
                    className="border-2 focus:border-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prospect-company" className="text-sm font-medium">
                    Company (Optional)
                  </Label>
                  <Input
                    id="prospect-company"
                    placeholder="e.g., TechCorp"
                    value={prospectCompany}
                    onChange={(e) => setProspectCompany(e.target.value)}
                    className="border-2 focus:border-primary/50 transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="prospect-title" className="text-sm font-medium">
                    Job Title (Optional)
                  </Label>
                  <Input
                    id="prospect-title"
                    placeholder="e.g., VP of Marketing"
                    value={prospectJobTitle}
                    onChange={(e) => setProspectJobTitle(e.target.value)}
                    className="border-2 focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>

              {insights && (
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg animate-fade-in">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-sky-500" />
                    <span className="text-sm font-medium text-green-700">
                      Key Insights Extracted
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{insights}</p>
                </div>
              )}

              <div className="flex flex-col gap-3 pt-4">
                <Button
                  size="lg"
                  className="group relative overflow-hidden"
                  onClick={handleGenerateEmail}
                  disabled={isPending}
                >
                  {isGenerating ? (
                    <>
                      <Loader className="mr-2 h-5 w-5 animate-spin" />
                      <span>AI Generating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                      <span>Generate Email (Ctrl+Enter)</span>
                    </>
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDemoClick}
                  disabled={isPending}
                  className="border-2 hover:border-primary/50"
                >
                  {isLoadingDemo ? (
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Zap className="mr-2 h-4 w-4" />
                  )}
                  Try Demo Data
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Column 2: Email Composer */}
          <Card
            className={`flex flex-col flex-1 lg:col-span-3 border-2 transition-all duration-500 w-full ${
              currentStep === 2
                ? 'border-primary/50 shadow-lg animate-pulse-glow'
                : 'border-border hover:border-primary/30'
            }`}
          >
            <CardHeader className="pb-3 md:pb-4">
              <CardTitle className="flex items-center gap-2 md:gap-3">
                <div className="p-1.5 md:p-2 rounded-lg bg-sky-500/10">
                  <Pen className="h-4 w-4 md:h-5 md:w-5 text-sky-500" />
                </div>
                <div>
                  <div className="text-base md:text-lg font-bold">AI Email Composer</div>
                  <div className="text-xs md:text-sm text-muted-foreground font-normal">
                    Step 2: Review and customize your email
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col space-y-4 md:space-y-6">
              {isGenerating ? (
                <div className="space-y-4 animate-fade-in">
                  <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <Brain className="h-5 w-5 text-primary animate-pulse" />
                    <div>
                      <div className="font-medium text-sm">AI is crafting your email...</div>
                      <div className="text-xs text-muted-foreground">
                        Analyzing prospect data and generating personalized content
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-32 w-full" />
                    <div className="flex gap-2">
                      <Skeleton className="h-10 flex-1" />
                      <Skeleton className="h-10 flex-1" />
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="space-y-2 md:space-y-3">
                    <Label
                      htmlFor="subject"
                      className="text-xs md:text-sm font-medium flex items-center gap-2"
                    >
                      <MailOpen className="h-3 w-3 md:h-4 md:w-4 text-sky-500" />
                      Subject Line
                    </Label>
                    <Input
                      id="subject"
                      placeholder={isGenerating ? "AI is crafting your subject line..." : "Your compelling subject line will appear here..."}
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="border-2 focus:border-primary/50 transition-colors text-sm md:text-base font-medium"
                      disabled={isGenerating}
                    />
                  </div>

                  <div className="space-y-2 md:space-y-3 flex-1 flex flex-col">
                    <Label className="text-xs md:text-sm font-medium flex items-center gap-2">
                      <Send className="h-3 w-3 md:h-4 md:w-4 text-sky-500" />
                      Email Body
                    </Label>
                    <div className="rounded-lg border-2 border-input flex-1 flex flex-col focus-within:border-primary/50 transition-colors overflow-hidden">
                      <div className="flex items-center gap-1 border-b bg-muted/30 p-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleFormat('bold');
                          }}
                        >
                          <Bold className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleFormat('italic');
                          }}
                        >
                          <Italic className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleFormat('underline');
                          }}
                        >
                          <Underline className="h-4 w-4" />
                        </Button>
                        <div className="w-px h-4 bg-border mx-1" />
                        <Button
                          variant="ghost"
                          size="sm"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleFormat('insertUnorderedList');
                          }}
                        >
                          <List className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handleFormat('insertOrderedList');
                          }}
                        >
                          <ListOrdered className="h-4 w-4" />
                        </Button>
                      </div>
                      <div
                        ref={editorRef}
                        contentEditable={!isGenerating}
                        onInput={handleBodyChange}
                        className={`p-4 md:p-6 text-sm md:text-base ring-offset-background focus-visible:outline-none min-h-[200px] md:min-h-[280px] flex-1 overflow-y-auto leading-relaxed ${isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                        style={{ minHeight: '200px' }}
                        data-placeholder={isGenerating ? "AI is writing your personalized email..." : "Your personalized email content will appear here..."}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 md:gap-3 pt-2 md:pt-4">
                    <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
                      <Button
                        size="default"
                        className="flex-1 group"
                        onClick={handleAnalyzeEmail}
                        disabled={isPending || (!subject.trim() && !body.trim())}
                      >
                        {isAnalyzing ? (
                          <>
                            <Loader className="mr-2 h-4 w-4 animate-spin" />
                            <span className="text-sm">Analyzing...</span>
                          </>
                        ) : (
                          <>
                            <BarChart3 className="mr-2 h-4 w-4 group-hover:animate-bounce-subtle" />
                            <span className="text-sm">Analyze (Ctrl+E)</span>
                          </>
                        )}
                      </Button>
                      <Button
                        size="default"
                        variant="outline"
                        className="flex-1 border-2 hover:border-primary/50"
                        onClick={handleCopyEmail}
                        disabled={!subject.trim() && !body.trim()}
                      >
                        <Copy className="mr-2 h-4 w-4" />
                        <span className="text-sm">Copy</span>
                      </Button>
                    </div>
                    
                    {/* Export Options */}
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border hover:border-primary/50"
                        onClick={() => handleExportEmail('txt')}
                        disabled={!subject.trim() && !body.trim()}
                      >
                        <FileText className="mr-2 h-3 w-3" />
                        <span className="text-xs">Export TXT</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border hover:border-primary/50"
                        onClick={() => handleExportEmail('html')}
                        disabled={!subject.trim() && !body.trim()}
                      >
                        <Download className="mr-2 h-3 w-3" />
                        <span className="text-xs">Export HTML</span>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border hover:border-primary/50"
                        onClick={() => handleExportEmail('json')}
                        disabled={!subject.trim() && !body.trim()}
                      >
                        <Download className="mr-2 h-3 w-3" />
                        <span className="text-xs">Export JSON</span>
                      </Button>
                    </div>

                    {(subject || body) && (
                      <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg animate-fade-in">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-green-700 font-medium">
                          Email draft ready for analysis
                        </span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="icon"
                className="rounded-full shadow-lg"
                onClick={() => setShowKeyboardShortcuts(true)}
              >
                <Keyboard className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Keyboard Shortcuts (Ctrl+/)</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {(isAnalyzing || effectivenessResult) && (
        <div className="container pb-8">
          <Card className="border-2 transition-all duration-500 animate-fade-in-up">
            <CardHeader className="pb-6">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-sky-500/10">
                  <BarChart3 className="h-5 w-5 text-sky-500" />
                </div>
                <div>
                  <div className="text-xl font-bold">AI Effectiveness Analysis</div>
                  <div className="text-sm text-muted-foreground font-normal">
                    Step 3: Optimize before sending
                  </div>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isAnalyzing && (
                <div className="space-y-6 animate-fade-in">
                  <div className="flex items-center gap-3 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-primary animate-pulse" />
                    <div>
                      <div className="font-medium text-sm">AI is analyzing your email...</div>
                      <div className="text-xs text-muted-foreground">
                        Calculating effectiveness score and engagement predictions
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <SkeletonCard />
                    <SkeletonCard />
                  </div>
                  <SkeletonCard />
                </div>
              )}
              {effectivenessResult && (
                <div className="space-y-8 animate-scale-in">
                  <div className="text-center p-6 bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl border border-primary/20">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {effectivenessResult.effectivenessScore}/100
                    </div>
                    <p className="text-muted-foreground">Overall Effectiveness Score</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="border-2 border-blue-500/20 bg-blue-500/5">
                      <CardContent className="p-6 text-center">
                        <div className="p-3 bg-blue-500/10 rounded-full w-fit mx-auto mb-4">
                          <MailOpen className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                          {effectivenessResult.engagementPredictions.openRate.toFixed(1)}%
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">Open Rate</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-green-500/20 bg-green-500/5">
                      <CardContent className="p-6 text-center">
                        <div className="p-3 bg-green-500/10 rounded-full w-fit mx-auto mb-4">
                          <MousePointerClick className="h-6 w-6 text-green-600" />
                        </div>
                        <div className="text-3xl font-bold text-green-600 mb-2">
                          {effectivenessResult.engagementPredictions.clickThroughRate.toFixed(1)}%
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">Click Rate</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-purple-500/20 bg-purple-500/5">
                      <CardContent className="p-6 text-center">
                        <div className="p-3 bg-purple-500/10 rounded-full w-fit mx-auto mb-4">
                          <Target className="h-6 w-6 text-purple-600" />
                        </div>
                        <div className="text-3xl font-bold text-purple-600 mb-2">
                          {effectivenessResult.engagementPredictions.conversionRate.toFixed(1)}%
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">Reply Rate</p>
                      </CardContent>
                    </Card>
                  </div>
                  <Card className="border-2 border-orange-500/20 bg-orange-500/5">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Lightbulb className="h-5 w-5 text-orange-500" />
                        AI Suggestions
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {effectivenessResult.suggestions.slice(0, 3).map((suggestion, index) => {
                          const Icon = suggestionIcons[index % suggestionIcons.length];
                          return (
                            <div
                              key={index}
                              className="flex items-start gap-4 p-4 bg-background border rounded-lg"
                            >
                              <div className="h-8 w-8 rounded-full bg-orange-500/10 text-orange-600 flex items-center justify-center">
                                <Icon className="h-4 w-4" />
                              </div>
                              <p className="text-sm font-medium">{suggestion}</p>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
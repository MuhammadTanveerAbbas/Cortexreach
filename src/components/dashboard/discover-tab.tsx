'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sparkles,
  BookOpen,
  MessageSquare,
  GitBranch,
  ExternalLink,
  Lightbulb,
  Video,
  FileText,
  TrendingUp,
  Zap,
  Star,
  Rocket,
} from 'lucide-react';

const features = [
  {
    title: 'Advanced Analytics Dashboard',
    description: 'Track your email generation patterns and optimize your outreach strategy.',
    date: 'Jan 2025',
    badge: 'New',
    badgeColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
    icon: TrendingUp,
  },
  {
    title: 'Premium Plan Launch',
    description: 'Unlock 50 generations per day and advanced features with our new Premium plan.',
    date: 'Jan 2025',
    badge: 'Hot',
    badgeColor: 'bg-gradient-to-r from-orange-500 to-red-500',
    icon: Rocket,
  },
  {
    title: 'Export Options',
    description: 'Export your emails in TXT, HTML, and JSON formats for easy integration.',
    date: 'Dec 2024',
    badge: 'Updated',
    badgeColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    icon: Zap,
  },
];

const tutorials = [
  {
    title: 'Getting Started with CortexReach',
    description: 'Learn the basics of generating personalized cold emails',
    type: 'Video',
    duration: '5 min',
    icon: Video,
  },
  {
    title: 'Writing Effective Prospect Research',
    description: 'Best practices for gathering and inputting prospect information',
    type: 'Article',
    duration: '8 min read',
    icon: FileText,
  },
  {
    title: 'Optimizing Email Effectiveness',
    description: 'How to use AI suggestions to improve your email performance',
    type: 'Guide',
    duration: '10 min read',
    icon: BookOpen,
  },
  {
    title: 'Advanced Personalization Techniques',
    description: 'Take your cold outreach to the next level with these pro tips',
    type: 'Article',
    duration: '12 min read',
    icon: TrendingUp,
  },
];

const changelog = [
  {
    version: '3.0.0',
    date: 'January 2025',
    changes: [
      'Added comprehensive analytics dashboard',
      'Introduced Premium subscription tier',
      'Redesigned navigation with pill-style tabs',
      'Added saved emails management',
      'Improved AI generation speed',
    ],
  },
  {
    version: '2.5.0',
    date: 'December 2024',
    changes: [
      'Added export functionality (TXT, HTML, JSON)',
      'Improved email effectiveness scoring',
      'Added keyboard shortcuts',
      'Enhanced mobile responsiveness',
    ],
  },
  {
    version: '2.0.0',
    date: 'November 2024',
    changes: [
      'Launched AI powered prospect research',
      'Added email effectiveness predictions',
      'Introduced rich text editor',
      'Added auto-save drafts feature',
    ],
  },
];

export default function DiscoverTab() {
  return (
    <div className="space-y-4 md:space-y-8 animate-fade-in">
      {/* What's New */}
      <div>
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
          <div className="p-1.5 md:p-2 rounded-lg bg-gradient-to-br from-primary/20 to-sky-500/20">
            <Sparkles className="h-4 w-4 md:h-6 md:w-6 text-primary" />
          </div>
          <h2 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-primary to-sky-500 bg-clip-text text-transparent">
            What's New
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Card
                key={i}
                className="border-2 hover:border-primary/50 transition-all hover:shadow-xl hover:scale-105 duration-300 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-20 md:w-32 h-20 md:h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-bl-full" />
                <CardHeader className="pb-2 md:pb-4">
                  <div className="flex items-start justify-between gap-2 relative">
                    <div className="flex items-start gap-2 md:gap-3 flex-1">
                      <div className="p-1.5 md:p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        <Icon className="h-4 w-4 md:h-5 md:w-5 text-primary" />
                      </div>
                      <CardTitle className="text-sm md:text-lg leading-tight">{feature.title}</CardTitle>
                    </div>
                    <Badge
                      className={`${feature.badgeColor} text-white border-0 shadow-lg font-bold px-2 md:px-3 py-0.5 md:py-1 animate-pulse text-xs`}
                    >
                      {feature.badge}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-2 md:space-y-3 relative">
                  <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-2">
                    <Star className="h-2.5 w-2.5 md:h-3 md:w-3 text-yellow-500 fill-yellow-500" />
                    <span className="text-xs font-medium text-muted-foreground">{feature.date}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Tutorials & Guides */}
      <div>
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
          <div className="p-1.5 md:p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
            <BookOpen className="h-4 w-4 md:h-6 md:w-6 text-blue-500" />
          </div>
          <h2 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent">
            Tutorials & Guides
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-6">
          {tutorials.map((tutorial, i) => {
            const Icon = tutorial.icon;
            return (
              <Card
                key={i}
                className="border-2 hover:border-primary/50 transition-all group cursor-pointer hover:shadow-xl"
              >
                <CardHeader className="pb-2 md:pb-4">
                  <div className="flex items-start gap-3 md:gap-4">
                    <div className="p-2 md:p-3 rounded-xl bg-gradient-to-br from-primary/10 to-sky-500/10 group-hover:from-primary/20 group-hover:to-sky-500/20 transition-all">
                      <Icon className="h-4 w-4 md:h-6 md:w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-sm md:text-base mb-1 md:mb-2 group-hover:text-primary transition-colors">
                        {tutorial.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-xs">
                        <Badge
                          variant="outline"
                          className="bg-primary/5 border-primary/20 text-primary font-semibold text-xs"
                        >
                          {tutorial.type}
                        </Badge>
                        <span className="text-muted-foreground font-medium">{tutorial.duration}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs md:text-sm text-muted-foreground mb-2 md:mb-3 leading-relaxed">
                    {tutorial.description}
                  </p>
                  <Button variant="link" className="px-0 h-auto text-primary font-semibold text-xs md:text-sm">
                    Read More
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Feature Requests */}
      <Card className="border-2 border-primary/30 bg-gradient-to-br from-primary/10 via-sky-500/5 to-purple-500/10 hover:shadow-xl transition-all">
        <CardHeader className="pb-2 md:pb-4">
          <CardTitle className="flex items-center gap-2 md:gap-3 text-base md:text-xl">
            <div className="p-1.5 md:p-2 rounded-lg bg-gradient-to-br from-yellow-500/20 to-orange-500/20">
              <Lightbulb className="h-4 w-4 md:h-5 md:w-5 text-yellow-600" />
            </div>
            <span>Have a Feature Request?</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 md:space-y-4">
          <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
            We're always looking to improve CortexReach. Share your ideas and help shape the future
            of the platform!
          </p>
          <Button className="bg-gradient-to-r from-primary to-sky-500 hover:from-primary/90 hover:to-sky-500/90 shadow-lg text-xs md:text-sm">
            <MessageSquare className="mr-2 h-3 w-3 md:h-4 md:w-4" />
            Submit Feedback
          </Button>
        </CardContent>
      </Card>

      {/* Changelog */}
      <div>
        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
          <div className="p-1.5 md:p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <GitBranch className="h-4 w-4 md:h-6 md:w-6 text-purple-500" />
          </div>
          <h2 className="text-xl md:text-3xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            Changelog
          </h2>
        </div>
        <div className="space-y-3 md:space-y-6">
          {changelog.map((release, i) => (
            <Card key={i} className="border-2 hover:border-primary/50 transition-all hover:shadow-lg">
              <CardHeader className="pb-2 md:pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base md:text-xl font-bold">Version {release.version}</CardTitle>
                  <Badge
                    variant="outline"
                    className="bg-primary/5 border-primary/30 text-primary font-semibold px-2 md:px-3 py-0.5 md:py-1 text-xs"
                  >
                    {release.date}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 md:space-y-3">
                  {release.changes.map((change, j) => (
                    <li key={j} className="flex items-start gap-2 md:gap-3 text-xs md:text-sm">
                      <div className="mt-1 p-0.5 md:p-1 rounded-full bg-primary/10">
                        <div className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-primary" />
                      </div>
                      <span className="leading-relaxed">{change}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

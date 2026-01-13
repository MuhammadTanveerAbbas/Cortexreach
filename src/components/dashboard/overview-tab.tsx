'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  TrendingUp,
  Zap,
  Calendar,
  Crown,
  Lightbulb,
  ArrowRight,
  BarChart3,
  Mail,
  Clock,
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Link from 'next/link';

const tips = [
  { level: 'Beginner', tip: 'Start with clear, specific prospect details for better personalization' },
  { level: 'Advanced', tip: 'Include recent achievements or articles to show genuine research' },
  { level: 'Pro', tip: 'Test different subject line styles and track which get better responses' },
  { level: 'Beginner', tip: 'Keep emails under 150 words for higher engagement rates' },
  { level: 'Advanced', tip: 'Reference mutual connections or shared interests when possible' },
  { level: 'Pro', tip: 'Use the effectiveness score to A/B test your messaging approach' },
];

export default function OverviewTab() {
  const [currentTip, setCurrentTip] = useState(0);
  const [stats, setStats] = useState({
    totalGenerations: 0,
    todayUsage: 0,
    todayLimit: 5,
    monthlyUsage: 0,
    plan: 'Free',
  });

  const [usageData, setUsageData] = useState<{ date: string; count: number }[]>([]);
  const [recentActivity, setRecentActivity] = useState<any[]>([]);

  useEffect(() => {
    // Load stats from localStorage
    const savedEmails = JSON.parse(localStorage.getItem('cortexreach_emails') || '[]');
    const today = new Date().toDateString();
    const todayEmails = savedEmails.filter((e: any) => new Date(e.timestamp).toDateString() === today);
    
    // Generate last 30 days data
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (29 - i));
      const dateStr = date.toDateString();
      const count = savedEmails.filter((e: any) => new Date(e.timestamp).toDateString() === dateStr).length;
      return {
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        count,
      };
    });

    setStats({
      totalGenerations: savedEmails.length,
      todayUsage: todayEmails.length,
      todayLimit: 5,
      monthlyUsage: savedEmails.filter((e: any) => {
        const emailDate = new Date(e.timestamp);
        const now = new Date();
        return emailDate.getMonth() === now.getMonth() && emailDate.getFullYear() === now.getFullYear();
      }).length,
      plan: 'Free',
    });

    setUsageData(last30Days);
    setRecentActivity(savedEmails.slice(-5).reverse());

    // Rotate tips
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const usagePercentage = (stats.todayUsage / stats.todayLimit) * 100;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-2 hover:border-primary/50 transition-all">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Total Generations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalGenerations}</div>
            <p className="text-xs text-muted-foreground mt-1">All-time count</p>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary/50 transition-all">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Zap className="h-4 w-4" />
              Today's Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {stats.todayUsage}/{stats.todayLimit}
            </div>
            <div className="mt-2 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-sky-500 transition-all"
                style={{ width: `${Math.min(usagePercentage, 100)}%` }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:border-primary/50 transition-all">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.monthlyUsage}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              Monthly activity
            </p>
          </CardContent>
        </Card>

        <Card className="border-2 border-primary/50 bg-gradient-to-br from-primary/5 to-sky-500/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Crown className="h-4 w-4" />
              Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.plan}</div>
            <Button size="sm" variant="link" className="px-0 h-auto mt-1" asChild>
              <Link href="/pricing">Upgrade to Premium</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Usage Chart */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Usage Activity (Last 30 Days)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-xs" />
              <YAxis />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--background))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* AI Tips */}
        <Card className="border-2 border-orange-500/20 bg-gradient-to-br from-orange-500/5 to-yellow-500/5">
          <CardHeader className="pb-3 md:pb-4">
            <CardTitle className="flex items-center gap-2 text-base md:text-lg">
              <Lightbulb className="h-4 w-4 md:h-5 md:w-5 text-orange-500" />
              AI Tips & Best Practices
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 md:space-y-4">
            <div className="p-3 md:p-4 bg-background rounded-lg border-2 animate-fade-in min-h-[100px] flex flex-col justify-center">
              <Badge className="mb-2 w-fit text-xs">{tips[currentTip].level}</Badge>
              <p className="text-xs md:text-sm font-medium leading-relaxed">{tips[currentTip].tip}</p>
            </div>
            <div className="flex gap-1 justify-center">
              {tips.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all ${
                    i === currentTip ? 'w-8 bg-primary' : 'w-1.5 bg-muted'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="border-2">
          <CardHeader className="pb-3 md:pb-4">
            <CardTitle className="text-base md:text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 md:space-y-3">
            <Button className="w-full justify-between group" size="lg" asChild>
              <Link href="/dashboard?tab=tool">
                <span className="text-sm md:text-base">Start New Generation</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button className="w-full justify-between" size="lg" variant="outline" asChild>
              <Link href="/dashboard?tab=saved">
                <span className="text-sm md:text-base">View Saved Items</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            {stats.plan === 'Free' && (
              <Button
                className="w-full justify-between bg-gradient-to-r from-primary to-sky-500"
                size="lg"
                asChild
              >
                <Link href="/pricing">
                  <div className="flex items-center gap-2">
                    <Crown className="h-4 w-4" />
                    <span className="text-sm md:text-base">Upgrade Plan</span>
                  </div>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="border-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          {recentActivity.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Mail className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No activity yet. Start generating emails!</p>
              <Button className="mt-4" asChild>
                <Link href="/dashboard?tab=tool">Generate Your First Email</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentActivity.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-lg border hover:border-primary/50 transition-all"
                >
                  <div className="flex-1">
                    <p className="font-medium text-sm">{activity.subject || 'Untitled Email'}</p>
                    <p className="text-xs text-muted-foreground">
                      To: {activity.prospectName || 'Unknown'}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

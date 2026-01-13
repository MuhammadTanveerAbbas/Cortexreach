'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { LayoutDashboard, Wand2, Bookmark, Compass } from 'lucide-react';
import { DashboardHeader } from '@/components/dashboard-header';
import OverviewTab from '@/components/dashboard/overview-tab';
import ToolTab from '@/components/dashboard/tool-tab';
import SavedTab from '@/components/dashboard/saved-tab';
import DiscoverTab from '@/components/dashboard/discover-tab';
import { trackEvent } from '@/lib/analytics';

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'tool', label: 'Tool', icon: Wand2 },
  { id: 'saved', label: 'Saved', icon: Bookmark },
  { id: 'discover', label: 'Discover', icon: Compass },
];

export default function DashboardPage() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('overview');
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const tab = searchParams.get('tab');
    if (tab && tabs.some((t) => t.id === tab)) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    trackEvent.dashboardViewed(activeTab);
  }, [activeTab]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    trackEvent.dashboardViewed(tabId);
  };

  return (
    <>
      <DashboardHeader />
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Pill Navigation */}
      <div className={`sticky top-16 z-40 bg-background/95 backdrop-blur-xl border-b border-border/50 shadow-md transition-transform duration-300 ${
        isNavVisible ? 'translate-y-0' : '-translate-y-full'
      }`}>
        <div className="container py-2 md:py-3">
          <nav className="flex justify-center">
            <div className="inline-flex items-center gap-0.5 md:gap-1 p-0.5 md:p-1 rounded-full bg-muted/30 backdrop-blur-sm border border-border/50 shadow-lg">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    className={`flex items-center gap-1 md:gap-2 px-2.5 md:px-5 py-1.5 md:py-2.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground shadow-md scale-105'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5 md:h-4 md:w-4" />
                    <span className="hidden xs:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      <div className="container py-4 md:py-8 px-3 md:px-4">
        {activeTab === 'overview' && <OverviewTab />}
        {activeTab === 'tool' && <ToolTab />}
        {activeTab === 'saved' && <SavedTab />}
        {activeTab === 'discover' && <DiscoverTab />}
      </div>
      </div>
    </>
  );
}

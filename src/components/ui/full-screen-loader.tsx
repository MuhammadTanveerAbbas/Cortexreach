"use client";

import Logo from "../logo";

export function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        {/* Animated Logo */}
        <div className="relative">
          <Logo className="h-16 w-16 text-sky-500 animate-pulse" style={{ animationDuration: '1.5s' }} />
          <div className="absolute inset-0 h-16 w-16 rounded-full border-2 border-sky-500/20 animate-ping" />
          <div className="absolute inset-2 h-12 w-12 rounded-full border border-sky-500/40 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        
        {/* Loading Text */}
        <div className="text-center space-y-2">
          <div className="text-lg font-semibold text-foreground animate-pulse">
            CortexReach
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Loading</span>
            <div className="flex gap-1">
              <div className="w-1 h-1 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1 h-1 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <div className="w-1 h-1 bg-sky-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-sky-500 to-sky-600 rounded-full animate-pulse" style={{ width: '60%' }} />
        </div>
      </div>
    </div>
  );
}

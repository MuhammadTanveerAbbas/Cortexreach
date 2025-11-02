
"use client";

import Logo from "../logo";

export function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <Logo className="h-20 w-20 animate-pulse" style={{ animationDuration: '0.8s' }} />
    </div>
  );
}

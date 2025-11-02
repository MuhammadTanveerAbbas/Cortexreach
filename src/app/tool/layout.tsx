
"use client";

import Link from "next/link";
import Logo from "@/components/logo";
import { Github } from "lucide-react";


export default function ToolLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
          <div className="container flex h-16 items-center">
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <Logo className="h-6 w-6 text-primary" />
                <span className="font-bold">CortexReach</span>
              </Link>
            </div>
            <div className="flex-1 flex justify-center">
              
            </div>
            <div className="ml-auto flex items-center">
              <a 
                href="https://github.com/muhammadtanveerabbas" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Github className="h-5 w-5" />
                <span className="font-medium">GitHub</span>
              </a>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <div className="container mx-auto px-0 sm:px-4">
           {children}
          </div>
        </main>
      </div>
    </>
  );
}

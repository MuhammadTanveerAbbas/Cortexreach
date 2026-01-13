import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://cortexreach.vercel.app'),
  title: 'CortexReach - AI Powered Cold Outreach Revolution',
  description:
    'Transform cold outreach with AI. Research prospects, craft hyper personalized emails, and predict success rates. 3x higher reply rates, 89% time saved.',
  keywords: [
    'AI email',
    'cold outreach',
    'sales automation',
    'email personalization',
    'AI sales tool',
    'prospect research',
  ],
  authors: [{ name: 'Muhammad Tanveer Abbas', url: 'https://github.com/MuhammadTanveerAbbas' }],
  creator: 'Muhammad Tanveer Abbas',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cortexreach.vercel.app',
    title: 'CortexReach - AI Powered Cold Outreach Revolution',
    description: 'Transform cold outreach with AI. 3x higher reply rates, 89% time saved.',
    siteName: 'CortexReach',
    images: [
      {
        url: '/icon-512.svg',
        width: 512,
        height: 512,
        alt: 'CortexReach - AI Powered Cold Outreach',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CortexReach - AI Powered Cold Outreach',
    description: 'Transform cold outreach with AI. 3x higher reply rates, 89% time saved.',
    creator: '@m_tanveerabbas',
    images: ['/icon-512.svg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' },
      { url: '/icon-512.svg', sizes: '512x512', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.svg',
    apple: '/icon-192.svg',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
        <Toaster />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}

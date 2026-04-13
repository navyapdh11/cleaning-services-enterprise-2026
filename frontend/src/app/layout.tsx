import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/styles/globals.css';
import { Providers } from '@/components/layout/Providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'CleanPro Enterprise | Premium Cleaning Services',
  description: 'Professional cleaning services for residential and commercial spaces. Book online, track your service, and enjoy spotless results.',
  keywords: ['cleaning', 'services', 'residential', 'commercial', 'deep clean', 'office'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-neutral-50">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

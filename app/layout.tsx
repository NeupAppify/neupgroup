
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@neup/core/utils';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import { SessionProvider } from '@/components/providers/SessionProvider';
import RootLayoutShell from '@neup/components/layout/RootLayout';

export const metadata: Metadata = {
  title: {
    default: 'Neup.Group',
    template: '%s, Neup.Group',
  },
  description: "A venture studio building the next generation of digital ventures from Nepal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
        <script async src="http://localhost:26259/sdk.js" data-site-id="cmps3fj9b00000r9kldlycfiu" data-collect="pageview,clicks,scrolls,inputs,errors,performance,dom"></script>
      </head>
      <body className={cn('font-body antialiased')}>
        <ThemeProvider>
          <SessionProvider>
            <RootLayoutShell>
              <Header />
              <main>{children}</main>
              <Footer />
            </RootLayoutShell>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

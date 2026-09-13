
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import './globals.css';
import { getAnalyticsContext, logPageActivity } from '@/analytics';
import { cn } from '@neup/core/utils';
import { Header } from '@/components/shared/Header';
import { Footer } from '@/components/shared/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';
import RootLayoutShell from '@neup/components/layout/RootLayout';
import { SessionProvider } from '@neup/core/providers/session';
import { getServerSession } from '@/lib/session';

export const metadata: Metadata = {
  title: {
    default: 'Neup.Group',
    template: '%s, Neup.Group',
  },
  description: "A venture studio building the next generation of digital ventures from Nepal.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { contextId, signedContextId } = await getAnalyticsContext();
  const user = await getServerSession();
  const requestHeaders = await headers();
  const pagePath = requestHeaders.get("x-invoke-path") ?? requestHeaders.get("next-url") ?? "/";
  await logPageActivity(contextId, pagePath);



  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">

      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;650;700&display=swap" rel="stylesheet" />
      </head>

      <body className={cn('font-body antialiased')}>
        <ThemeProvider>
          <SessionProvider initialUser={user}>
            <RootLayoutShell>
              <Header />
              <main>{children}</main>
              <Footer />
            </RootLayoutShell>
          </SessionProvider>
        </ThemeProvider>

        <script
          src="https://neupgroup.com/analytics/bridge/sdk.v1/tracker"
          data-context-id={signedContextId}
          data-project-id="cmtx8ocvh0000bup9m18a09z1"
          data-collect="pageview"
          data-cookie-keys={"[]"}
          data-server-fields={JSON.stringify({})}
          defer
        />


      </body>
    </html>
  );
}

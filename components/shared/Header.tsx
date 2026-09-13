
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@neup/components/ui/button';
import { Userbar } from '@neup/components/element/userbar';
import { useSession } from '@neup/core/providers/session';
import { NeupLogo } from '@/components/NeupLogo';
import { ventures } from '@/components/sections/VenturePortfolio.config';
import { useTypewriter } from '@neup/core/hooks/useTypewritter';
import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { MobileNav } from './MobileNav';

export function Header() {
  const pathname = usePathname();
  const { user } = useSession();
  const [targetTitle, setTargetTitle] = useState('Neup.Group');
  const [headerLink, setHeaderLink] = useState('/');
  const [isLogoHovered, setIsLogoHovered] = useState(false);

  useEffect(() => {
    const getHeaderInfo = () => {
      if (pathname.startsWith('/clients')) {
        return { title: 'Neup.Clients', link: '/clients' };
      }

      // Find the venture whose link is the longest matching prefix of the current path
      const currentVenture = ventures
        .filter(v => v.link !== '/' && pathname.startsWith(v.link))
        .sort((a, b) => b.link.length - a.link.length)[0];

      if (currentVenture) {
        return { title: currentVenture.name, link: currentVenture.link };
      }

      // Default for home and other pages (including /case and /case/*)
      return { title: 'Neup.Group', link: '/' };
    };

    const { title, link } = getHeaderInfo();
    setTargetTitle(title);
    setHeaderLink(link);
  }, [pathname]);

  const animatedTitle = useTypewriter(targetTitle);

  const isHomePage = pathname === '/';
  const displayName = user?.displayName?.trim() || 'User';
  const secondaryText = user?.neupId?.trim() || user?.accountId?.trim() || '';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-white shadow-md shadow-[0_16px_40px_rgba(15,23,42,0.10)] backdrop-blur relative">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        {/* Left Section: Logo */}
        <div className="flex items-center">
          <div
            className="flex items-center space-x-2"
            onMouseEnter={() => !isHomePage && setIsLogoHovered(true)}
            onMouseLeave={() => setIsLogoHovered(false)}
          >
            <Link href="/" aria-label="Back to Neup Group Homepage" className={`relative h-6 w-6 ${isHomePage ? 'cursor-default' : ''}`}>
              <div className={`transition-opacity duration-300 ${isLogoHovered ? 'opacity-0' : 'opacity-100'}`}>
                <NeupLogo className="h-6 w-6 text-primary" />
              </div>
              {!isHomePage && (
                <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isLogoHovered ? 'opacity-100' : 'opacity-0'}`}>
                  <ArrowLeft className="h-6 w-6 text-primary" />
                </div>
              )}
            </Link>

            <Link href={headerLink}>
              <span className="font-bold sm:inline-block font-headline min-w-[150px]">
                {animatedTitle}
              </span>
            </Link>
          </div>
        </div>

        {/* Center Section: Navigation */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link
            href="/about/ventures"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Ventures
          </Link>
          <Link
            href="/#vision"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Vision
          </Link>
          <Link
            href="/about/team"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Team
          </Link>
          <Link
            href="/contact"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Contact
          </Link>
        </nav>

        {/* Right Section: Actions */}
        <div className="flex items-center justify-end space-x-2">
          <div className="hidden md:flex items-center space-x-2">
            <Link href="/account" aria-label="Open account">
              <Userbar
                displayName={displayName}
                displayImage={user?.displayImage}
                neupid={secondaryText}
              />
            </Link>
          </div>
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>
    </header>
  );
}

undefined

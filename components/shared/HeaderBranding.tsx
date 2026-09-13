'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NeupLogo } from '@/components/NeupLogo';
import { ventures } from '@/components/sections/VenturePortfolio.config';
import { useHeaderBranding } from '@/components/useLogoBranding';

export function HeaderBranding() {
  const pathname = usePathname();
  const [isLogoHovered, setIsLogoHovered] = useState(false);
  const isAccountPage = pathname === '/account' || pathname.startsWith('/account/');
  const previewHome = pathname !== '/' && isLogoHovered;

  useEffect(() => {
    setIsLogoHovered(false);
  }, [pathname]);

  const getHeaderInfo = () => {
    if (pathname === '/account' || pathname.startsWith('/account/')) {
      return { title: 'Neup.Account', link: '/account' };
    }
    if (pathname === '/clients' || pathname.startsWith('/clients/')) {
      return { title: 'Neup.Clients', link: '/clients' };
    }

    // Match the platform section, including platforms with an /about landing page.
    const currentVenture = ventures
      .filter(v => {
        const root = v.link.replace(/\/about$/, '');
        return root !== '/' && (pathname === root || pathname.startsWith(`${root}/`));
      })
      .sort((a, b) => b.link.length - a.link.length)[0];

    if (currentVenture) {
      return { title: currentVenture.name, link: currentVenture.link };
    }

    // Default for home and other pages (including /case and /case/*)
    return { title: 'Neup.Group', link: '/' };
  };

  const { title: targetTitle, link: headerLink } = getHeaderInfo();

  const { logoState, animatedTitle, animateLogo, brandingReady } = useHeaderBranding(
    pathname, isAccountPage ? 'account' : 'null', targetTitle, previewHome,
  );
  const isHomePage = pathname === '/';

  return (
    <div
      className="flex items-center space-x-1"
      style={{ visibility: brandingReady ? 'visible' : 'hidden' }}
    >
      <Link
        href="/"
        aria-label="Back to Neup Group Homepage"
        className={`relative h-[43px] w-[43px] ${isHomePage ? 'cursor-default' : ''}`}
        onMouseEnter={() => !isHomePage && setIsLogoHovered(true)}
        onMouseLeave={() => setIsLogoHovered(false)}
      >
        <div>
          <NeupLogo className="h-[43px] w-[43px] text-primary" state={logoState} animate={animateLogo} />
        </div>
      </Link>

      {/* Optical alignment with the artwork inside the padded SVG viewBox. */}
      <Link href={headerLink} className="relative top-[3px] sm:top-[2px]" aria-label={`Open ${targetTitle} homepage`}>
        <span className="text-lg sm:text-xl font-[650] tracking-[-0.05em] sm:inline-block font-headline min-w-[150px]">
          {animatedTitle}
        </span>
      </Link>
    </div>
  );
}

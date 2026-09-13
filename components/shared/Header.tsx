
'use client';

import Link from 'next/link';
import { Userbar } from '@neup/components/element/userbar';
import { useSession } from '@neup/core/providers/session';
import { MobileNav } from './MobileNav';
import { HeaderBranding } from './HeaderBranding';

export function Header() {
  const { user } = useSession();
  const displayName = user?.displayName?.trim() || 'User';
  const secondaryText = user?.neupId?.trim() || user?.accountId?.trim() || '';

  return (
    <header
      className="sticky top-0 z-40 w-full border-b border-border/40 shadow-md shadow-[0_16px_40px_rgba(15,23,42,0.10)] backdrop-blur relative"
      style={{ backgroundColor: 'var(--section-odd-background)' }}
    >
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        {/* Left Section: Logo */}
        <HeaderBranding />

        {/* Center Section: Navigation */}
        <nav className="hidden items-center gap-6 text-sm md:flex">
          <Link
            href="/about/ventures"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
          >
            Ventures
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

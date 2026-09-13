'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

type LogoState = 'null' | 'account';

/** Start each document at its route branding; animate subsequent in-app changes. */
export function useHeaderBranding(pathname: string, routeLogo: LogoState, routeTitle: string, previewHome: boolean) {
  const target = previewHome ? 'null' : routeLogo;
  const targetTitle = previewHome ? 'Neup.Group' : routeTitle;
  const [logo, setLogo] = useState<LogoState>(routeLogo);
  const [title, setTitle] = useState(routeTitle);
  const [animateLogo, setAnimateLogo] = useState(false);
  const [ready, setReady] = useState(false);
  const initialized = useRef(false);

  useLayoutEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    try {
      const pending = new URLSearchParams(sessionStorage.getItem('logo.navigation') ?? '');
      sessionStorage.removeItem('logo.navigation');
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      const age = Date.now() - Number(pending.get('time'));
      if (navigation?.type === 'navigate' && pending.get('destination') === window.location.href && age >= 0 && age < 10000) {
        setLogo(pending.get('current') === 'account' ? 'account' : 'null');
        setTitle(pending.get('title') || 'Neup.Group');
      }
    } catch {
      // Direct visits remain static if storage is unavailable.
    }
    setReady(true);
  }, []);

  useEffect(() => {
    // Capture ordinary same-tab links before a full document navigation unloads us.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = event.target instanceof Element ? event.target.closest('a[href]') : null;
      if (!(anchor instanceof HTMLAnchorElement) || anchor.hasAttribute('download')) return;
      const browsingTarget = anchor.getAttribute('target') || document.querySelector('base')?.target;
      if (browsingTarget && browsingTarget !== '_self') return;
      const destination = new URL(anchor.href, window.location.href);
      if (destination.origin !== window.location.origin || destination.href === window.location.href) return;
      try {
        sessionStorage.setItem('logo.navigation', new URLSearchParams({
          destination: destination.href, current: logo, title, time: String(Date.now()),
        }).toString());
      } catch {
        // Client-side route transitions still work without storage.
      }
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [logo, title]);

  useEffect(() => {
    // Client-side navigation has already retained the visible branding in React.
    try { sessionStorage.removeItem('logo.navigation'); } catch { /* Storage is optional. */ }
  }, [pathname]);

  useEffect(() => {
    if (!ready) return;
    try {
      sessionStorage.setItem('logo.state', new URLSearchParams({
        pathname, current: logo, target, title, targetTitle,
      }).toString());
    } catch {
      // Hover and navigation animations still work without browser storage.
    }
  }, [ready, pathname, logo, target, title, targetTitle]);

  useEffect(() => {
    if (!ready) return;
    // Initial branding is already in place; later target changes animate.
    const timer = window.setTimeout(() => {
      setAnimateLogo(true);
      setLogo(target);
    }, 32);
    return () => window.clearTimeout(timer);
  }, [ready, target]);

  useEffect(() => {
    if (!animateLogo || title === targetTitle) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setTitle(targetTitle);
      return;
    }
    let shared = 0;
    while (shared < title.length && title[shared] === targetTitle[shared]) shared++;
    const deleting = title.length > shared;
    const timer = window.setTimeout(() => {
      setTitle(deleting ? title.slice(0, -1) : targetTitle.slice(0, title.length + 1));
    }, deleting ? 50 : 70);
    return () => window.clearTimeout(timer);
  }, [animateLogo, targetTitle, title]);

  return { logoState: logo, animatedTitle: title, animateLogo, brandingReady: ready };
}

'use client';

import { useEffect, useId, useState, type ReactNode, type SVGProps } from 'react';

export const LOGO_TRANSITION_MS = 180;

function LogoIcon({ active, children, offset = 0, animate }: { animate: boolean; active: boolean; children: ReactNode; offset?: number }) {
  const [present, setPresent] = useState(active);
  const [motion, setMotion] = useState({ active, animate: false });

  // Render the initial route's artwork in place; animate only later state changes.
  if (motion.active !== active) {
    setMotion({ active, animate });
  }

  useEffect(() => {
    if (active) {
      setPresent(true);
      return;
    }
    // Also clean up when animation events are unavailable (e.g. a hidden tab).
    const timeout = window.setTimeout(() => setPresent(false),
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : LOGO_TRANSITION_MS);
    return () => window.clearTimeout(timeout);
  }, [active]);

  if (!active && (!present || !animate)) return null;

  return (
    <g
      className="neup-logo-object"
      data-motion={animate && motion.animate ? (active ? 'enter' : 'exit') : 'idle'}
      aria-hidden="true"
      onAnimationEnd={() => { if (!active) setPresent(false); }}
    >
      <g transform={`translate(0 ${offset})`}>{children}</g>
    </g>
  );
}

export type NeupLogoState = 'null' | 'dot' | 'account';

/** The NeupGroup logo with route-aware dot/account branding states. */
export function NeupLogo({ title = 'NeupGroup logo', state = 'null', animate = true, ...props }: SVGProps<SVGSVGElement> & { title?: string; state?: NeupLogoState; animate?: boolean }) {
  const titleId = useId();
  return (
    <svg
      data-logo-state={state}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-labelledby={titleId}
      {...props}
    >
      <title id={titleId}>{title}</title>
      <style>{`
        .neup-logo-object { animation-duration: ${LOGO_TRANSITION_MS}ms; animation-timing-function: ease-out; animation-fill-mode: both; }
        .neup-logo-object[data-motion='enter'] { animation-name: neup-logo-enter; }
        .neup-logo-object[data-motion='exit'] { animation-name: neup-logo-exit; }
        @keyframes neup-logo-enter {
          from { opacity: 0; transform: translateX(-140px); }
          50% { opacity: 1; transform: translateX(-70px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes neup-logo-exit {
          from { opacity: 1; transform: translateX(0); }
          50% { opacity: 1; transform: translateX(-70px); }
          to { opacity: 0; transform: translateX(-140px); }
        }
        @media (prefers-reduced-motion: reduce) { .neup-logo-object { animation-duration: 0ms; } }
      `}</style>
      <path
        d="M96 124C96 108.536 108.536 96 124 96H317.6C371.724 96 415.6 139.876 415.6 194V407.6C415.6 412.018 412.018 415.6 407.6 415.6H104C99.582 415.6 96 412.018 96 407.6V124Z"
        fill="white" stroke="white" strokeWidth="8"
      />
      <rect x="106" y="260.844" width="145.044" height="145.044" rx="4" fill="#595959" stroke="white" strokeWidth="8" />
      <rect x="260.844" y="260.844" width="145.156" height="145.156" rx="4" fill="#595959" stroke="white" strokeWidth="8" />
      <path d="M106 130C106 116.745 116.745 106 130 106H309.888C362.907 106 405.888 148.981 405.888 202V247.044C405.888 249.253 404.097 251.044 401.888 251.044H110C107.791 251.044 106 249.253 106 247.044V130Z" fill="#595959" stroke="white" strokeWidth="8" />
      <LogoIcon animate={animate} active={state === 'dot'}><circle cx="333" cy="382" r="32" fill="#2b2b2b" stroke="white" strokeWidth="12" /></LogoIcon>
      <LogoIcon animate={animate} active={state === 'account'} offset={-4}><path d="M337.8 167c38.6 0 69.5 32.2 69.5 71.6s-31 71.6-69.5 71.6-69.5-32.2-69.5-71.6 31-71.6 69.5-71.6Z" fill="#2b2b2b" stroke="white" strokeWidth="11" /><path d="M337.8 308.4c59.4 0 109.3 39.4 116.6 91.5.8 8.1-28.8 18.6-100.6 18.6s-132-6-132-18.6c7.3-52.1 57.2-91.5 116-91.5Z" fill="#2b2b2b" stroke="white" strokeWidth="11" /></LogoIcon>
    </svg>
  );
}

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="header-glass sticky top-0 z-50" data-scrolled={isScrolled}>
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="font-display text-lg font-bold tracking-tight text-neutral-950 transition-colors hover:text-neutral-700"
        >
          Dev Toolbox
        </Link>

        <nav aria-label="Main navigation">
          <ul className="flex items-center gap-3">
            <li>
              <Link
                href="/about"
                className="rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-900 transition hover:border-neutral-300 hover:shadow-sm"
              >
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

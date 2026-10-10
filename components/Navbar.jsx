'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Menu, X, Radio, Phone } from 'lucide-react';
import { CHURCH, NAV_LINKS, SOCIAL_LINKS } from '../lib/site-config';
import Logo from './Logo';
import Button from './ui/Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-40 bg-brand-600 text-white">
      <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between gap-6 px-5 sm:px-8 lg:h-[72px]">
        <Logo />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Main">
          {NAV_LINKS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={clsx(
                  'relative py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] transition-colors',
                  active ? 'text-white' : 'text-white/80 hover:text-white'
                )}
              >
                {item.name}
                <span
                  className={clsx(
                    'absolute -bottom-0.5 left-0 h-[2px] bg-white transition-all',
                    active ? 'w-full' : 'w-0'
                  )}
                />
              </Link>
            );
          })}
          <Button variant="white" size="md" href="/give" className="ml-2">
            Give
          </Button>
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open menu"
          aria-expanded={isOpen}
          className="flex h-10 w-10 items-center justify-center border border-white/40 lg:hidden"
        >
          <Menu size={20} />
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink-950 px-5 pb-8 lg:hidden">
          <div className="flex h-16 shrink-0 items-center justify-between">
            <Logo onClick={() => setIsOpen(false)} />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center border border-white/40"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="mt-4 flex flex-1 flex-col" aria-label="Mobile">
            {NAV_LINKS.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    'border-b border-white/10 py-4 font-display text-3xl uppercase',
                    active ? 'text-brand-300' : 'text-white'
                  )}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>

          <div className="mt-10 flex flex-col gap-3">
            <Button variant="solid" size="lg" href="/give" onClick={() => setIsOpen(false)}>
              Give
            </Button>
            <Button variant="outlineLight" size="lg" href={SOCIAL_LINKS.mixlr} external>
              <Radio size={14} />
              Join Live Online
            </Button>
            <Button variant="outlineLight" size="lg" href={CHURCH.phoneHref}>
              <Phone size={14} />
              {CHURCH.phone}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}

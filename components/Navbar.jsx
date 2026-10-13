'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Menu, X, Radio, Phone, Volume2 } from 'lucide-react';
import { CHURCH, NAV_LINKS, SOCIAL_LINKS } from '../lib/site-config';
import { useLiveStatus } from '../hooks/useLiveStatus';
import { playLiveMixlr } from '../lib/sermons';
import Logo from './Logo';
import Button from './ui/Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isLive, activeService } = useLiveStatus();

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
          {isLive && (
            <button
              type="button"
              onClick={() => playLiveMixlr()}
              className="ml-2 inline-flex items-center gap-2 rounded-full border border-red-300 bg-red-600 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-red-900/50 transition-all hover:bg-red-500 hover:scale-105"
              title="Service in session — Click to listen live on Mixlr"
            >
              <span className="live-dot !h-2 !w-2" />
              <span>Live Now</span>
            </button>
          )}
          <Button variant="white" size="md" href="/give" className="ml-2">
            Give
          </Button>
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Open menu"
          aria-expanded={isOpen}
          className="relative flex h-10 w-10 items-center justify-center border border-white/40 lg:hidden"
        >
          {isLive && (
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="live-dot !h-3 !w-3" />
            </span>
          )}
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

          {/* Mobile Live Service Card */}
          {isLive && activeService && (
            <div className="mt-3 mb-2 rounded-xl border border-red-500/50 bg-gradient-to-br from-red-950/80 via-ink-900 to-black p-4 text-white shadow-xl">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-wider text-red-300">
                  <span className="live-dot !h-2 !w-2" />
                  Service In Progress
                </span>
                <span className="text-[0.62rem] uppercase tracking-wider text-white/60">Live from Ile-Ife</span>
              </div>
              <p className="mt-1 font-display text-2xl uppercase tracking-wide text-white">
                {activeService.name}
              </p>
              <p className="text-xs text-white/70">
                Apostle Oluwafunminiyi Olufisayo ministering
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  playLiveMixlr();
                }}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg bg-red-600 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md hover:bg-red-500 transition-colors"
              >
                <Volume2 size={15} />
                Listen Live on Mixlr
              </button>
            </div>
          )}

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
            <Button
              variant={isLive ? 'solid' : 'outlineLight'}
              size="lg"
              onClick={() => {
                setIsOpen(false);
                playLiveMixlr();
              }}
              className={isLive ? '!bg-red-600 hover:!bg-red-500 border-none' : ''}
            >
              {isLive ? <Volume2 size={15} /> : <Radio size={14} />}
              {isLive ? 'Listen Live Now' : 'Join Live Online'}
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

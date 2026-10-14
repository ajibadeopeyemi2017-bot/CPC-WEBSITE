'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import { Menu, X, ChevronDown, ArrowRight, Heart, Volume2 } from 'lucide-react';
import { CHURCH, NAV_LINKS } from '../lib/site-config';
import { useLiveStatus } from '../hooks/useLiveStatus';
import { playLiveMixlr } from '../lib/sermons';
import Logo from './Logo';
import Button from './ui/Button';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState(null);
  const pathname = usePathname();
  const { isLive, activeService } = useLiveStatus();
  const leaveTimerRef = useRef(null);

  useEffect(() => {
    setIsOpen(false);
    setHoveredNav(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleMouseEnter = (name) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setHoveredNav(name);
  };

  const handleMouseLeave = () => {
    leaveTimerRef.current = setTimeout(() => {
      setHoveredNav(null);
    }, 180);
  };

  return (
    <header className="sticky top-0 z-40 bg-brand-600 text-white shadow-md">
      <div className="mx-auto flex h-16 w-full max-w-[1240px] items-center justify-between gap-4 px-5 sm:px-8 lg:h-[72px]">
        <Logo />

        <div className="flex items-center gap-3 lg:gap-6">
          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Main">
            {NAV_LINKS.map((item) => {
              const active = pathname === item.href;
              const isHovered = hoveredNav === item.name;

              return (
                <div
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.name)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href}
                    className={clsx(
                      'flex items-center gap-1 py-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] transition-colors',
                      active || isHovered ? 'text-white' : 'text-white/85 hover:text-white'
                    )}
                  >
                    <span>{item.name}</span>
                    <ChevronDown
                      size={11}
                      className={clsx(
                        'transition-transform duration-200 text-white/70',
                        isHovered && 'rotate-180 text-white'
                      )}
                    />
                    <span
                      className={clsx(
                        'absolute -bottom-0.5 left-0 h-[2px] bg-white transition-all duration-200',
                        active ? 'w-full' : isHovered ? 'w-full opacity-70' : 'w-0'
                      )}
                    />
                  </Link>

                  {/* Dropdown List Downward of Captions */}
                  {isHovered && item.sublinks && item.sublinks.length > 0 && (
                    <div
                      className="absolute top-full left-0 pt-1.5 z-50 w-44 sm:w-48 pointer-events-auto animate-in fade-in slide-in-from-top-1 duration-150"
                      onMouseEnter={() => handleMouseEnter(item.name)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="overflow-hidden rounded-md border border-ink-950/15 bg-white text-ink-950 shadow-xl ring-1 ring-black/5 py-0.5">
                        {item.sublinks.map((sub, idx) => (
                          <Link
                            key={idx}
                            href={sub.href}
                            onClick={() => setHoveredNav(null)}
                            className="group/caption flex items-center justify-between px-3 py-1.5 text-left text-[0.7rem] font-semibold text-ink-950 transition-colors hover:bg-[#eef7ea] hover:text-[#0f4a17] border-b border-ink-950/5 last:border-none"
                          >
                            <span className="truncate">{sub.title}</span>
                            <ArrowRight
                              size={10}
                              className="shrink-0 ml-1.5 text-brand-600 opacity-0 -translate-x-1 transition-all group-hover/caption:opacity-100 group-hover/caption:translate-x-0"
                            />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {isLive && (
              <button
                type="button"
                onClick={() => playLiveMixlr()}
                className="inline-flex items-center gap-2 rounded-full border border-red-300 bg-red-600 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white shadow-lg shadow-red-900/50 transition-all hover:bg-red-500 hover:scale-105"
                title="Service in session — Click to listen live on Mixlr"
              >
                <span className="live-dot !h-2 !w-2" />
                <span>Live Now</span>
              </button>
            )}
          </nav>

          {/* Top-Right Hand Corner Dedicated GIVE Bar */}
          <Link
            href="/give"
            className="group relative inline-flex items-center gap-1.5 rounded-full border-2 border-white bg-white px-4 py-1.5 sm:px-5 sm:py-2 text-[0.72rem] font-black uppercase tracking-[0.2em] shadow-md transition-all hover:bg-brand-50 hover:shadow-xl hover:scale-105 active:scale-95"
            style={{ color: '#0a3510', backgroundColor: '#ffffff' }}
            aria-label="Give online or bank transfer"
          >
            <Heart size={14} className="fill-[#0a3510] text-[#0a3510]" />
            <span className="font-black text-[#0a3510]" style={{ color: '#0a3510' }}>
              GIVE
            </span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Open menu"
            aria-expanded={isOpen}
            className="relative flex h-10 w-10 items-center justify-center rounded-md border border-white/40 lg:hidden text-white"
          >
            {isLive && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="live-dot !h-3 !w-3" />
              </span>
            )}
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex flex-col overflow-y-auto bg-ink-950 px-5 pb-8 lg:hidden text-white">
          <div className="flex h-16 shrink-0 items-center justify-between">
            <Logo onClick={() => setIsOpen(false)} />
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center border border-white/40 rounded-md text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mobile Live Service Banner */}
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

          {/* Clean Mobile Links with Captions */}
          <nav className="mt-4 flex flex-1 flex-col" aria-label="Mobile">
            {NAV_LINKS.map((item) => {
              const active = pathname === item.href;

              return (
                <div key={item.href} className="border-b border-white/10 py-3">
                  <Link
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={clsx(
                      'font-display text-2xl uppercase tracking-wide block',
                      active ? 'text-brand-300 font-bold' : 'text-white hover:text-brand-300'
                    )}
                  >
                    {item.name}
                  </Link>

                  {/* Downward list of captions */}
                  {item.sublinks && (
                    <div className="mt-2 pl-3 space-y-1.5 border-l border-brand-500/40">
                      {item.sublinks.map((sub, i) => (
                        <Link
                          key={i}
                          href={sub.href}
                          onClick={() => setIsOpen(false)}
                          className="block text-xs text-white/80 hover:text-brand-300 py-0.5"
                        >
                          &bull; {sub.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Mobile Actions */}
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href="/give"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 rounded-lg bg-white py-3 text-xs font-black uppercase tracking-[0.2em] text-[#0a3510] shadow-lg"
              style={{ color: '#0a3510', backgroundColor: '#ffffff' }}
            >
              <Heart size={16} className="fill-[#0a3510] text-[#0a3510]" />
              <span>GIVE ONLINE &bull; TITHE &amp; OFFERING</span>
            </Link>

            <Button
              variant={isLive ? 'solid' : 'outlineLight'}
              size="lg"
              onClick={() => {
                setIsOpen(false);
                playLiveMixlr();
              }}
              className={isLive ? '!bg-red-600 hover:!bg-red-500 border-none' : ''}
            >
              {isLive ? <Volume2 size={15} /> : null}
              {isLive ? 'Listen Live Now' : 'Join Live Online'}
            </Button>

            <a
              href={CHURCH.phoneHref}
              className="flex items-center justify-center gap-2 rounded border border-white/30 py-3 text-xs font-semibold text-white hover:bg-white/10"
            >
              <span>Direct Line: {CHURCH.phone}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

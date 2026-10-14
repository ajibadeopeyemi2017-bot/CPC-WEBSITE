'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Radio, ChevronRight, X, Volume2, Sparkles } from 'lucide-react';
import { CHURCH, SOCIAL_LINKS } from '../lib/site-config';
import { useLiveStatus } from '../hooks/useLiveStatus';
import { playLiveMixlr } from '../lib/sermons';

const announcements = [
  {
    tag: 'MINISTERIAL CONFERENCE',
    title: 'Kingdom Young Ministers Conference (KYMC 2026)',
    subtitle: 'Theme: "The Man That the Lord Will Work With (Part Two)" | Sept 24th - 26th, 2026',
    link: '/connect#conferences',
    linkText: 'Register / Details'
  },
  {
    tag: 'AGOTE 2025 CONFERENCE',
    title: 'Annual Gathering of the Eagles (AGOTE 2025)',
    subtitle: 'Theme: "DIVINE FLOW" | Dec 19th - 20th, 2025 with Apostle Goke Ogunleye & Apostle Oluwafunminiyi',
    link: '/connect#conferences',
    linkText: 'Explore Summit'
  },
  {
    tag: 'YOUTH & DESTINY',
    title: 'Realised Destiny Summit (RDS 2025)',
    subtitle: 'Theme: "Running The Race That Is Set Before You" (Heb. 12:1) | May 22nd - 24th, 2025',
    link: '/connect#conferences',
    linkText: 'Discover RDS'
  },
  {
    tag: 'MINISTERIAL ACADEMY',
    title: 'AMITES: Acquiring Ministers\' Teaching School',
    subtitle: `Modular training for five-fold ministers & church workers | Inquiries: ${CHURCH.phone}`,
    link: '/connect#conferences',
    linkText: 'Enroll Now'
  },
  {
    tag: 'WEEKLY BROADCAST',
    title: 'Connect Online via Mixlr & Facebook',
    subtitle: 'Sunday 8:00 AM | Tuesday School of Prayer 5:00 PM | Thursday Revelational Hour 5:00 PM',
    link: SOCIAL_LINKS.mixlr,
    external: true,
    linkText: 'Listen Live'
  }
];

export default function AnnouncementTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { isLive, activeService, isSimulated, toggleSimulation, mounted } = useLiveStatus();

  useEffect(() => {
    if (isLive) return; // don't cycle announcements when live broadcast takes over
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [isLive]);

  if (!isVisible) return null;

  // 1. LIVE SERVICE IN PROGRESS (Takeover Bar)
  if (isLive && activeService) {
    return (
      <aside
        role="region"
        aria-label="Live Service Broadcast Banner"
        className="relative z-50 bg-gradient-to-r from-[#3b0808] via-ink-950 to-[#072d0e] border-b border-red-500/40 text-white shadow-lg"
      >
        <div className="mx-auto flex min-h-[42px] w-full max-w-[1240px] flex-wrap items-center justify-between gap-x-4 gap-y-2 px-4 py-1.5 text-[0.68rem] sm:px-8">
          {/* Left: On-Air badge + Soundwave + Service Name */}
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex items-center gap-1.5 rounded-full bg-red-600/90 px-2.5 py-0.5 font-bold uppercase tracking-[0.2em] text-white shadow-sm shadow-red-500/50">
              <span className="live-dot !h-2 !w-2" />
              On Air
            </span>

            {/* Soundwave equalizer bars */}
            <span className="hidden sm:inline-flex items-center gap-[3px] h-4 px-1" aria-hidden="true">
              <span className="soundwave-bar" />
              <span className="soundwave-bar" />
              <span className="soundwave-bar" />
              <span className="soundwave-bar" />
            </span>

            <span className="truncate text-white">
              <strong className="font-semibold text-white tracking-wide">
                {activeService.name} is Live Now
              </strong>
              <span className="hidden md:inline text-white/80">
                {' '}— Streaming from the Potter&apos;s Altar, Ile-Ife
              </span>
            </span>

            {isSimulated && (
              <button
                type="button"
                onClick={() => toggleSimulation(false)}
                title="Click to exit test preview mode"
                className="hidden lg:inline-flex items-center gap-1 rounded border border-amber-400/40 bg-amber-500/20 px-2 py-0.5 text-[0.62rem] text-amber-200 hover:bg-amber-500/30"
              >
                <Sparkles size={10} />
                Demo Preview Mode (Exit)
              </button>
            )}
          </div>

          {/* Right: 1-Click Listen Live Button + Mixlr Web + Close */}
          <div className="flex shrink-0 items-center gap-2.5 sm:gap-4">
            <button
              type="button"
              onClick={() => playLiveMixlr()}
              className="inline-flex items-center gap-1.5 rounded bg-brand-500 hover:bg-brand-400 px-3 py-1 font-bold uppercase tracking-[0.16em] text-white transition-all shadow-md shadow-brand-900/50 hover:scale-[1.02]"
            >
              <Volume2 size={13} className="text-brand-100" />
              <span>Listen Live</span>
            </button>

            <a
              href={SOCIAL_LINKS.mixlr}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 font-bold uppercase tracking-[0.16em] text-white/75 hover:text-white"
            >
              <Radio size={12} />
              <span>Mixlr App</span>
            </a>

            <button
              type="button"
              onClick={() => setIsVisible(false)}
              aria-label="Dismiss banner"
              className="text-white/60 hover:text-white"
            >
              <X size={15} />
            </button>
          </div>
        </div>
      </aside>
    );
  }

  // 2. STANDARD ROTATING ANNOUNCEMENTS (When service is not currently in session)
  const current = announcements[currentIndex];

  const linkClasses =
    'inline-flex items-center gap-1.5 font-bold uppercase tracking-[0.18em] text-brand-300 hover:text-white';

  return (
    <aside
      role="region"
      aria-label="Church Announcements Banner"
      className="relative z-50 bg-ink-950 text-white"
    >
      <div className="mx-auto flex h-9 w-full max-w-[1240px] items-center justify-between gap-4 px-5 text-[0.68rem] sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <span className="hidden shrink-0 font-bold uppercase tracking-[0.25em] text-brand-300 sm:inline">
            {current.tag}
          </span>
          <span className="hidden h-3 w-px bg-white/20 sm:block" />
          <span className="truncate text-white/85">
            <strong className="font-semibold text-white">{current.title}</strong>
            <span className="hidden md:inline"> — {current.subtitle}</span>
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {current.external ? (
            <a href={current.link} target="_blank" rel="noopener noreferrer" className={linkClasses}>
              <Radio size={12} />
              {current.linkText}
            </a>
          ) : (
            <Link href={current.link} className={linkClasses}>
              {current.linkText}
              <ChevronRight size={12} />
            </Link>
          )}

          <button
            type="button"
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss announcement"
            className="text-white/50 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}

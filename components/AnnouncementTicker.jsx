'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Radio, ChevronRight, X } from 'lucide-react';
import { CHURCH, SOCIAL_LINKS } from '../lib/site-config';

const announcements = [
  {
    tag: 'MINISTERIAL CONVOCATION',
    title: 'Kingdom Young Ministers Conference (KYMC 2026)',
    subtitle: 'Theme: "The Man That the Lord Will Work With (Part Two)" | Sept 24th - 26th, 2026',
    link: '/connect#conferences',
    linkText: 'Register / Details'
  },
  {
    tag: 'AGOTE 2025 CONVOCATION',
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  if (!isVisible) return null;

  const current = announcements[currentIndex];

  const linkClasses =
    'inline-flex items-center gap-1.5 font-bold uppercase tracking-[0.18em] text-brand-300 hover:text-white';

  return (
    <div className="relative z-50 bg-ink-950 text-white">
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
    </div>
  );
}

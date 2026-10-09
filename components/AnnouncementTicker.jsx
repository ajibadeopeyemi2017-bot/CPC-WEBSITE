'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Radio, Sparkles, ChevronRight, X, Calendar } from 'lucide-react';

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
    subtitle: 'Modular training for five-fold ministers & church workers | Inquiries: 0814 863 7261',
    link: '/connect#conferences',
    linkText: 'Enroll Now'
  },
  {
    tag: 'WEEKLY BROADCAST',
    title: 'Connect Online via Mixlr & Facebook',
    subtitle: 'Sunday 8:00 AM | Tuesday School of Prayer 5:00 PM | Thursday Revelational Hour 5:00 PM',
    link: 'https://mixlr.com/christ-the-potter-church',
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

  return (
    <div style={{
      background: 'linear-gradient(90deg, #060c1a 0%, #0d6338 50%, #060c1a 100%)',
      color: '#ffffff',
      fontSize: '0.85rem',
      padding: '8px 16px',
      borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
      position: 'relative',
      zIndex: 50
    }}>
      <div className="cpc-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', overflow: 'hidden' }}>
          <span style={{
            background: 'rgba(212, 175, 55, 0.2)',
            border: '1px solid #d4af37',
            color: '#f5d77f',
            padding: '2px 8px',
            borderRadius: '9999px',
            fontSize: '0.7rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            whiteSpace: 'nowrap',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Sparkles size={11} />
            {current.tag}
          </span>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            <strong style={{ color: '#ffffff', fontWeight: 600 }}>{current.title}:</strong>
            <span style={{ color: 'rgba(255, 255, 255, 0.85)' }}>{current.subtitle}</span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
          {current.external ? (
            <a
              href={current.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: '#f5d77f',
                fontWeight: 600,
                textDecoration: 'underline',
                fontSize: '0.8rem'
              }}
            >
              <Radio size={13} className="text-gold" />
              {current.linkText}
            </a>
          ) : (
            <Link
              href={current.link}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                color: '#f5d77f',
                fontWeight: 600,
                fontSize: '0.8rem'
              }}
            >
              {current.linkText}
              <ChevronRight size={13} />
            </Link>
          )}

          <button
            onClick={() => setIsVisible(false)}
            aria-label="Dismiss announcement"
            style={{
              color: 'rgba(255,255,255,0.6)',
              padding: '2px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}

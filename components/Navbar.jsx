'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Radio,
  MapPin,
  Calendar,
  Heart,
  ChevronDown,
  Clock,
  Sparkles,
  PhoneCall
} from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Watch & Sermons', href: '/sermons' },
  { name: 'Connect & Ministries', href: '/connect' },
  { name: 'Online Giving', href: '/give' },
  { name: 'Salvation & Prayer', href: '/salvation' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [campusDropdown, setCampusDropdown] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          background: isScrolled ? 'rgba(6, 12, 26, 0.95)' : 'rgba(11, 21, 40, 0.98)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          transition: 'all 0.3s ease',
          boxShadow: isScrolled ? '0 10px 30px rgba(0,0,0,0.3)' : 'none'
        }}
      >
        {/* Top Mini Bar with Service Times & Campus */}
        <div style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
          padding: '6px 0',
          fontSize: '0.8rem',
          color: 'rgba(255, 255, 255, 0.75)'
        }}>
          <div className="cpc-container" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            {/* Campus selector */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{ position: 'relative', cursor: 'pointer' }}
                onClick={() => setCampusDropdown(!campusDropdown)}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: '#ffffff',
                  fontWeight: 600
                }}>
                  <MapPin size={13} style={{ color: '#d4af37' }} />
                  <span>Main Auditorium: Fajuyi Road, Ile-Ife</span>
                  <ChevronDown size={13} />
                </div>

                {campusDropdown && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '8px',
                    width: '280px',
                    background: '#0f1e38',
                    border: '1px solid rgba(212, 175, 55, 0.3)',
                    borderRadius: '10px',
                    padding: '12px',
                    boxShadow: '0 12px 30px rgba(0,0,0,0.5)',
                    zIndex: 100
                  }}>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      Auditorium &amp; Online Broadcasts
                    </p>
                    <div style={{ padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', marginBottom: '6px' }}>
                      <strong style={{ color: '#ffffff', display: 'block', fontSize: '0.85rem' }}>Ile-Ife Main Auditorium</strong>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>76B PHCN Office (Upper Floor), Off Fajuyi Rd</span>
                    </div>
                    <div style={{ padding: '8px', background: 'rgba(255,255,255,0.03)', borderRadius: '6px' }}>
                      <strong style={{ color: '#d4af37', display: 'block', fontSize: '0.85rem' }}>Online Live Broadcast</strong>
                      <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)' }}>Mixlr &amp; Facebook Live Broadcast</span>
                    </div>
                  </div>
                )}
              </div>

              <div style={{ display: 'none', md: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={13} style={{ color: '#159b56' }} />
                <span>Sunday Service: 8:00 AM | Midweek: Tue & Thu 5:00 PM</span>
              </div>
            </div>

            {/* Helpline & Mixlr link */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <a
                href="tel:08148637261"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontSize: '0.8rem'
                }}
              >
                <PhoneCall size={12} style={{ color: '#d4af37' }} />
                <span>0814 863 7261</span>
              </a>
              <span style={{ opacity: 0.3 }}>|</span>
              <span style={{ color: '#f5d77f', fontWeight: 600 }}>OSOM Ministries</span>
            </div>
          </div>
        </div>

        {/* Main Nav Bar */}
        <div className="cpc-container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '12px',
          paddingBottom: '12px',
          gap: '20px'
        }}>
          {/* Logo Brand */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '14px', textDecoration: 'none' }}>
            <div style={{
              width: '46px',
              height: '46px',
              position: 'relative',
              borderRadius: '10px',
              background: '#ffffff',
              padding: '4px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}>
              <Image
                src="/images/logo-icon.png"
                alt="Christ The Potter Church Emblem"
                width={38}
                height={38}
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
            <div>
              <div style={{
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '1.25rem',
                letterSpacing: '-0.02em',
                lineHeight: 1.1
              }}>
                Christ The Potter
              </div>
              <div style={{
                fontSize: '0.72rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#d4af37',
                fontWeight: 700
              }}>
                CHURCH
              </div>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav style={{
            display: 'none',
            lg: 'flex',
            alignItems: 'center',
            gap: '24px'
          }} className="desktop-nav">
            {navLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    color: active ? '#f5d77f' : 'rgba(255, 255, 255, 0.85)',
                    fontWeight: active ? 700 : 500,
                    fontSize: '0.92rem',
                    transition: 'color 0.2s ease',
                    position: 'relative',
                    padding: '6px 0'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#f5d77f')}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.color = 'rgba(255, 255, 255, 0.85)';
                  }}
                >
                  {item.name}
                  {active && (
                    <span style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      width: '100%',
                      height: '2px',
                      background: 'var(--gold-gradient)',
                      borderRadius: '2px'
                    }} />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions: Watch Live & Plan a Visit */}
          <div style={{ display: 'none', sm: 'flex', alignItems: 'center', gap: '12px' }} className="desktop-actions">
            <a
              href="https://mixlr.com/christ-the-potter-church"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-outline-white"
              style={{ padding: '8px 14px', fontSize: '0.85rem' }}
            >
              <span className="live-dot" />
              <span>Watch Live</span>
            </a>

            <Link
              href="/plan-a-visit"
              className="btn btn-sm btn-primary"
              style={{ padding: '9px 18px', fontSize: '0.85rem' }}
            >
              <Calendar size={14} />
              <span>Plan Your Visit</span>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Navigation Menu"
            style={{
              color: '#ffffff',
              padding: '8px',
              borderRadius: '8px',
              background: 'rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            className="mobile-toggle"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 35,
          background: 'rgba(6, 12, 26, 0.98)',
          backdropFilter: 'blur(20px)',
          padding: '90px 24px 32px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          overflowY: 'auto',
          animation: 'fadeIn 0.25s ease'
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{
              paddingBottom: '16px',
              borderBottom: '1px solid rgba(255,255,255,0.1)',
              marginBottom: '8px'
            }}>
              <span style={{ fontSize: '0.8rem', color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>
                Christ The Potter Church Menu
              </span>
            </div>

            {navLinks.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: active ? '#f5d77f' : '#ffffff',
                    fontSize: '1.2rem',
                    fontWeight: active ? 700 : 500,
                    padding: '8px 0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid rgba(255,255,255,0.05)'
                  }}
                >
                  <span>{item.name}</span>
                  {active && <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#d4af37' }} />}
                </Link>
              );
            })}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '32px' }}>
            <Link
              href="/plan-a-visit"
              onClick={() => setIsOpen(false)}
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Calendar size={18} />
              Plan Your Visit
            </Link>

            <a
              href="https://mixlr.com/christ-the-potter-church"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="btn btn-outline-white"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <Radio size={18} className="text-gold" />
              Listen / Watch Live Stream
            </a>

            <a
              href="tel:08148637261"
              className="btn btn-outline-white"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <PhoneCall size={18} style={{ color: '#159b56' }} />
              <span>Call Helpline: 0814 863 7261</span>
            </a>

            <div style={{ textAlign: 'center', marginTop: '12px', color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem' }}>
              Main Auditorium: 76B PHCN Office (Upper Floor), Off Fajuyi Road, Ile-Ife
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 992px) {
          .desktop-nav {
            display: flex !important;
          }
          .mobile-toggle {
            display: none !important;
          }
        }
        @media (max-width: 991px) {
          .desktop-nav {
            display: none !important;
          }
          .desktop-actions {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}

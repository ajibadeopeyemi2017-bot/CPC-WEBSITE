import Link from 'next/link';
import Image from 'next/image';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Radio,
  Facebook,
  Youtube,
  Heart,
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      background: '#060c1a',
      color: 'rgba(255, 255, 255, 0.8)',
      borderTop: '1px solid rgba(212, 175, 55, 0.2)',
      marginTop: 'auto',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative top accent glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '2px',
        background: 'linear-gradient(90deg, transparent, #d4af37, #159b56, transparent)'
      }} />

      <div className="cpc-container" style={{ paddingTop: '64px', paddingBottom: '40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Column 1: Brand & Ministry Mandate */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                background: '#ffffff',
                padding: '4px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '42px',
                height: '42px'
              }}>
                <Image
                  src="/images/logo-icon.png"
                  alt="Christ The Potter Church"
                  width={34}
                  height={34}
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div>
                <h3 style={{ color: '#ffffff', fontSize: '1.2rem', fontWeight: 800, lineHeight: 1.1 }}>
                  Christ The Potter
                </h3>
                <span style={{ color: '#d4af37', fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.15em' }}>
                  CHURCH
                </span>
              </div>
            </div>

            <p style={{
              fontSize: '0.92rem',
              lineHeight: 1.6,
              color: 'rgba(255, 255, 255, 0.7)',
              marginBottom: '20px'
            }}>
              &quot;Teaching men to walk in the reality of who Christ is.&quot; A vibrant prophetic and apostolic assembly dedicated to spiritual depth, righteous character, and kingdom destiny.
            </p>

            <div style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '12px 16px',
              borderRadius: '10px'
            }}>
              <span style={{ color: '#d4af37', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '4px' }}>
                Ministry Arm
              </span>
              <p style={{ fontSize: '0.85rem', color: '#ffffff', margin: 0, fontWeight: 500 }}>
                Oluwafunminiyi Samson Olufisayo Ministries (OSOM)
              </p>
            </div>
          </div>

          {/* Column 2: Service Times & Venue */}
          <div>
            <h4 style={{
              color: '#ffffff',
              fontSize: '1.05rem',
              fontWeight: 700,
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Clock size={18} style={{ color: '#159b56' }} />
              Worship With Us
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem' }}>
              <div style={{ borderLeft: '2px solid #d4af37', paddingLeft: '12px' }}>
                <strong style={{ color: '#ffffff', display: 'block' }}>Sunday Worship Service</strong>
                <span style={{ color: '#d4af37', fontWeight: 600 }}>8:00 AM</span>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>Celebration, Word, Praise & Supernatural Impartation</p>
              </div>

              <div style={{ borderLeft: '2px solid #159b56', paddingLeft: '12px' }}>
                <strong style={{ color: '#ffffff', display: 'block' }}>Tuesday: School of Prayer</strong>
                <span style={{ color: '#159b56', fontWeight: 600 }}>5:00 PM</span>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>Intercession, Spiritual War, Deliverance</p>
              </div>

              <div style={{ borderLeft: '2px solid #60a5fa', paddingLeft: '12px' }}>
                <strong style={{ color: '#ffffff', display: 'block' }}>Thursday: Revelational Hour</strong>
                <span style={{ color: '#60a5fa', fontWeight: 600 }}>5:00 PM</span>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', margin: 0 }}>Deep Apostolic Doctrine & Systematic Exegesis</p>
              </div>
            </div>
          </div>

          {/* Column 3: Quick Links & Summits */}
          <div>
            <h4 style={{
              color: '#ffffff',
              fontSize: '1.05rem',
              fontWeight: 700,
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <Sparkles size={18} style={{ color: '#d4af37' }} />
              Quick Navigation
            </h4>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.9rem' }}>
              <li>
                <Link href="/plan-a-visit" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.8)' }}>
                  <ChevronRight size={14} style={{ color: '#d4af37' }} />
                  Plan Your First Visit
                </Link>
              </li>
              <li>
                <Link href="/about" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.8)' }}>
                  <ChevronRight size={14} style={{ color: '#d4af37' }} />
                  About Our Mandate & Pastors
                </Link>
              </li>
              <li>
                <Link href="/sermons" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.8)' }}>
                  <ChevronRight size={14} style={{ color: '#d4af37' }} />
                  Sermon Library & Live Media
                </Link>
              </li>
              <li>
                <Link href="/give" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.8)' }}>
                  <ChevronRight size={14} style={{ color: '#d4af37' }} />
                  Online Giving & Tithe Portal
                </Link>
              </li>
              <li>
                <Link href="/connect#conferences" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.8)' }}>
                  <ChevronRight size={14} style={{ color: '#d4af37' }} />
                  KYMC & AGOTE Conferences
                </Link>
              </li>
              <li>
                <Link href="/salvation" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'rgba(255,255,255,0.8)' }}>
                  <ChevronRight size={14} style={{ color: '#d4af37' }} />
                  Salvation & Prayer Request Hub
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Location, Contact & Broadcast */}
          <div>
            <h4 style={{
              color: '#ffffff',
              fontSize: '1.05rem',
              fontWeight: 700,
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <MapPin size={18} style={{ color: '#f59e0b' }} />
              Auditorium & Contact
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <MapPin size={18} style={{ color: '#d4af37', flexShrink: 0, marginTop: '2px' }} />
                <span>
                  <strong>Church Auditorium</strong><br />
                  76B, PHCN Office (Upper Floor), Off Fajuyi Road, Ile-Ife, Osun State, Nigeria
                </span>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Phone size={16} style={{ color: '#159b56', flexShrink: 0 }} />
                <span>
                  <a href="tel:08148637261" style={{ color: '#ffffff', fontWeight: 600 }}>0814 863 7261</a>
                </span>
              </div>

              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Mail size={16} style={{ color: '#d4af37', flexShrink: 0 }} />
                <span>
                  <a href="mailto:christthepotterchurch@gmail.com" style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem' }}>
                    christthepotterchurch@gmail.com
                  </a>
                </span>
              </div>

              <div style={{ marginTop: '10px' }}>
                <span style={{ fontSize: '0.8rem', color: '#d4af37', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                  ONLINE BROADCASTS
                </span>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <a
                    href="https://mixlr.com/christ-the-potter-church"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-white"
                    style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                  >
                    <Radio size={14} style={{ color: '#ef4444' }} />
                    Mixlr Live
                  </a>
                  <a
                    href="https://facebook.com/christthepotterchurch"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm btn-outline-white"
                    style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                  >
                    <Facebook size={14} style={{ color: '#3b82f6' }} />
                    Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          paddingTop: '28px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          textAlign: 'center',
          fontSize: '0.85rem',
          color: 'rgba(255, 255, 255, 0.5)'
        }}>
          <div>
            &copy; {new Date().getFullYear()} Christ The Potter Church. Set Man: Apostle &amp; Rev. (Mrs) Oluwafunminiyi Olufisayo. All rights reserved.
          </div>
          <div style={{ display: 'flex', gap: '20px', fontSize: '0.8rem' }}>
            <Link href="/about#doctrine" style={{ color: 'rgba(255,255,255,0.6)' }}>Statement of Faith</Link>
            <span>&bull;</span>
            <Link href="/plan-a-visit" style={{ color: 'rgba(255,255,255,0.6)' }}>Visitor Guide</Link>
            <span>&bull;</span>
            <Link href="/give" style={{ color: 'rgba(255,255,255,0.6)' }}>Secure Giving</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Calendar,
  Radio,
  MapPin,
  Clock,
  Sparkles,
  Play,
  Heart,
  ChevronRight,
  ShieldCheck,
  Users,
  Compass,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Car,
  Smile,
  Volume2
} from 'lucide-react';
import LiveCountdown from '../components/LiveCountdown';

const sermons = [
  {
    title: 'Cultivating the Habit of Seeking & Receiving Divine Help',
    series: 'Kingdom Principles',
    scripture: 'Hebrews 4:16',
    date: 'Recent Ministration',
    duration: '1h 15m',
    category: 'Prayer & Grace',
    tag: 'Trending'
  },
  {
    title: 'The Law of Going a Little Further',
    series: 'Destiny & Consecration',
    scripture: 'Matthew 26:39',
    date: 'Sunday Message',
    duration: '58m',
    category: 'Spiritual Growth',
    tag: 'Foundational'
  },
  {
    title: 'The Man That God Can Work With 2.0',
    series: 'Ministers Conference',
    scripture: '2 Timothy 2:21',
    date: 'KYMC Edition',
    duration: '1h 42m',
    category: 'Leadership & Calling',
    tag: 'Flagship'
  },
  {
    title: 'Understanding Prayer & Hindrances That Choke Effectiveness',
    series: 'School of Prayer',
    scripture: 'James 5:16',
    date: 'Tuesday Service',
    duration: '1h 05m',
    category: 'Intercession',
    tag: 'Midweek'
  }
];

export default function HomePage() {
  const openPlanVisit = () => {
    window.dispatchEvent(new CustomEvent('open-plan-visit-modal'));
  };

  const playSermon = (sermon) => {
    window.dispatchEvent(
      new CustomEvent('play-cpc-sermon', {
        detail: {
          title: sermon.title,
          minister: 'Apostle Oluwafunminiyi Olufisayo',
          category: sermon.category
        }
      })
    );
  };

  return (
    <div>
      {/* 1. CINEMATIC HERO SECTION */}
      <section style={{
        position: 'relative',
        background: 'linear-gradient(180deg, #060c1a 0%, #0b1528 50%, #0f1e38 100%)',
        color: '#ffffff',
        paddingTop: '80px',
        paddingBottom: '120px',
        overflow: 'hidden'
      }}>
        {/* Subtle background ambient gradients */}
        <div style={{
          position: 'absolute',
          top: '-150px',
          right: '-100px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14, 107, 60, 0.25) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(50px)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-100px',
          left: '-100px',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(60px)'
        }} />

        <div className="cpc-container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '50px'
          }}>
            {/* Left Column: Heading & Value Proposition */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                <span className="badge-gold">
                  <Sparkles size={13} />
                  Welcome to Christ The Potter Church
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.5rem, 5.2vw, 3.8rem)',
                fontWeight: 800,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
                marginBottom: '20px'
              }}>
                Teaching Men To Walk In The <span className="text-gold-gradient">Reality Of Christ</span>
              </h1>

              <p style={{
                fontSize: 'clamp(1.05rem, 1.8vw, 1.25rem)',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.85)',
                marginBottom: '36px',
                maxWidth: '560px'
              }}>
                A house of divine training in life and destiny. Rooted in deep biblical revelation, fervent prayer, and apostolic order under the ministry of <strong>Apostle Oluwafunminiyi Olufisayo</strong>.
              </p>

              {/* Dual Primary Call-to-Actions */}
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '16px',
                alignItems: 'center',
                marginBottom: '40px'
              }}>
                <button
                  onClick={openPlanVisit}
                  className="btn btn-primary btn-lg"
                  id="hero-plan-visit-btn"
                >
                  <Calendar size={18} />
                  <span>Plan Your Visit</span>
                </button>

                <a
                  href="https://mixlr.com/christ-the-potter-church"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline-white btn-lg"
                  id="hero-watch-live-btn"
                >
                  <span className="live-dot" />
                  <Radio size={18} style={{ color: '#d4af37' }} />
                  <span>Watch / Listen Live</span>
                </a>
              </div>

              {/* Quick Venue Badge */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '9999px',
                fontSize: '0.85rem',
                color: 'rgba(255, 255, 255, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <MapPin size={14} style={{ color: '#d4af37' }} />
                <span>Auditorium: PHCN Office (Upper Floor), Off Fajuyi Rd, Ile-Ife</span>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'relative',
                borderRadius: '28px',
                overflow: 'hidden',
                border: '1px solid rgba(212, 175, 55, 0.3)',
                boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
                background: '#070d1e'
              }}>
                <Image
                  src="/images/pastor-oluwafunminiyi.jpg"
                  alt="Apostle Oluwafunminiyi Olufisayo - Set Man of Christ The Potter Church"
                  width={600}
                  height={720}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'cover',
                    display: 'block'
                  }}
                  priority
                />

                {/* Glassmorphic overlay caption card */}
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  right: '16px',
                  background: 'rgba(6, 12, 26, 0.85)',
                  backdropFilter: 'blur(16px)',
                  padding: '16px 20px',
                  borderRadius: '16px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '12px'
                }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
                      Apostle Oluwafunminiyi Olufisayo
                    </h3>
                    <p style={{ fontSize: '0.78rem', color: '#d4af37', margin: 0, fontWeight: 600 }}>
                      Set Man &amp; President, OSOM Ministries
                    </p>
                  </div>

                  <Link
                    href="/about"
                    style={{
                      padding: '8px 14px',
                      borderRadius: '20px',
                      background: 'rgba(212, 175, 55, 0.2)',
                      border: '1px solid #d4af37',
                      color: '#f5d77f',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <span>Read Profile</span>
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>

              {/* Floating decorative badge */}
              <div style={{
                position: 'absolute',
                top: '-16px',
                right: '-16px',
                background: '#0e6b3c',
                color: '#ffffff',
                padding: '10px 18px',
                borderRadius: '9999px',
                boxShadow: '0 8px 24px rgba(14, 107, 60, 0.4)',
                fontSize: '0.82rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                border: '2px solid rgba(255, 255, 255, 0.2)'
              }}>
                <Sparkles size={14} />
                <span>God&apos;s Potter House</span>
              </div>
            </div>
          </div>

          {/* Service Live Countdown Bar placed directly under hero */}
          <div style={{ marginTop: '60px' }}>
            <LiveCountdown />
          </div>
        </div>
      </section>

      {/* 2. FRONT-AND-CENTER SERVICE TIMES & PHYSICAL LOCATION */}
      <section style={{
        padding: '90px 0',
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div className="cpc-container">
          <div className="section-header">
            <span className="badge-green">Join Our Weekly Fellowship</span>
            <h2>Worship Experience &amp; Times</h2>
            <p>
              &quot;Christ The Potter Church is a place you need to always be for your divine training in Life and Destiny.&quot;
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
            marginBottom: '40px'
          }}>
            {/* Sunday Celebration Service */}
            <div className="cpc-card" style={{ padding: '32px 28px', borderTop: '4px solid #d4af37' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(212, 175, 55, 0.15)',
                color: '#b89326',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Sparkles size={24} />
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#b89326', letterSpacing: '0.08em' }}>
                Every Lord&apos;s Day
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy-900)', margin: '6px 0 10px' }}>
                Sunday Celebration
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0e6b3c', fontWeight: 700, fontSize: '1.2rem', marginBottom: '14px' }}>
                <Clock size={18} />
                <span>8:00 AM WAT</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                Lively praise, deep apostolic teaching, prophetic declarations, and ministry to the sick and oppressed.
              </p>
              <button
                onClick={openPlanVisit}
                className="btn btn-sm btn-outline-dark"
                style={{ width: '100%' }}
              >
                Plan Sunday Visit
              </button>
            </div>

            {/* Tuesday: School of Prayer */}
            <div className="cpc-card" style={{ padding: '32px 28px', borderTop: '4px solid #0e6b3c' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(14, 107, 60, 0.12)',
                color: '#0e6b3c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <Radio size={24} />
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#0e6b3c', letterSpacing: '0.08em' }}>
                Every Tuesday Midweek
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy-900)', margin: '6px 0 10px' }}>
                School of Prayer
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0e6b3c', fontWeight: 700, fontSize: '1.2rem', marginBottom: '14px' }}>
                <Clock size={18} />
                <span>5:00 PM WAT</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                Intentional training in spiritual warfare, Travailing in the Spirit, and aligning with God&apos;s burden for nations and families.
              </p>
              <a
                href="https://mixlr.com/christ-the-potter-church"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline-dark"
                style={{ width: '100%' }}
              >
                Stream On Mixlr
              </a>
            </div>

            {/* Thursday: Revelational Hour */}
            <div className="cpc-card" style={{ padding: '32px 28px', borderTop: '4px solid #1e3a6c' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(30, 58, 108, 0.12)',
                color: '#1e3a6c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '20px'
              }}>
                <BookOpen size={24} />
              </div>
              <span style={{ fontSize: '0.78rem', fontWeight: 800, textTransform: 'uppercase', color: '#1e3a6c', letterSpacing: '0.08em' }}>
                Every Thursday Evening
              </span>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy-900)', margin: '6px 0 10px' }}>
                Revelational Hour
              </h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0e6b3c', fontWeight: 700, fontSize: '1.2rem', marginBottom: '14px' }}>
                <Clock size={18} />
                <span>5:00 PM WAT</span>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                Line-upon-line scriptural exegesis, sound doctrine, and character training for fruitful believers.
              </p>
              <Link
                href="/sermons"
                className="btn btn-sm btn-outline-dark"
                style={{ width: '100%' }}
              >
                Browse Teaching Archive
              </Link>
            </div>
          </div>

          {/* Physical Address Banner */}
          <div style={{
            background: 'linear-gradient(135deg, #0b1528 0%, #15294d 100%)',
            color: '#ffffff',
            borderRadius: '20px',
            padding: '32px 36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '24px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{
                width: '54px',
                height: '54px',
                borderRadius: '14px',
                background: 'rgba(212, 175, 55, 0.2)',
                color: '#f5d77f',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <MapPin size={26} />
              </div>
              <div>
                <span style={{ color: '#d4af37', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Main Worship Auditorium
                </span>
                <h4 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '4px 0' }}>
                  76B, PHCN Office (Upper Floor), Off Fajuyi Road, Ile-Ife
                </h4>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', margin: 0 }}>
                  Easy parking available on-site &bull; Welcoming hospitality team stationed at entrance
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href="https://maps.google.com/?q=PHCN+Office+Off+Fajuyi+Road+Ile+Ife"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <Compass size={16} />
                <span>Get GPS Directions</span>
              </a>
              <a
                href="tel:08148637261"
                className="btn btn-outline-white"
              >
                <span>Call Protocol: 0814 863 7261</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE "FIRST-TIME GUEST" FUNNEL: PLAN YOUR VISIT */}
      <section style={{
        padding: '90px 0',
        background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div className="cpc-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '60px'
          }}>
            <div>
              <span className="badge-gold" style={{ marginBottom: '12px' }}>
                <Sparkles size={13} />
                First Time At CPC?
              </span>
              <h2 style={{
                fontSize: '2.4rem',
                fontWeight: 800,
                color: 'var(--navy-900)',
                lineHeight: 1.2,
                marginTop: '10px',
                marginBottom: '18px'
              }}>
                You Belong Here. <br />We Can&apos;t Wait to Meet You!
              </h2>
              <p style={{
                fontSize: '1.05rem',
                lineHeight: 1.6,
                color: 'var(--text-muted)',
                marginBottom: '28px'
              }}>
                Walking into a church for the first time shouldn&apos;t feel intimidating. At Christ The Potter Church, from the moment you arrive, you will experience warm smiles, authentic family fellowship, and an encounter with God&apos;s presence.
              </p>

              {/* 4 Pillars of What to Expect */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: '#e6f7ee',
                    color: '#0e6b3c',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Car size={20} />
                  </div>
                  <div>
                    <strong style={{ color: 'var(--navy-900)', fontSize: '1rem', display: 'block' }}>Dedicated VIP Parking</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                      Easy, secure parking space within the PHCN office complex with traffic marshals to guide you.
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: '#fef9e7',
                    color: '#b89326',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Smile size={20} />
                  </div>
                  <div>
                    <strong style={{ color: 'var(--navy-900)', fontSize: '1rem', display: 'block' }}>Personal Hospitality Host</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                      When you plan your visit ahead, a friendly member will be waiting to greet you and escort you to a prime seat.
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <div style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '10px',
                    background: '#eff6ff',
                    color: '#2563eb',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <Users size={20} />
                  </div>
                  <div>
                    <strong style={{ color: 'var(--navy-900)', fontSize: '1rem', display: 'block' }}>Potter&apos;s Kids Church</strong>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.88rem' }}>
                      A secure, age-appropriate, faith-filled environment for children with bible stories, songs, and snacks.
                    </span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <button onClick={openPlanVisit} className="btn btn-primary btn-lg">
                  <Calendar size={18} />
                  <span>Reserve Your Visit Today</span>
                </button>
                <Link href="/plan-a-visit" className="btn btn-outline-dark btn-lg">
                  <span>Detailed Visitor Guide</span>
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>

            {/* Right Card: Quick interactive checklist */}
            <div className="cpc-card" style={{
              padding: '40px 32px',
              background: '#ffffff',
              boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
              borderRadius: '24px'
            }}>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '16px' }}>
                What Happens When You Visit?
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '28px' }}>
                {[
                  { step: '01', title: 'Arrival & Welcome', desc: 'Arrive 10 minutes before 8:00 AM. Our ushers welcome you with a warm handshake and guide you inside.' },
                  { step: '02', title: 'Praise & Worship', desc: 'Heartfelt, spirit-filled adoration leading into intimate communion with God.' },
                  { step: '03', title: 'Transforming Word', desc: 'Apostolic teaching from Apostle Oluwafunminiyi designed for real spiritual transformation.' },
                  { step: '04', title: 'Guest Reception', desc: 'A short 5-minute welcome reception after service where we give you a special gift pack.' }
                ].map((item) => (
                  <div key={item.step} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                    <div style={{
                      background: 'var(--cpc-green)',
                      color: '#ffffff',
                      fontSize: '0.75rem',
                      fontWeight: 800,
                      padding: '4px 8px',
                      borderRadius: '6px',
                      flexShrink: 0
                    }}>
                      {item.step}
                    </div>
                    <div>
                      <strong style={{ color: 'var(--navy-900)', fontSize: '0.95rem', display: 'block' }}>{item.title}</strong>
                      <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                padding: '16px',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <ShieldCheck size={24} style={{ color: '#0e6b3c', flexShrink: 0 }} />
                <div style={{ fontSize: '0.85rem', color: '#094a28' }}>
                  <strong>Zero Pressure Policy:</strong> We will never embarrass you, ask you to stand up alone, or solicit funds awkwardly. You are our honored guest!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SET MAN SPOTLIGHT: APOSTLE OLUWAFUNMINIYI OLUFISAYO */}
      <section style={{
        padding: '90px 0',
        background: '#0b1528',
        color: '#ffffff'
      }}>
        <div className="cpc-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '50px'
          }}>
            <div style={{ order: 2 }}>
              <span className="badge-gold" style={{ marginBottom: '12px' }}>
                <Sparkles size={12} />
                Leadership &amp; Set Man
              </span>
              <h2 style={{
                fontSize: '2.3rem',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.25,
                marginTop: '8px',
                marginBottom: '18px'
              }}>
                Apostle Oluwafunminiyi Samson Olufisayo
              </h2>
              <p style={{
                fontSize: '1rem',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.85)',
                marginBottom: '20px'
              }}>
                Apostle Oluwafunminiyi Olufisayo is an ordained minister of the gospel called and sent from God as a conference speaker and life trainer with an apostolic teaching and preaching mandate to teach men to walk in the reality of who Christ is.
              </p>
              <p style={{
                fontSize: '0.95rem',
                lineHeight: 1.7,
                color: 'rgba(255, 255, 255, 0.75)',
                marginBottom: '28px'
              }}>
                He is passionate about seeing the order of God established in the Church. His apostolic teaching has transformed countless ministers and believers across Nigeria. He is happily married to <strong>Rev. Mrs. Olamide Olufisayo</strong> who serves with him in ministry, and they reside in Ile-Ife blessed with two children, Aquila and Paul.
              </p>

              {/* Programs He Convenes */}
              <div style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                padding: '20px',
                borderRadius: '16px',
                marginBottom: '28px'
              }}>
                <span style={{ fontSize: '0.78rem', color: '#d4af37', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, display: 'block', marginBottom: '10px' }}>
                  Signature Annual Conferences &amp; Schools
                </span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={13} style={{ color: '#d4af37' }} />
                    <span>Annual Gathering of Eagles (AGOTE)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={13} style={{ color: '#d4af37' }} />
                    <span>Kingdom Young Ministers Conf. (KYMC)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={13} style={{ color: '#d4af37' }} />
                    <span>Realised Destiny Summit (RDS)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={13} style={{ color: '#d4af37' }} />
                    <span>Revelation of our Salvation (ROS)</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={13} style={{ color: '#d4af37' }} />
                    <span>AMITES Teaching School</span>
                  </div>
                </div>
              </div>

              <Link href="/about" className="btn btn-primary">
                <span>Explore Full Ministry Story</span>
                <ChevronRight size={16} />
              </Link>
            </div>

            <div style={{ order: 1 }}>
              <div style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
              }}>
                <Image
                  src="/images/pastor-portrait.jpg"
                  alt="Apostle Oluwafunminiyi Olufisayo"
                  width={540}
                  height={650}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. LATEST MEDIA / SERMON TEASER */}
      <section style={{
        padding: '90px 0',
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div className="cpc-container">
          <div style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '20px',
            marginBottom: '48px'
          }}>
            <div>
              <span className="badge-green">Word &amp; Doctrine</span>
              <h2 style={{ fontSize: '2.3rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: '8px' }}>
                Latest Apostolic Ministration
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1rem', margin: 0 }}>
                Invest in your spirit man: &quot;For man shall not live by bread alone...&quot;
              </p>
            </div>

            <Link href="/sermons" className="btn btn-outline-dark">
              <span>View Full Media Archive</span>
              <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {sermons.map((sermon, idx) => (
              <div
                key={idx}
                className="cpc-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '24px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      background: idx === 0 ? 'rgba(212, 175, 55, 0.15)' : 'rgba(14, 107, 60, 0.1)',
                      color: idx === 0 ? '#b89326' : '#0e6b3c'
                    }}>
                      {sermon.tag}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{sermon.duration}</span>
                  </div>

                  <h3 style={{
                    fontSize: '1.18rem',
                    fontWeight: 700,
                    color: 'var(--navy-900)',
                    lineHeight: 1.4,
                    marginBottom: '10px'
                  }}>
                    {sermon.title}
                  </h3>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                    <span>{sermon.series}</span>
                    <span>&bull;</span>
                    <span style={{ color: '#0e6b3c', fontWeight: 600 }}>{sermon.scripture}</span>
                  </div>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '16px'
                }}>
                  <button
                    onClick={() => playSermon(sermon)}
                    className="btn btn-sm btn-primary"
                    style={{ padding: '8px 16px' }}
                  >
                    <Play size={14} />
                    <span>Play Audio</span>
                  </button>

                  <a
                    href="https://mixlr.com/christ-the-potter-church"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.8rem',
                      color: 'var(--navy-700)',
                      fontWeight: 600
                    }}
                  >
                    <Radio size={14} style={{ color: '#ef4444' }} />
                    Mixlr
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FEATURED ANNUAL CONFERENCES & FLYERS */}
      <section style={{
        padding: '90px 0',
        background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div className="cpc-container">
          <div className="section-header">
            <span className="badge-gold">Kingdom Gatherings</span>
            <h2>Signature Annual Conferences and Schools</h2>
            <p>
              Special ordained seasons designed to impart grace, stir divine callings, unveil the Revelation of our Salvation, and empower kingdom leaders.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            marginBottom: '40px'
          }}>
            {/* KYMC 2026 */}
            <div className="cpc-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '260px', background: '#0b1528' }}>
                <Image
                  src="/images/flyer-kymc.jpg"
                  alt="Kingdom Young Ministers Conference 2026"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span className="badge-gold" style={{ fontSize: '0.72rem', marginBottom: '8px', alignSelf: 'flex-start' }}>
                  September 24 - 26, 2026
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-900)', margin: '4px 0 8px' }}>
                  Kingdom Young Ministers Conference (KYMC)
                </h3>
                <p style={{ color: '#0e6b3c', fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px' }}>
                  Theme: &quot;The Man That the Lord Will Work With (Part Two)&quot;
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '20px', flex: 1 }}>
                  Flagship annual convocation equipping young ministers and leaders across Nigeria to qualify for divine partnership and fulfill their kingdom assignments.
                </p>
                <Link href="/connect#conferences" className="btn btn-sm btn-outline-dark" style={{ width: '100%', justifyContent: 'center' }}>
                  Schedule &amp; Details
                </Link>
              </div>
            </div>

            {/* AGOTE 2025 */}
            <div className="cpc-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '260px', background: '#0b1528' }}>
                <Image
                  src="/images/flyer-agote.jpg"
                  alt="Annual Gathering of the Eagles 2025"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span className="badge-green" style={{ fontSize: '0.72rem', marginBottom: '8px', alignSelf: 'flex-start' }}>
                  December 19 - 20, 2025
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-900)', margin: '4px 0 8px' }}>
                  Annual Gathering of the Eagles (AGOTE)
                </h3>
                <p style={{ color: '#d4af37', fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px' }}>
                  Theme: &quot;DIVINE FLOW: Word, Prayers &amp; Impartation&quot;
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '20px', flex: 1 }}>
                  High-level convocation ministering alongside Apostle Goke Ogunleye (President, Alleluia to Jesus Ministries) for prophetic alignment and mantle impartation.
                </p>
                <Link href="/connect#conferences" className="btn btn-sm btn-outline-dark" style={{ width: '100%', justifyContent: 'center' }}>
                  Explore AGOTE Details
                </Link>
              </div>
            </div>

            {/* RDS 2025 */}
            <div className="cpc-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '260px', background: '#0b1528' }}>
                <Image
                  src="/images/flyer-rds-2025.jpg"
                  alt="Realised Destiny Summit 2025"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span className="badge-gold" style={{ fontSize: '0.72rem', marginBottom: '8px', alignSelf: 'flex-start' }}>
                  May 22 - 24, 2025
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-900)', margin: '4px 0 8px' }}>
                  Realised Destiny Summit (RDS 2025)
                </h3>
                <p style={{ color: '#0e6b3c', fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px' }}>
                  Theme: &quot;Running The Race That Is Set Before You&quot; (Heb. 12:1)
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '20px', flex: 1 }}>
                  Jeremiah 29:11 youth &amp; destiny summit teaching believers how to run according to kingdom rules so they finish crowned with eternal reward.
                </p>
                <Link href="/connect#conferences" className="btn btn-sm btn-outline-dark" style={{ width: '100%', justifyContent: 'center' }}>
                  Discover RDS Summit
                </Link>
              </div>
            </div>

            {/* ROS 2026 */}
            <div className="cpc-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '260px', background: '#0b1528' }}>
                <Image
                  src="/images/flyer-ros-2026.jpg"
                  alt="Revelation of Our Salvation 2026"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span className="badge-gold" style={{ fontSize: '0.72rem', marginBottom: '8px', alignSelf: 'flex-start' }}>
                  July 23 - 25, 2026
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-900)', margin: '4px 0 8px' }}>
                  Revelation of Our Salvation (ROS)
                </h3>
                <p style={{ color: '#0e6b3c', fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px' }}>
                  Theme: &quot;The Grace of God That Bringeth Salvation&quot; (Tit. 2:11)
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '20px', flex: 1 }}>
                  Unveiling the power of a surrendered life and the supreme redemptive provisions of Jesus Christ for every believer.
                </p>
                <Link href="/connect#conferences" className="btn btn-sm btn-outline-dark" style={{ width: '100%', justifyContent: 'center' }}>
                  ROS Programme Details
                </Link>
              </div>
            </div>

            {/* AMITES */}
            <div className="cpc-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '260px', background: '#0b1528' }}>
                <Image
                  src="/images/flyer-amites.jpg"
                  alt="AMITES Ministerial Academy"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span className="badge-green" style={{ fontSize: '0.72rem', marginBottom: '8px', alignSelf: 'flex-start' }}>
                  Executive Ministerial Academy
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-900)', margin: '4px 0 8px' }}>
                  AMITES: Acquiring Ministers&apos; School
                </h3>
                <p style={{ color: '#d4af37', fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px' }}>
                  For Five-Fold Ministers &amp; Church Workers
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '20px', flex: 1 }}>
                  Modular ministerial coaching designed for leaders seeking apostolic alignment, spiritual depth, and kingdom ministry discipline.
                </p>
                <a href="tel:08148637261" className="btn btn-sm btn-outline-dark" style={{ width: '100%', justifyContent: 'center' }}>
                  Enroll / Enquire: 0814 863 7261
                </a>
              </div>
            </div>

            {/* City Outreach */}
            <div className="cpc-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: '260px', background: '#0b1528' }}>
                <Image
                  src="/images/flyer-outreach.jpg"
                  alt="Ile-Ife Community Outreach"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span className="badge-gold" style={{ fontSize: '0.72rem', marginBottom: '8px', alignSelf: 'flex-start' }}>
                  October 10 - 11, 2025
                </span>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-900)', margin: '4px 0 8px' }}>
                  Ile-Ife Community Outreach
                </h3>
                <p style={{ color: '#0e6b3c', fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px' }}>
                  Theme: &quot;Walking in the Newness of Life&quot; (Rom. 6:4)
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '20px', flex: 1 }}>
                  Two power-charged evenings of mass salvation, miracles, and deliverance holding at Divine Promotion School Hall, Esindale Line 2, Iloro, Ile-Ife.
                </p>
                <Link href="/connect#conferences" className="btn btn-sm btn-outline-dark" style={{ width: '100%', justifyContent: 'center' }}>
                  Outreach Directions &amp; Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6B. APOSTOLIC WISDOM & EXCERPTS GALLERY */}
      <section style={{
        padding: '90px 0',
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0'
      }}>
        <div className="cpc-container">
          <div className="section-header">
            <span className="badge-gold">Words of Wisdom</span>
            <h2>Apostolic Wisdom &amp; Excerpts</h2>
            <p>
              Timeless kingdom truths and apostolic excerpts delivered by Apostle Oluwafunminiyi Olufisayo.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            <div className="cpc-card" style={{ overflow: 'hidden', background: '#0b1528' }}>
              <div style={{ position: 'relative', height: '320px' }}>
                <Image
                  src="/images/quote-purpose.jpg"
                  alt="Purpose vs Calling - Apostle Oluwafunminiyi"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div style={{ padding: '20px', background: '#ffffff' }}>
                <strong style={{ color: 'var(--navy-900)', fontSize: '1rem', display: 'block', marginBottom: '6px' }}>
                  Purpose vs. Calling
                </strong>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                  &quot;Purpose is the reason for your existence, the very backbone of what you&apos;re born to do, while Calling is how you&apos;re meant to do it.&quot;
                </p>
              </div>
            </div>

            <div className="cpc-card" style={{ overflow: 'hidden', background: '#0b1528' }}>
              <div style={{ position: 'relative', height: '320px' }}>
                <Image
                  src="/images/quote-accountability.jpg"
                  alt="Accountability in Destiny - Apostle Oluwafunminiyi"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div style={{ padding: '20px', background: '#ffffff' }}>
                <strong style={{ color: 'var(--navy-900)', fontSize: '1rem', display: 'block', marginBottom: '6px' }}>
                  The Race of Life &amp; Destiny
                </strong>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                  &quot;Everyone will give account of his race in life at the end whether you&apos;re aware of it or not.&quot; Run lawfully to receive the prize!
                </p>
              </div>
            </div>

            <div className="cpc-card" style={{ overflow: 'hidden', background: '#0b1528' }}>
              <div style={{ position: 'relative', height: '320px' }}>
                <Image
                  src="/images/quote-surrender.jpg"
                  alt="The Surrendered Life - Apostle Oluwafunminiyi"
                  fill
                  style={{ objectFit: 'contain' }}
                />
              </div>
              <div style={{ padding: '20px', background: '#ffffff' }}>
                <strong style={{ color: 'var(--navy-900)', fontSize: '1rem', display: 'block', marginBottom: '6px' }}>
                  The Living Sacrifice (Rom. 12:1-2)
                </strong>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                  &quot;The best sacrifice you can offer to God is your life. God wants us to remain a living sacrifice unto Him.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. QUICK ONLINE GIVING & KINGDOM PARTNERSHIP */}
      <section style={{
        padding: '90px 0',
        background: 'linear-gradient(135deg, #060c1a 0%, #0e6b3c 100%)',
        color: '#ffffff'
      }}>
        <div className="cpc-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '50px'
          }}>
            <div>
              <span className="badge-gold" style={{ marginBottom: '12px' }}>
                <Heart size={13} />
                Honour The Lord
              </span>
              <h2 style={{
                fontSize: '2.4rem',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.25,
                marginTop: '8px',
                marginBottom: '18px'
              }}>
                Kingdom Partnership &amp; Online Giving
              </h2>
              <p style={{
                fontSize: '1.05rem',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.85)',
                marginBottom: '28px'
              }}>
                &quot;Bring ye all the tithes into the storehouse, that there may be meat in mine house...&quot; (Mal. 3:10). Your faithful giving fuels the apostolic gospel, community outreaches, campus missions, and church building advancement.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
                <Link href="/give" className="btn btn-primary btn-lg">
                  <Heart size={18} />
                  <span>Give Securely Online</span>
                </Link>
                <Link href="/give#accounts" className="btn btn-outline-white btn-lg">
                  <span>View Bank Account Details</span>
                </Link>
              </div>
            </div>

            {/* Giving Channels Summary Box */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '24px',
              padding: '36px 32px',
              backdropFilter: 'blur(16px)'
            }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
                Supported Giving Channels
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px', marginBottom: '20px' }}>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: '10px' }}>
                  <strong style={{ color: '#d4af37', display: 'block', fontSize: '0.88rem' }}>Tithes &amp; Offerings</strong>
                  <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.7)' }}>Covenant worship</span>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: '10px' }}>
                  <strong style={{ color: '#159b56', display: 'block', fontSize: '0.88rem' }}>Mission Offerings</strong>
                  <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.7)' }}>City crusades &amp; outreach</span>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: '10px' }}>
                  <strong style={{ color: '#d4af37', display: 'block', fontSize: '0.88rem' }}>OSOM Partnership</strong>
                  <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.7)' }}>Conferences &amp; media</span>
                </div>
                <div style={{ background: 'rgba(0,0,0,0.25)', padding: '12px', borderRadius: '10px' }}>
                  <strong style={{ color: '#d4af37', display: 'block', fontSize: '0.88rem' }}>Building &amp; Seeds</strong>
                  <span style={{ fontSize: '0.74rem', color: 'rgba(255,255,255,0.7)' }}>Permanent sanctuary</span>
                </div>
              </div>

              {/* Official Bank Accounts */}
              <div style={{
                background: 'rgba(0,0,0,0.3)',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '16px'
              }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#f5d77f', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '6px' }}>
                  Direct Bank Wire Transfers (Zenith Bank)
                </span>
                <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.85)', marginBottom: '12px' }}>
                  You can send it into any of the acct below:
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.84rem' }}>
                  <div style={{ background: 'rgba(255,255,255,0.04)', padding: '10px 12px', borderRadius: '8px' }}>
                    <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.72rem' }}>CHURCH TITHES, OFFERINGS &amp; MISSIONS:</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                      <strong style={{ color: '#ffffff', letterSpacing: '0.05em', fontFamily: 'monospace', fontSize: '1rem' }}>1220867697</strong>
                      <span style={{ color: '#d4af37', fontSize: '0.76rem', fontWeight: 700 }}>Zenith Bank</span>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.75rem' }}>Name: Christ the potter church</div>
                  </div>

                  <div style={{ background: 'rgba(255,255,255,0.04)', padding: '10px 12px', borderRadius: '8px' }}>
                    <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.72rem' }}>OSOM PARTNERSHIP &amp; CONFERENCES:</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '2px' }}>
                      <strong style={{ color: '#ffffff', letterSpacing: '0.05em', fontFamily: 'monospace', fontSize: '1rem' }}>1220867707</strong>
                      <span style={{ color: '#d4af37', fontSize: '0.76rem', fontWeight: 700 }}>Zenith Bank</span>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.75rem' }}>Name: Oluwafunminiyi Samson Olufisayo ministries</div>
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.7)', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
                Secured via Direct Zenith Bank Transfer, Paystack, Flutterwave &amp; Cards.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SALVATION & PRAYER HUB BANNER */}
      <section style={{
        padding: '70px 0',
        background: '#ffffff'
      }}>
        <div className="cpc-container">
          <div style={{
            background: 'linear-gradient(135deg, #fef9e7 0%, #ecfdf5 100%)',
            border: '1.5px solid #d4af37',
            borderRadius: '24px',
            padding: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '30px'
          }}>
            <div>
              <span className="badge-green" style={{ marginBottom: '8px' }}>
                We Are Here For You
              </span>
              <h3 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--navy-900)', margin: '6px 0 8px' }}>
                Need Salvation or Urgent Prayer?
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '580px', margin: 0, lineHeight: 1.6 }}>
                Whether you want to surrender your life to Jesus Christ today, or you are facing a heavy storm and need pastoral intercession, our prayer altar never sleeps.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
              <Link href="/salvation" className="btn btn-green btn-lg">
                <span>Accept Jesus / Prayer Hub</span>
                <ArrowRight size={18} />
              </Link>
              <a href="tel:08148637261" className="btn btn-outline-dark btn-lg">
                <span>Call Prayer Line: 0814 863 7261</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

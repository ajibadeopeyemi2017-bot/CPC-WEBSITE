'use client';

import { useState } from 'react';
import {
  Heart,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Send,
  CheckCircle,
  Clock,
  Phone,
  Flame,
  Check,
  Lock,
  ThumbsUp
} from 'lucide-react';

const initialPrayerWall = [
  {
    id: 1,
    name: 'Sister Mary O.',
    category: 'Family & Marriage',
    request: 'Please stand in agreement with me for divine peace, godly restoration, and wisdom in my marriage.',
    date: 'Yesterday',
    amens: 34
  },
  {
    id: 2,
    name: 'Brother Emmanuel K.',
    category: 'Academic & Career',
    request: 'Praying for divine favour and open doors in my final examinations and post-graduate fellowship.',
    date: '2 days ago',
    amens: 28
  },
  {
    id: 3,
    name: 'Anonymous Believer',
    category: 'Spiritual Growth & Fire',
    request: 'Desiring a fresh baptism of the Holy Ghost fire and consistency in my secret prayer altar.',
    date: '3 days ago',
    amens: 47
  }
];

export default function SalvationPage() {
  const [activeTab, setActiveTab] = useState('salvation'); // 'salvation' or 'prayer'
  const [prayerSubmitted, setPrayerSubmitted] = useState(false);
  const [salvationConfirmed, setSalvationConfirmed] = useState(false);
  const [prayerWall, setPrayerWall] = useState(initialPrayerWall);
  const [amenClicked, setAmenClicked] = useState({});

  const [prayerForm, setPrayerForm] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'Spiritual Growth',
    details: '',
    isConfidential: true
  });

  const handleAmen = (id) => {
    if (amenClicked[id]) return;
    setAmenClicked(prev => ({ ...prev, [id]: true }));
    setPrayerWall(prev => prev.map(p => p.id === id ? { ...p, amens: p.amens + 1 } : p));
  };

  const handlePrayerSubmit = (e) => {
    e.preventDefault();
    setPrayerSubmitted(true);
  };

  return (
    <div>
      {/* Header */}
      <section style={{
        background: 'linear-gradient(180deg, #060c1a 0%, #0b1528 100%)',
        color: '#ffffff',
        padding: '70px 0 80px',
        textAlign: 'center'
      }}>
        <div className="cpc-container">
          <span className="badge-gold" style={{ marginBottom: '14px' }}>
            <Heart size={13} />
            Life in Christ &bull; Altar of Grace
          </span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', fontWeight: 800, marginBottom: '16px' }}>
            Salvation &amp; <span className="text-gold-gradient">Prayer Request Hub</span>
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '680px',
            margin: '0 auto 30px',
            lineHeight: 1.6
          }}>
            There is no distance in the spirit. Whether you are taking your very first step to receive Jesus, or needing pastoral intercession for your family, grace is available right now.
          </p>

          {/* Navigation Pill Switcher */}
          <div style={{
            display: 'inline-flex',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '4px',
            borderRadius: '9999px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <button
              onClick={() => setActiveTab('salvation')}
              style={{
                padding: '10px 24px',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: 700,
                background: activeTab === 'salvation' ? 'var(--gold-gradient)' : 'transparent',
                color: activeTab === 'salvation' ? 'var(--navy-950)' : '#ffffff',
                transition: 'all 0.2s ease'
              }}
            >
              I Gave My Life to Christ
            </button>
            <button
              onClick={() => setActiveTab('prayer')}
              style={{
                padding: '10px 24px',
                borderRadius: '9999px',
                fontSize: '0.9rem',
                fontWeight: 700,
                background: activeTab === 'prayer' ? 'var(--gold-gradient)' : 'transparent',
                color: activeTab === 'prayer' ? 'var(--navy-950)' : '#ffffff',
                transition: 'all 0.2s ease'
              }}
            >
              Submit Prayer Request
            </button>
          </div>
        </div>
      </section>

      {/* TAB 1: SALVATION GUIDANCE */}
      {activeTab === 'salvation' && (
        <section style={{ padding: '80px 0', background: '#f8fafc' }}>
          <div className="cpc-container-narrow">
            <div className="cpc-card" style={{
              padding: '44px 36px',
              borderRadius: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.06)',
              marginBottom: '40px'
            }}>
              <span className="badge-green" style={{ marginBottom: '12px' }}>
                <Sparkles size={12} />
                Eternal Life
              </span>
              <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--navy-900)', margin: '8px 0 16px' }}>
                Welcome to the Family of God!
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.7, marginBottom: '28px' }}>
                If you made the decision today to surrender your will and accept Jesus Christ as your personal Lord and Saviour, you have just experienced the greatest miracle in the universe!
              </p>

              {/* The Sinner's / Surrender Prayer */}
              <div style={{
                background: 'linear-gradient(135deg, #0b1528 0%, #15294d 100%)',
                color: '#ffffff',
                padding: '32px',
                borderRadius: '20px',
                border: '1.5px solid #d4af37',
                marginBottom: '32px'
              }}>
                <span style={{ color: '#d4af37', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '8px' }}>
                  PRAY THIS PRAYER FROM YOUR HEART
                </span>
                <p style={{
                  fontSize: '1.15rem',
                  fontStyle: 'italic',
                  lineHeight: 1.7,
                  color: '#ffffff',
                  marginBottom: '16px'
                }}>
                  &quot;Lord Jesus, I come to You today acknowledging that I am a sinner in need of Your mercy. I believe that You died on the cross for my sins and rose again for my justification. Today, I renounce every work of darkness and surrender the throne of my heart to You. Be my Lord, Saviour, and King. Wash me clean by Your blood and fill me with Your Holy Spirit. From this day forward, I belong to God. In Jesus&apos; mighty name, Amen!&quot;
                </p>

                {!salvationConfirmed ? (
                  <button
                    onClick={() => setSalvationConfirmed(true)}
                    className="btn btn-primary"
                    style={{ marginTop: '8px' }}
                  >
                    <CheckCircle size={18} />
                    <span>I Just Prayed This Prayer!</span>
                  </button>
                ) : (
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    background: '#0e6b3c',
                    color: '#ffffff',
                    borderRadius: '20px',
                    fontSize: '0.85rem',
                    fontWeight: 700
                  }}>
                    <Check size={16} />
                    <span>Hallelujah! Your Name is Written in Heaven!</span>
                  </div>
                )}
              </div>

              {/* 4 Crucial Next Steps */}
              <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '20px' }}>
                Your 4 Essential Next Steps
              </h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                {[
                  {
                    step: '1',
                    title: 'Daily Fellowship in Prayer',
                    desc: 'Speak to God daily as your loving Heavenly Father. Prayer is intimacy before it is requests.'
                  },
                  {
                    step: '2',
                    title: 'Daily Feeding on God’s Word',
                    desc: 'Begin reading the Gospel of John. The Word of God is your spiritual milk and meat for strength.'
                  },
                  {
                    step: '3',
                    title: 'Baptism of the Holy Spirit',
                    desc: 'Ask the Father for the infilling of the Holy Ghost with the evidence of speaking in unknown tongues.'
                  },
                  {
                    step: '4',
                    title: 'CPC Foundational Believers Class',
                    desc: 'Join our systematic training school where we establish you in righteous doctrine and kingdom order.'
                  }
                ].map((item) => (
                  <div key={item.step} style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '24px'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#0e6b3c',
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 800,
                      fontSize: '0.9rem',
                      marginBottom: '12px'
                    }}>
                      {item.step}
                    </div>
                    <strong style={{ fontSize: '1.05rem', color: 'var(--navy-900)', display: 'block', marginBottom: '6px' }}>
                      {item.title}
                    </strong>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pastoral Contact */}
              <div style={{
                background: '#ecfdf5',
                border: '1px solid #a7f3d0',
                borderRadius: '16px',
                padding: '24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px'
              }}>
                <div>
                  <strong style={{ color: '#094a28', fontSize: '1rem', display: 'block' }}>
                    Need a Pastor to Guide You Through Your Next Steps?
                  </strong>
                  <p style={{ color: '#0e6b3c', fontSize: '0.88rem', margin: '4px 0 0' }}>
                    Call or WhatsApp our Pastoral Counseling Desk: <strong>0814 863 7261</strong>
                  </p>
                </div>
                <a href="tel:08148637261" className="btn btn-green">
                  <Phone size={16} />
                  <span>Call Pastors Now</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* TAB 2: PRAYER REQUEST SUBMISSION */}
      {activeTab === 'prayer' && (
        <section style={{ padding: '80px 0', background: '#f8fafc' }}>
          <div className="cpc-container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '40px',
              alignItems: 'flex-start'
            }}>
              {/* Form */}
              <div className="cpc-card" style={{
                padding: '36px',
                borderRadius: '24px',
                boxShadow: '0 20px 40px rgba(0,0,0,0.06)'
              }}>
                {prayerSubmitted ? (
                  <div style={{ textAlign: 'center', padding: '24px 0' }}>
                    <div style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '50%',
                      background: '#ecfdf5',
                      color: '#0e6b3c',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      border: '2px solid #a7f3d0'
                    }}>
                      <Check size={32} />
                    </div>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '8px' }}>
                      Prayer Request Placed on the Altar
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                      Thank you, <strong>{prayerForm.name || 'Beloved'}</strong>. Apostle Oluwafunminiyi Olufisayo and the Tuesday School of Prayer intercessors will lift this need in earnest prayer.
                    </p>
                    <button
                      onClick={() => setPrayerSubmitted(false)}
                      className="btn btn-primary"
                    >
                      Submit Another Prayer Request
                    </button>
                  </div>
                ) : (
                  <div>
                    <span className="badge-green" style={{ marginBottom: '8px' }}>
                      School of Prayer Intercession
                    </span>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: '6px', marginBottom: '10px' }}>
                      Send Us Your Prayer Burden
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '24px' }}>
                      &quot;The effectual fervent prayer of a righteous man availeth much.&quot; (James 5:16). Every request is held in sacred trust.
                    </p>

                    <form onSubmit={handlePrayerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      <div>
                        <label className="form-label">Your Name (or write Anonymous)</label>
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="form-input"
                          value={prayerForm.name}
                          onChange={(e) => setPrayerForm({ ...formData, name: e.target.value })}
                        />
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                        <div>
                          <label className="form-label">Phone Number</label>
                          <input
                            type="tel"
                            placeholder="080 1234 5678"
                            className="form-input"
                            value={prayerForm.phone}
                            onChange={(e) => setPrayerForm({ ...prayerForm, phone: e.target.value })}
                          />
                        </div>
                        <div>
                          <label className="form-label">Category</label>
                          <select
                            className="form-select"
                            value={prayerForm.category}
                            onChange={(e) => setPrayerForm({ ...prayerForm, category: e.target.value })}
                          >
                            <option>Spiritual Growth & Fire</option>
                            <option>Healing & Health</option>
                            <option>Family & Marriage Peace</option>
                            <option>Financial & Debt Deliverance</option>
                            <option>Fruit of the Womb</option>
                            <option>Academic & Career Breakthrough</option>
                            <option>Deliverance from Habitual Sin</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="form-label">Prayer Details *</label>
                        <textarea
                          rows={4}
                          required
                          placeholder="Describe the situation you need God to intervene in..."
                          className="form-textarea"
                          value={prayerForm.details}
                          onChange={(e) => setPrayerForm({ ...prayerForm, details: e.target.value })}
                        />
                      </div>

                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        background: '#f8fafc',
                        padding: '12px',
                        borderRadius: '10px',
                        border: '1px solid #e2e8f0'
                      }}>
                        <input
                          type="checkbox"
                          id="confidential"
                          checked={prayerForm.isConfidential}
                          onChange={(e) => setPrayerForm({ ...prayerForm, isConfidential: e.target.checked })}
                          style={{ width: '18px', height: '18px' }}
                        />
                        <label htmlFor="confidential" style={{ fontSize: '0.85rem', color: 'var(--navy-900)', fontWeight: 600 }}>
                          Keep Strictly Confidential (Pastors Only)
                        </label>
                      </div>

                      <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '6px' }}>
                        <Send size={18} />
                        <span>Place Upon The Altar</span>
                      </button>
                    </form>
                  </div>
                )}
              </div>

              {/* Community Prayer Agreement Wall */}
              <div>
                <div style={{ marginBottom: '24px' }}>
                  <span className="badge-gold">Corporate Intercession</span>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: '6px', marginBottom: '8px' }}>
                    Agreed in Prayer
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                    Join faith with brethren around the world. Click <strong>&quot;Amen / Prayed&quot;</strong> to lift each burden.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {prayerWall.map((item) => (
                    <div
                      key={item.id}
                      className="cpc-card"
                      style={{
                        padding: '24px',
                        background: '#ffffff'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0e6b3c', background: '#ecfdf5', padding: '4px 10px', borderRadius: '9999px' }}>
                          {item.category}
                        </span>
                        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{item.date}</span>
                      </div>

                      <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--navy-900)', marginBottom: '8px' }}>
                        {item.name}
                      </strong>
                      <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '16px' }}>
                        &quot;{item.request}&quot;
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f1f5f9', paddingTop: '12px' }}>
                        <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                          <strong>{item.amens}</strong> intercessors praying
                        </span>

                        <button
                          onClick={() => handleAmen(item.id)}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px',
                            padding: '6px 14px',
                            borderRadius: '20px',
                            background: amenClicked[item.id] ? '#0e6b3c' : '#f1f5f9',
                            color: amenClicked[item.id] ? '#ffffff' : 'var(--navy-900)',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            transition: 'all 0.2s ease'
                          }}
                        >
                          <ThumbsUp size={13} />
                          <span>{amenClicked[item.id] ? 'Prayed With You!' : 'Amen, I Pray'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

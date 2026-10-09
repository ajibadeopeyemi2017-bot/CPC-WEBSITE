'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  MapPin,
  Car,
  Users,
  ShieldCheck,
  Smile,
  ChevronDown,
  ChevronUp,
  Compass,
  Phone,
  Sparkles,
  CheckCircle2,
  Heart
} from 'lucide-react';

const faqs = [
  {
    q: 'Where exactly is the church located?',
    a: 'We are located at 76B, PHCN Office (Upper Floor), Off Fajuyi Road, Ile-Ife, Osun State, Nigeria. Look out for the Christ The Potter Church banner at the gate. If you need help finding us, call our protocol desk at 0814 863 7261.'
  },
  {
    q: 'What time should I arrive for service?',
    a: 'Our Sunday Celebration Service begins promptly at 8:00 AM. We encourage first-time guests to arrive 10–15 minutes early so our hospitality team can welcome you, assist with children check-in, and guide you to your reserved VIP seat.'
  },
  {
    q: 'What should I wear?',
    a: 'Come as you are! You will see people dressed in traditional native attire, smart-casual, or formal business suits. We value the posture of your heart above your clothing style.'
  },
  {
    q: 'What happens with my kids during service?',
    a: 'We have an active Potter\'s Kids Church tailored specifically for children. They enjoy engaging Bible lessons, worship, arts and crafts, and healthy refreshments under loving and vetted adult supervision.'
  },
  {
    q: 'Will I be singled out or embarrassed as a first-timer?',
    a: 'Never! We will never make you stand up alone or put you on the spot. After service, we invite all first-time visitors to a relaxed 5-minute reception with Apostle Oluwafunminiyi and our pastors to enjoy a complimentary gift and light refreshments.'
  }
];

export default function PlanAVisitPage() {
  const [openFaq, setOpenFaq] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceDate: 'Upcoming Sunday (8:00 AM)',
    attendeeCount: '1 person',
    hasKids: 'No',
    kidAges: '',
    specialAssistance: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
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
            <Calendar size={13} />
            First-Time Guest Experience
          </span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', fontWeight: 800, marginBottom: '16px' }}>
            Plan Your Visit to <span className="text-gold-gradient">Christ The Potter Church</span>
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            From the moment you step foot on our grounds in Ile-Ife, you are not a guest—you are family coming home. Let us prepare for your arrival!
          </p>
        </div>
      </section>

      {/* Main Booking Form & Experience Overview */}
      <section style={{ padding: '80px 0', background: '#f8fafc' }}>
        <div className="cpc-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '40px',
            alignItems: 'flex-start'
          }}>
            {/* Booking Form Card */}
            <div className="cpc-card" style={{
              padding: '36px',
              borderRadius: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.06)'
            }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '24px 0' }}>
                  <div style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    background: '#ecfdf5',
                    color: '#0e6b3c',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 18px',
                    border: '2px solid #a7f3d0'
                  }}>
                    <CheckCircle2 size={36} />
                  </div>

                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '8px' }}>
                    Your VIP Visit is Reserved!
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '24px' }}>
                    Praise God, <strong>{formData.name}</strong>! Our Head Usher and Hospitality Team have been notified. A reserved seat has been prepared for you this <strong>{formData.serviceDate}</strong>.
                  </p>

                  <div style={{
                    background: '#ffffff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '16px',
                    padding: '20px',
                    textAlign: 'left',
                    marginBottom: '24px',
                    fontSize: '0.88rem'
                  }}>
                    <strong style={{ display: 'block', color: 'var(--navy-900)', marginBottom: '6px' }}>What to do on arrival:</strong>
                    <p style={{ color: '#64748b', margin: '0 0 10px', lineHeight: 1.5 }}>
                      Tell the ushers at the entrance: <em>&quot;I am {formData.name}, I reserved a visit online.&quot;</em> They will personally escort you and your party.
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0e6b3c', fontWeight: 600 }}>
                      <Phone size={14} />
                      <span>Direct line on the morning of your visit: 0814 863 7261</span>
                    </div>
                  </div>

                  <button onClick={() => setSubmitted(false)} className="btn btn-primary" style={{ width: '100%' }}>
                    Register Another Guest
                  </button>
                </div>
              ) : (
                <div>
                  <span className="badge-green" style={{ marginBottom: '8px' }}>
                    VIP Pre-Registration
                  </span>
                  <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy-900)', margin: '6px 0 10px' }}>
                    Tell Us You&apos;re Coming
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '24px' }}>
                    Planning your visit allows us to save you seats, prepare for your children, and greet you by name.
                  </p>

                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sister Grace Adeleke"
                        className="form-input"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label className="form-label">Phone Number *</label>
                        <input
                          type="tel"
                          required
                          placeholder="080 1234 5678"
                          className="form-input"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="form-label">Email Address</label>
                        <input
                          type="email"
                          placeholder="you@email.com"
                          className="form-input"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label className="form-label">Service Date *</label>
                        <select
                          className="form-select"
                          value={formData.serviceDate}
                          onChange={(e) => setFormData({ ...formData, serviceDate: e.target.value })}
                        >
                          <option>Upcoming Sunday (8:00 AM)</option>
                          <option>Tuesday School of Prayer (5:00 PM)</option>
                          <option>Thursday Revelational Hour (5:00 PM)</option>
                        </select>
                      </div>
                      <div>
                        <label className="form-label">Total Guests</label>
                        <select
                          className="form-select"
                          value={formData.attendeeCount}
                          onChange={(e) => setFormData({ ...formData, attendeeCount: e.target.value })}
                        >
                          <option>1 person (Just me)</option>
                          <option>2 people (Couple / Friends)</option>
                          <option>3 - 5 people (Family)</option>
                          <option>6+ people (Group)</option>
                        </select>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div>
                        <label className="form-label">Bringing Children?</label>
                        <select
                          className="form-select"
                          value={formData.hasKids}
                          onChange={(e) => setFormData({ ...formData, hasKids: e.target.value })}
                        >
                          <option>No</option>
                          <option>Yes (1 Child)</option>
                          <option>Yes (2 Children)</option>
                          <option>Yes (3+ Children)</option>
                        </select>
                      </div>
                      <div>
                        <label className="form-label">Children Ages (Optional)</label>
                        <input
                          type="text"
                          placeholder="e.g. 4 and 8 years old"
                          className="form-input"
                          value={formData.kidAges}
                          onChange={(e) => setFormData({ ...formData, kidAges: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Special Needs or Requests</label>
                      <textarea
                        rows={2}
                        placeholder="Need wheelchair access, translation, or transportation guidance..."
                        className="form-textarea"
                        value={formData.specialAssistance}
                        onChange={(e) => setFormData({ ...formData, specialAssistance: e.target.value })}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', marginTop: '6px' }}>
                      <Calendar size={18} />
                      <span>Confirm My Visit &amp; Reserve Seats</span>
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* Experience Checklist & Location Guide */}
            <div>
              <div style={{ marginBottom: '28px' }}>
                <span className="badge-gold">Step-by-Step</span>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: '6px', marginBottom: '8px' }}>
                  What Your Sunday Looks Like
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                  Here is what you can look forward to at Christ The Potter Church.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
                {[
                  {
                    icon: Car,
                    title: 'Ample & Secure Parking',
                    text: 'Park safely within the PHCN office premises. Our security marshals will direct you straight to a convenient spot.'
                  },
                  {
                    icon: Smile,
                    title: 'Warm Personal Reception',
                    text: 'No awkward feeling. You will be received with love, handed a service bulletin, and escorted to an ideal seat.'
                  },
                  {
                    icon: Sparkles,
                    title: 'Atmosphere of the Holy Spirit',
                    text: 'From the opening prayer to the final apostolic benediction, you will feel God’s transforming presence in song and word.'
                  },
                  {
                    icon: Heart,
                    title: 'First-Timer Reception & Gift',
                    text: 'Enjoy brief refreshments after service and receive a special spiritual audio message gift from Apostle Oluwafunminiyi.'
                  }
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="cpc-card"
                      style={{
                        padding: '20px 24px',
                        display: 'flex',
                        gap: '16px',
                        alignItems: 'flex-start'
                      }}
                    >
                      <div style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '10px',
                        background: '#ecfdf5',
                        color: '#0e6b3c',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        <Icon size={20} />
                      </div>
                      <div>
                        <strong style={{ fontSize: '1rem', color: 'var(--navy-900)', display: 'block', marginBottom: '4px' }}>
                          {item.title}
                        </strong>
                        <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Physical Address Reminder Box */}
              <div style={{
                background: 'linear-gradient(135deg, #0b1528 0%, #15294d 100%)',
                color: '#ffffff',
                borderRadius: '20px',
                padding: '28px',
                border: '1px solid rgba(212, 175, 55, 0.3)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#d4af37', marginBottom: '8px' }}>
                  <MapPin size={18} />
                  <strong style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    Auditorium Address
                  </strong>
                </div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 10px', color: '#ffffff' }}>
                  76B, PHCN Office (Upper Floor), Off Fajuyi Road, Ile-Ife, Osun State
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', margin: '0 0 18px', lineHeight: 1.5 }}>
                  Centrally located in the heart of Ile-Ife with easy access from Campus gates and city centre.
                </p>
                <a
                  href="https://maps.google.com/?q=PHCN+Office+Off+Fajuyi+Road+Ile+Ife"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-primary"
                >
                  <Compass size={14} />
                  <span>Open In Google Maps</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section style={{ padding: '80px 0', background: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
        <div className="cpc-container-narrow">
          <div className="section-header">
            <span className="badge-green">Common Questions</span>
            <h2>Frequently Asked Questions</h2>
            <p>
              Everything you need to know before joining us this week.
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    border: '1px solid #e2e8f0',
                    borderRadius: '14px',
                    overflow: 'hidden',
                    background: isOpen ? '#f8fafc' : '#ffffff',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'left',
                      fontWeight: 700,
                      fontSize: '1rem',
                      color: 'var(--navy-900)'
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={18} style={{ color: '#0e6b3c' }} /> : <ChevronDown size={18} style={{ color: '#94a3b8' }} />}
                  </button>

                  {isOpen && (
                    <div style={{
                      padding: '0 24px 20px',
                      color: 'var(--text-muted)',
                      fontSize: '0.92rem',
                      lineHeight: 1.6
                    }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

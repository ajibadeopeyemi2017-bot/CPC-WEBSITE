'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Users,
  Sparkles,
  Calendar,
  CheckCircle,
  ArrowRight,
  Heart,
  Music,
  Tv,
  Smile,
  Shield,
  Send,
  Check,
  Phone,
  Compass,
  Flame,
  Award
} from 'lucide-react';

const ministries = [
  {
    title: "Potter's Family Units (Home Fellowships)",
    desc: "Small groups meeting across Ile-Ife neighbourhoods for prayer, mutual care, communion, and spiritual brotherhood.",
    leader: "Pastoral Directorate",
    meeting: "Alternate Fridays / Weekends"
  },
  {
    title: "Kingdom Youths & Campus Ministry",
    desc: "Dynamic student and young adult movement equipping campuses with revival fire, academic excellence, and purposeful living.",
    leader: "Youth Pastorate",
    meeting: "Special Summits & Fellowships"
  },
  {
    title: "Potter's Voices (Worship Ministry)",
    desc: "Anointed psalmists and instrumentalists dedicated to hosting God's tangible presence through spiritual songs and high praise.",
    leader: "Music Director",
    meeting: "Saturdays 4:00 PM Rehearsals"
  },
  {
    title: "Protocol & Hospitality Directorate",
    desc: "The welcoming face of the church, ensuring order, warmth, first-timer care, and VIP hospitality for all attendees.",
    leader: "Chief Usher",
    meeting: "Sundays & Midweek Services"
  },
  {
    title: "Media, Tech & Live Broadcast Team",
    desc: "Operating sound, video production, photography, social media coverage, and global streaming on Mixlr & Facebook.",
    leader: "Technical Lead",
    meeting: "Production Stand"
  },
  {
    title: "Potter's Kids Children's Church",
    desc: "A safe, fun, and scripture-based environment where the next generation is introduced to the love and reality of Jesus.",
    leader: "Children Directorate",
    meeting: "Every Sunday 8:00 AM"
  }
];

const conferences = [
  {
    name: "Kingdom Young Ministers Conference (KYMC 2026)",
    theme: 'Theme: "The Man That the Lord Will Work With (Part Two)"',
    date: "September 24th - 26th, 2026",
    time: "Thu & Fri 5:00 PM | Sat 10:00 AM",
    venue: "Church Auditorium, 76B PHCN Office, Off Fajuyi Rd, Ile-Ife",
    image: "/images/flyer-kymc.jpg",
    details: "An annual apostolic convocation equipping young ministers and leaders to qualify for divine partnership and fulfill their kingdom assignments without compromise.",
    badge: "Flagship Ministerial Convocation"
  },
  {
    name: "Annual Gathering of the Eagles (AGOTE 2025)",
    theme: 'Theme: "DIVINE FLOW — Word, Prayers & Impartation"',
    date: "December 19th - 20th, 2025",
    time: "Friday 5:00 PM | Saturday 9:00 AM",
    venue: "Church Auditorium, PHCN Office, Fajuyi Road, Ile-Ife",
    image: "/images/flyer-agote.jpg",
    details: "High-voltage apostolic convocation featuring Apostle Oluwafunminiyi Olufisayo alongside guest father Apostle Goke Ogunleye (President, Alleluia to Jesus Ministries) for prophetic alignment and mantle transfer.",
    badge: "Apostolic & Prophetic Gathering"
  },
  {
    name: "Realised Destiny Summit (RDS 2025)",
    theme: 'Theme: "Running The Race That Is Set Before You" (Heb. 12:1)',
    date: "May 22nd - 24th, 2025",
    time: "Thu & Fri 5:00 PM | Sat 10:00 AM",
    venue: "Upper Floor, PHCN Office, Fajuyi Road, Ile-Ife",
    image: "/images/flyer-rds-2025.jpg",
    details: "Jeremiah 29:11 destiny alignment. Teaching believers how to run according to kingdom rules so they finish their God-assigned race crowned with eternal rewards.",
    badge: "Quarterly Youth & Destiny Summit"
  },
  {
    name: "Revelation of Our Salvation (ROS 2026)",
    theme: 'Theme: "Grace That Bringeth Salvation" (Titus 2:11)',
    date: "July 23rd - 25th, 2026",
    time: "Thu & Fri 5:00 PM - 7:30 PM | Sat 10:00 AM - 1:00 PM",
    venue: "PHCN Office (Upper Floor), Off Fajuyi Road, Ile-Ife",
    image: "/images/flyer-ros-2026.jpg",
    details: "Yearly salvation doctrine and supernatural encounter unveiling the power of a surrendered life and our unshakeable victory in Christ Jesus.",
    badge: "Doctrinal & Salvation Intensive"
  },
  {
    name: "AMITES (Acquiring Ministers' Teaching School)",
    theme: "Ministerial Academy for Five-Fold Ministers & Church Workers",
    date: "Modular Cohorts (February – May & March – June)",
    time: "Fridays 2:00 PM - 5:00 PM | Saturdays 9:00 AM - 12:00 PM",
    venue: "Upper Floor, PHCN Office, Fajuyi Road, Ile-Ife",
    image: "/images/flyer-amites.jpg",
    details: "Intensive training school for those who have perceived the call of God upon their lives and desire systematic grooming in doctrine, leadership, and supernatural operations.",
    badge: "Executive Leadership School"
  },
  {
    name: "Ile-Ife Community Outreach",
    theme: 'Theme: "Walking in the Newness of Life" (Romans 6:4)',
    date: "October 10th - 11th, 2025",
    time: "Evening Sessions: 4:00 PM - 7:00 PM",
    venue: "Divine Promotion School Hall, Esindale Line 2, Iloro Area, Ile-Ife",
    image: "/images/flyer-outreach.jpg",
    details: "Two power-packed days of evangelism, salvation, healing, and community transformation touching lives outside the four walls of the auditorium.",
    badge: "City-Wide Gospel Crusade"
  }
];

const archiveConferences = [
  {
    name: "AGOTE 2024: Total Victory",
    image: "/images/flyer-agote-2024.jpg",
    year: "2024 Edition",
    theme: "Total Victory through Prophetic Faith"
  },
  {
    name: "KYMC 2024: Divine Calling & Service",
    image: "/images/flyer-kymc-2024.jpg",
    year: "2024 Edition",
    theme: "Divine Calling, Grace, Gifting & Service"
  },
  {
    name: "ROS 2025: Surrendered Life",
    image: "/images/flyer-ros.jpg",
    year: "2025 Edition",
    theme: "The Power of a Surrendered Life (Rom. 12:1-2)"
  }
];

export default function ConnectPage() {
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    department: "Potter's Voices (Worship Ministry)",
    experience: '',
  });

  const handleVolunteerSubmit = (e) => {
    e.preventDefault();
    setVolunteerSubmitted(true);
  };

  return (
    <div>
      {/* Page Header */}
      <section style={{
        background: 'linear-gradient(180deg, #060c1a 0%, #0b1528 100%)',
        color: '#ffffff',
        padding: '75px 0 85px',
        textAlign: 'center'
      }}>
        <div className="cpc-container">
          <span className="badge-gold" style={{ marginBottom: '14px' }}>
            <Users size={13} />
            Connect &bull; Serve &bull; Grow Together
          </span>
          <h1 style={{
            fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '16px'
          }}>
            Find Your Place in the <span className="text-gold-gradient">Family of God</span>
          </h1>
          <p style={{
            fontSize: '1.15rem',
            color: 'rgba(255, 255, 255, 0.82)',
            maxWidth: '680px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            You are not meant to walk this spiritual journey alone. Explore our ministries, connect with home cells, attend our national convocations, and release your God-given grace.
          </p>
        </div>
      </section>

      {/* Flagship Conferences & National Summits */}
      <section id="conferences" style={{ padding: '90px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div className="cpc-container">
          <div className="section-header">
            <span className="badge-gold">National Apostolic Summits</span>
            <h2>Signature Annual Conferences and Schools</h2>
            <p>
              Special ordained annual convocations convened by Apostle Oluwafunminiyi Olufisayo &amp; OSOM Ministries to equip believers and ministers across Nigeria.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '32px',
            marginBottom: '60px'
          }}>
            {conferences.map((conf, idx) => (
              <div key={idx} className="cpc-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'relative', height: '280px', background: '#0b1528' }}>
                  <Image
                    src={conf.image}
                    alt={conf.name}
                    fill
                    style={{ objectFit: 'contain', background: '#09101d' }}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    background: 'rgba(6, 12, 26, 0.85)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(212, 175, 55, 0.4)',
                    color: '#f5d77f',
                    padding: '4px 10px',
                    borderRadius: '8px',
                    fontSize: '0.75rem',
                    fontWeight: 700
                  }}>
                    {conf.badge}
                  </div>
                </div>
                <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <span className="badge-gold" style={{ fontSize: '0.72rem', marginBottom: '10px', alignSelf: 'flex-start' }}>
                    {conf.date}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-900)', margin: '4px 0 6px' }}>
                    {conf.name}
                  </h3>
                  <div style={{ color: '#0e6b3c', fontWeight: 700, fontSize: '0.92rem', marginBottom: '10px' }}>
                    {conf.theme}
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', lineHeight: 1.6, marginBottom: '20px', flex: 1 }}>
                    {conf.details}
                  </p>

                  <div style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '10px',
                    padding: '12px 14px',
                    fontSize: '0.8rem',
                    color: '#475569',
                    marginBottom: '20px'
                  }}>
                    <strong style={{ display: 'block', color: 'var(--navy-900)', marginBottom: '2px' }}>Venue &amp; Time:</strong>
                    <span>{conf.venue} &bull; {conf.time}</span>
                  </div>

                  <a
                    href="tel:08148637261"
                    className="btn btn-primary"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    <Phone size={15} />
                    <span>Register / Enquire: 0814 863 7261</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Past Summits Archive */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '36px 30px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--navy-900)', margin: 0 }}>
                  Convocations &amp; Archives Gallery
                </h3>
                <p style={{ fontSize: '0.88rem', color: '#64748b', margin: '4px 0 0' }}>
                  Explore milestones from previous years of God&apos;s moving in CPC and OSOM Ministries.
                </p>
              </div>
              <span className="badge-green">
                <Award size={13} />
                Apostolic Legacy
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '20px'
            }}>
              {archiveConferences.map((arc, i) => (
                <div key={i} style={{
                  borderRadius: '14px',
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  background: '#f8fafc'
                }}>
                  <div style={{ position: 'relative', height: '180px', background: '#0b1528' }}>
                    <Image
                      src={arc.image}
                      alt={arc.name}
                      fill
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div style={{ padding: '16px' }}>
                    <span style={{ fontSize: '0.72rem', color: '#b89326', fontWeight: 700, textTransform: 'uppercase' }}>
                      {arc.year}
                    </span>
                    <h4 style={{ fontSize: '0.98rem', fontWeight: 700, color: 'var(--navy-900)', margin: '4px 0' }}>
                      {arc.name}
                    </h4>
                    <p style={{ fontSize: '0.8rem', color: '#64748b', margin: 0 }}>
                      {arc.theme}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Local Church Ministries Section */}
      <section style={{ padding: '90px 0', background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="cpc-container">
          <div className="section-header">
            <span className="badge-green">Serve &amp; Connect</span>
            <h2>Church Departments &amp; Family Units</h2>
            <p>
              Discover where you can plug in your gifts and be a blessing to the body of Christ.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '24px'
          }}>
            {ministries.map((m, idx) => (
              <div key={idx} className="cpc-card" style={{ padding: '32px 26px' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '10px' }}>
                  {m.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '16px' }}>
                  {m.desc}
                </p>
                <div style={{
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '12px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.8rem',
                  color: '#64748b'
                }}>
                  <span><strong>Leader:</strong> {m.leader}</span>
                  <span style={{ color: '#0e6b3c', fontWeight: 600 }}>{m.meeting}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteer Application Form */}
      <section style={{ padding: '90px 0', background: '#f8fafc' }}>
        <div className="cpc-container-narrow">
          <div style={{
            background: '#ffffff',
            borderRadius: '24px',
            padding: '48px 36px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 10px 40px rgba(0,0,0,0.04)'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <span className="badge-gold">Join A Ministry Team</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: '8px' }}>
                Volunteer Your Talents
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem' }}>
                &quot;Come labour on!&quot; Complete the form below and our leadership team will connect with you.
              </p>
            </div>

            {volunteerSubmitted ? (
              <div style={{
                textAlign: 'center',
                padding: '40px 20px',
                background: '#ecfdf5',
                borderRadius: '16px',
                border: '1px solid #a7f3d0'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  background: '#0e6b3c',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px'
                }}>
                  <Check size={28} />
                </div>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#094a28', marginBottom: '8px' }}>
                  Application Received!
                </h3>
                <p style={{ color: '#0e6b3c', fontSize: '0.95rem', maxWidth: '480px', margin: '0 auto 20px' }}>
                  Thank you for stepping up to serve, {formData.name}. Our ministry department head will reach out to you via {formData.phone || 'phone'} within 48 hours.
                </p>
                <button
                  onClick={() => setVolunteerSubmitted(false)}
                  className="btn btn-outline-dark"
                >
                  Submit Another Department Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleVolunteerSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '8px' }}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sister Mary Adeyemi"
                    className="cpc-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '8px' }}>
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 0814 863 7261"
                    className="cpc-input"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '8px' }}>
                    Department You Wish to Join *
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                    className="cpc-input"
                  >
                    {ministries.map((m, i) => (
                      <option key={i} value={m.title}>{m.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: 'var(--navy-900)', marginBottom: '8px' }}>
                    Previous Ministry / Secular Experience (Optional)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    placeholder="Briefly tell us about your skills, gifts, or prior church service background..."
                    className="cpc-input"
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
                >
                  <Send size={18} />
                  <span>Submit Volunteer Expression</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

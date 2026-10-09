'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Users,
  Compass,
  Heart,
  BookOpen,
  ArrowRight,
  Flame,
  Award,
  Crown,
  Scroll,
  Layers,
  ChevronDown,
  Building,
  Target,
  FileText
} from 'lucide-react';

const tenetsOfFaith = [
  {
    num: '01',
    title: 'The Triune God',
    scripture: 'Ephesians 4:5-6, Genesis 1:26, Matthew 3:16-17',
    summary: 'We believe in one true God, eternally existing and revealed in three distinct co-equal persons: the Father, the Son, and the Holy Spirit.'
  },
  {
    num: '02',
    title: 'The Infallible Word of God',
    scripture: '2 Timothy 3:16, 2 Peter 1:20-21',
    summary: 'We believe the Holy Bible is the fully inspired, infallible, and written Word of God, serving as the supreme and final authority for Christian faith, doctrine, and living.'
  },
  {
    num: '03',
    title: 'The Deity & Incarnation of Jesus',
    scripture: 'John 1:1-4, Matthew 1:18-25, Luke 1:30-35',
    summary: 'We believe Jesus Christ is true God and true man, conceived of the Holy Ghost, born of the Virgin Mary, lived a sinless life, and is the only Saviour of mankind.'
  },
  {
    num: '04',
    title: 'Redemption by the Blood',
    scripture: 'Ephesians 2:8, 2 Corinthians 5:18, John 1:12, Acts 3:19',
    summary: 'We believe that cleansing from sin and reconciliation with God is accomplished solely through repentance and faith in the selfless sacrifice and shed blood of Jesus on the Cross.'
  },
  {
    num: '05',
    title: 'Bodily Resurrection & Ascension',
    scripture: 'Luke 24:36-40, John 20:25-29, Matthew 28:29-30',
    summary: 'We believe Jesus physically rose from the grave in victory over death, ascended visibly into heaven, and sits at the right hand of the Father as our High Priest.'
  },
  {
    num: '06',
    title: 'Baptism in Water & Holy Ghost',
    scripture: 'Acts 1:8, Acts 2:4, Acts 4:5-12, Matthew 28:19',
    summary: 'We believe in water baptism by immersion and the baptism of the Holy Spirit with the evidence of speaking with other tongues and supernatural divine enablement.'
  },
  {
    num: '07',
    title: 'Abundant Life & Divine Healing',
    scripture: 'Colossians 1:13, Galatians 5:1, Matthew 8:17b, 1 Peter 2:24',
    summary: 'We believe Christ’s redemptive work provides complete deliverance, abundant life, and divine physical healing for the body, liberating believers from curses, sin, and poverty.'
  },
  {
    num: '08',
    title: 'Sanctification & Holy Living',
    scripture: 'Romans 15:16, 1 Corinthians 6:11, Titus 2:5',
    summary: 'We believe regeneration by the Holy Spirit produces holiness, righteous character, and continuous sanctification to manifest the fruit of the Spirit.'
  },
  {
    num: '09',
    title: 'Tithing & Honouring God',
    scripture: 'Malachi 3:8-12, 2 Corinthians 9:6-7, Proverbs 3:9',
    summary: 'We believe tithing and offerings are kingdom covenant expressions of our love, gratitude, and honour toward God, establishing divine blessings and kingdom stewardship.'
  },
  {
    num: '10',
    title: 'The Rapture & Eternal Judgment',
    scripture: '1 Thessalonians 4:16-17, Revelation 20:11-15, 1 Corinthians 15:12-23',
    summary: 'We believe in the imminent rapture of the Church, the literal second coming of Christ, and the final resurrection of the saved to everlasting life and the lost to eternal judgment.'
  }
];

const hierarchyLevels = [
  {
    rank: '01',
    role: 'The Set Man & President',
    officer: 'Apostle Oluwafunminiyi Samson Olufisayo',
    duty: 'Visionary leader, apostolic teacher, and shepherd bearing the primary spiritual mandate from God for Christ The Potter Church.'
  },
  {
    rank: '02',
    role: 'The Vice President & General Coordinator',
    officer: 'Rev. (Mrs.) Olamide Olufisayo',
    duty: 'Overall coordinator of all CPC affairs, operations, pastoral counsel, and executive administrative oversight.'
  },
  {
    rank: '03',
    role: 'Senior Associate Pastors',
    officer: 'State & Regional Directorate',
    duty: 'Overseers of the CPC vision expansion across states and regional outreach fellowships.'
  },
  {
    rank: '04',
    role: 'Pastors & Ministry Elders',
    officer: 'Elders Council & Helps Ministry',
    duty: 'Assigned local assembly pastoral duties, church administration, and pastoral care for departments.'
  },
  {
    rank: '05',
    role: 'Departmental Captains & Group Leaders',
    officer: 'Family Head Units & Committees',
    duty: 'Overseeing spiritual health, discipleship, and practical execution of church services and member fellowship.'
  },
  {
    rank: '06',
    role: 'Faithful Stewards & Workers',
    officer: 'Serving Brethren',
    duty: 'Laboures serving in ushering, choir, media, technical, sanitation, hospitality, and evangelistic wings.'
  }
];

const protocols = [
  {
    category: 'Foundational Believers’ Class',
    desc: 'Every member goes through the foundational curriculum covering basic doctrine, salvation certainty, spiritual warfare, and kingdom responsibility before taking up ministry assignments.'
  },
  {
    category: 'AMITES Ministerial School',
    desc: 'The Acquiring Ministers’ Teaching School provides modular apostolic training for five-fold ministers, church workers, and those who perceive God’s calling on their lives.'
  },
  {
    category: 'Covenant Relationship & Purity',
    desc: 'We uphold absolute moral purity and defined godly relationships. Courtship begins with pastoral prayers and mandatory pre-marital counseling with no sexual compromise.'
  },
  {
    category: 'Life Milestones & Consecrations',
    desc: 'Dedicated protocols guide child namings, baby dedications, marital unions, house/business dedications, and first fruit consecration for spiritual covering and fruitfulness.'
  }
];

export default function AboutPage() {
  const [activeBeliefTab, setActiveBeliefTab] = useState('all');

  return (
    <div>
      {/* Page Header */}
      <section style={{
        background: 'linear-gradient(180deg, #060c1a 0%, #0b1528 100%)',
        color: '#ffffff',
        padding: '75px 0 95px',
        textAlign: 'center',
        position: 'relative'
      }}>
        <div className="cpc-container">
          <span className="badge-gold" style={{ marginBottom: '14px' }}>
            <Sparkles size={13} />
            The Apostolic Mandate &bull; Christ The Potter Church
          </span>
          <h1 style={{
            fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)',
            fontWeight: 800,
            lineHeight: 1.2,
            marginBottom: '16px'
          }}>
            Moulded By Truth. <span className="text-gold-gradient">Walking in Reality.</span>
          </h1>
          <p style={{
            fontSize: '1.15rem',
            color: 'rgba(255, 255, 255, 0.82)',
            maxWidth: '720px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            &quot;Teaching men to walk in the reality of who Christ is.&quot; A biblical, prophetic, and apostolic fold in Ile-Ife, Nigeria, committed to deep doctrine, righteous character, and divine destiny.
          </p>
        </div>
      </section>

      {/* The 4-Fold Vision Cards */}
      <section style={{ padding: '90px 0', background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="cpc-container">
          <div className="section-header">
            <span className="badge-gold">God-Given Blueprint</span>
            <h2>Our 4-Fold Apostolic Vision</h2>
            <p>
              As articulated in the church constitution, our ministry is driven by four pillar mandates to glorify Jesus Christ.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '24px',
            marginBottom: '60px'
          }}>
            <div className="cpc-card" style={{ padding: '36px 28px', borderTop: '5px solid #d4af37' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(212, 175, 55, 0.15)',
                color: '#b89326',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '18px',
                fontWeight: 800,
                fontSize: '1.1rem'
              }}>
                01
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '12px' }}>
                Walk in the Reality of Christ
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                To teach men everywhere to walk in the experiential, day-to-day reality of who Christ is — awakening believers to their full inheritance and identity in Him.
              </p>
            </div>

            <div className="cpc-card" style={{ padding: '36px 28px', borderTop: '5px solid #0e6b3c' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(14, 107, 60, 0.12)',
                color: '#0e6b3c',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '18px',
                fontWeight: 800,
                fontSize: '1.1rem'
              }}>
                02
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '12px' }}>
                Equip Mature Believers
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                To teach, train, and equip mature believers for the work of the ministry, raising skilled labourers who function effectively in their unique spiritual graces.
              </p>
            </div>

            <div className="cpc-card" style={{ padding: '36px 28px', borderTop: '5px solid #2563eb' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(37, 99, 235, 0.12)',
                color: '#2563eb',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '18px',
                fontWeight: 800,
                fontSize: '1.1rem'
              }}>
                03
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '12px' }}>
                Reach the Unsaved &amp; Non-Churchgoers
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                To reach out with passionate evangelism and compassionate community outreaches to the unbelievers and non-churchgoers with the transformative Good News of Jesus.
              </p>
            </div>

            <div className="cpc-card" style={{ padding: '36px 28px', borderTop: '5px solid #dc2626' }}>
              <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                background: 'rgba(220, 38, 38, 0.12)',
                color: '#dc2626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '18px',
                fontWeight: 800,
                fontSize: '1.1rem'
              }}>
                04
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '12px' }}>
                Restore Divine Order in Leaders
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.65 }}>
                To correct the abnormalities and errors of leaders in the Body of Christ, providing doctrinal balance, ministerial accountability, and spiritual fathering.
              </p>
            </div>
          </div>

          {/* 3-Block Ministry Framework */}
          <div style={{
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            borderRadius: '24px',
            padding: '48px 36px',
            border: '1px solid #e2e8f0'
          }}>
            <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto 40px' }}>
              <span className="badge-green">Operational Blueprint</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--navy-900)', marginTop: '8px' }}>
                How We Carry Out The Vision: The 3 Blocks
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                The ministry functions across three strategic spheres to establish believers from personal salvation to national kingdom leadership.
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              <div style={{ background: '#ffffff', padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#d4af37', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Block 01 &bull; Kingdom Unity
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '10px' }}>
                  Body of Christ &amp; Ministers
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  Convening national convocations (KYMC &amp; AGOTE) where fathers and seasoned ministers gather to impart young leaders, giving balance to the coming generation so they avoid error.
                </p>
              </div>

              <div style={{ background: '#ffffff', padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#0e6b3c', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Block 02 &bull; Purpose &amp; Vocation
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '10px' }}>
                  Youth Programmes &amp; Summits
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  Empowering youths, professionals, and students through the Realised Destiny Summit (RDS) to uncover their divine calling, align with God&apos;s expected end, and run their race lawfully.
                </p>
              </div>

              <div style={{ background: '#ffffff', padding: '28px', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#1e3a6c', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Block 03 &bull; Local Assembly
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '10px' }}>
                  Church Sector (CPC Auditorium)
                </h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  Active local church ministry featuring Sunday Celebration, Tuesday School of Prayer, Thursday Revelational Hour, soul-winning outreaches, and foundational discipleship.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tenets of Faith / Statement of Doctrine */}
      <section id="doctrine" style={{ padding: '90px 0', background: '#060c1a', color: '#ffffff' }}>
        <div className="cpc-container">
          <div className="section-header" style={{ color: '#ffffff' }}>
            <span className="badge-gold">Sound Doctrine</span>
            <h2 style={{ color: '#ffffff' }}>Tenets of Faith &amp; Belief</h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)' }}>
              Anchored on the unadulterated Word of God. What we believe, preach, and defend as Christ The Potter Church.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {tenetsOfFaith.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '16px',
                  padding: '28px 24px',
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '12px'
                }}>
                  <span style={{
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    color: '#d4af37'
                  }}>
                    {item.num}
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    color: '#159b56',
                    background: 'rgba(21, 155, 86, 0.15)',
                    padding: '3px 8px',
                    borderRadius: '6px',
                    fontWeight: 600
                  }}>
                    Scriptural Anchor
                  </span>
                </div>

                <h3 style={{ fontSize: '1.18rem', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
                  {item.title}
                </h3>

                <p style={{ fontSize: '0.88rem', color: 'rgba(255, 255, 255, 0.75)', lineHeight: 1.6, marginBottom: '14px' }}>
                  {item.summary}
                </p>

                <div style={{
                  fontSize: '0.78rem',
                  color: '#f5d77f',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  paddingTop: '10px',
                  fontStyle: 'italic'
                }}>
                  Refs: {item.scripture}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pastoral Spotlight */}
      <section style={{ padding: '95px 0', background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <div className="cpc-container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center',
            gap: '60px'
          }}>
            <div>
              <div style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                border: '3px solid #d4af37',
                boxShadow: '0 25px 50px rgba(0,0,0,0.15)'
              }}>
                <Image
                  src="/images/pastor-action.jpg"
                  alt="Apostle Oluwafunminiyi Olufisayo"
                  width={560}
                  height={680}
                  style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                />
              </div>
            </div>

            <div>
              <span className="badge-gold" style={{ marginBottom: '12px' }}>
                <Crown size={14} />
                Our Lead Pastors &amp; Set Man
              </span>
              <h2 style={{ fontSize: '2.4rem', fontWeight: 800, color: 'var(--navy-900)', lineHeight: 1.2, margin: '8px 0 16px' }}>
                Apostle &amp; Rev. (Mrs) Oluwafunminiyi Olufisayo
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: 1.7, color: '#334155', marginBottom: '16px' }}>
                <strong>Apostle Oluwafunminiyi Olufisayo</strong> is an ordained minister of the gospel called and sent from God as a conference speaker and life trainer with an apostolic teaching and preaching mandate to teach men to walk in the reality of who Christ is.
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#475569', marginBottom: '16px' }}>
                He is intensely passionate about seeing the order of God established in the local and global Church. His apostolic teaching has influenced, inspired, and transformed countless believers and emerging ministers across generations. He is the President of <strong>Oluwafunminiyi Samson Olufisayo Ministries (OSOM)</strong> and the Set Man of <strong>Christ The Potter Church</strong>.
              </p>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#475569', marginBottom: '24px' }}>
                He is happily married to <strong>Rev. Mrs. Olamide Olufisayo</strong>, who serves actively with him in ministry as Vice President and coordinator of church affairs. They reside in Ile-Ife, Osun State, Nigeria, and are blessed with two wonderful children, <strong>Aquila</strong> and <strong>Paul</strong>.
              </p>

              <div style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                padding: '20px 24px',
                borderRadius: '16px'
              }}>
                <strong style={{ color: 'var(--navy-900)', display: 'block', fontSize: '0.95rem', marginBottom: '6px' }}>
                  Ministry Arm &bull; OSOM Mandate
                </strong>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                  The apostolic outreach umbrella that convenes the Annual Gathering of the Eagles (AGOTE), Kingdom Young Ministers Conference (KYMC), Jesus and His Men Conference (JAHMEC), Realised Destiny Summit (RDS), and the Acquiring Ministers&apos; Teaching School (AMITES).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Church Government & Authority Structure */}
      <section style={{ padding: '90px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div className="cpc-container">
          <div className="section-header">
            <span className="badge-green">Biblical Order</span>
            <h2>Church Government Concept</h2>
            <p>
              &quot;Let all things be done decently and in order.&quot; At Christ The Potter Church, authority flows to nurture, protect, and release spiritual gifts.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
            gap: '20px'
          }}>
            {hierarchyLevels.map((lvl, index) => (
              <div
                key={index}
                style={{
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '26px 24px',
                  border: '1px solid #e2e8f0',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
                  display: 'flex',
                  gap: '16px'
                }}
              >
                <div style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '10px',
                  background: index < 2 ? '#fef3c7' : '#f1f5f9',
                  color: index < 2 ? '#b89326' : 'var(--navy-900)',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {lvl.rank}
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--navy-900)', marginBottom: '4px' }}>
                    {lvl.role}
                  </h4>
                  <span style={{ fontSize: '0.82rem', color: '#0e6b3c', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                    {lvl.officer}
                  </span>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748b', lineHeight: 1.5 }}>
                    {lvl.duty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Protocols in the House & Believer Growth */}
      <section style={{ padding: '90px 0', background: '#ffffff' }}>
        <div className="cpc-container">
          <div className="section-header">
            <span className="badge-gold">Stewardship &amp; Protocols</span>
            <h2>Protocols We Observe in the House</h2>
            <p>
              1 Corinthians 14:40 &bull; Clear guidelines that cultivate spiritual growth, family integrity, and ministerial excellence.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '24px'
          }}>
            {protocols.map((proto, i) => (
              <div key={i} className="cpc-card" style={{ padding: '30px 24px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '14px',
                  color: 'var(--navy-900)'
                }}>
                  <ShieldCheck size={22} style={{ color: '#0e6b3c' }} />
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: 0 }}>
                    {proto.category}
                  </h4>
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {proto.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Helpline */}
          <div style={{
            marginTop: '50px',
            background: 'linear-gradient(135deg, #0e6b3c 0%, #064022 100%)',
            color: '#ffffff',
            borderRadius: '20px',
            padding: '36px 32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '16px'
          }}>
            <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              Need Pastoral Counsel or Questions About CPC?
            </h3>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255,255,255,0.85)', maxWidth: '600px' }}>
              Speak directly with our ministerial counseling and protocol desk on official church channels.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '8px' }}>
              <a href="tel:08148637261" className="btn btn-gold btn-lg">
                Call Direct: 0814 863 7261
              </a>
              <Link href="/plan-a-visit" className="btn btn-outline-white btn-lg">
                Plan Your Visit
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

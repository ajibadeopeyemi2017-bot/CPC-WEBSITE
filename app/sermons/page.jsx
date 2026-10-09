'use client';

import { useState } from 'react';
import Image from 'next/image';
import {
  Play,
  Pause,
  Radio,
  Download,
  Share2,
  Search,
  Filter,
  Sparkles,
  BookOpen,
  Calendar,
  Clock,
  Volume2,
  ExternalLink,
  Check,
  Phone
} from 'lucide-react';
import LiveCountdown from '../../components/LiveCountdown';

const allSermons = [
  {
    id: 1,
    title: 'Cultivating the Habit of Seeking & Receiving Divine Help in the Time of Need',
    minister: 'Apostle Oluwafunminiyi Olufisayo',
    category: 'Prayer & Grace',
    scripture: 'Hebrews 4:16',
    date: 'August 2025',
    duration: '1h 22m',
    series: 'Divine Help Series',
    featured: true,
    description: 'Learn the spiritual posture required to obtain mercy and find grace to help in times of distress and life transition.'
  },
  {
    id: 2,
    title: 'The Law of Going a Little Further',
    minister: 'Apostle Oluwafunminiyi Olufisayo',
    category: 'Consecration',
    scripture: 'Matthew 26:39',
    date: 'July 2025',
    duration: '58m',
    series: 'Surrendered Life',
    featured: false,
    description: 'When others stop at the perimeter of convenience, the surrendered vessel presses into Gethsemane to finish the divine assignment.'
  },
  {
    id: 3,
    title: 'Understanding Prayer and the Hindrance that Chokes Effectiveness',
    minister: 'Apostle Oluwafunminiyi Olufisayo',
    category: 'Prayer & Grace',
    scripture: 'James 4:3, 1 Peter 3:7',
    date: 'School of Prayer',
    duration: '1h 14m',
    series: 'Prayer School',
    featured: false,
    description: 'A deep examination of spiritual friction, doubt, unforgiveness, and motives that stifle answered prayers.'
  },
  {
    id: 4,
    title: 'The Man That GOD Can Work With 2.0',
    minister: 'Apostle Oluwafunminiyi Olufisayo',
    category: 'Leadership & Calling',
    scripture: '2 Timothy 2:21, Isaiah 66:2',
    date: 'KYMC 2026 Edition',
    duration: '1h 45m',
    series: 'Kingdom Ministers',
    featured: true,
    description: 'God does not use men randomly. Discover the divine prerequisites, trembling at the Word, and jealousy for God that qualifies a labourer.'
  },
  {
    id: 5,
    title: 'Conflict in Marriage and How to Deal With It',
    minister: 'Apostle & Rev. (Mrs) Olufisayo',
    category: 'Marriage & Family',
    scripture: 'Ephesians 5:21-33',
    date: 'Family Life Special',
    duration: '1h 10m',
    series: 'Kingdom Home',
    featured: false,
    description: 'Practical, scriptural insight into communication, emotional maturity, honour, and conflict resolution in godly homes.'
  },
  {
    id: 6,
    title: 'Fear is Not a Christian Virtue',
    minister: 'Apostle Oluwafunminiyi Olufisayo',
    category: 'Faith & Destiny',
    scripture: '2 Timothy 1:7',
    date: 'Sunday Service',
    duration: '52m',
    series: 'Spirit of Power',
    featured: false,
    description: 'Breaking free from intimidation and terror through an intimate revelation of God&apos;s love and sound mind.'
  },
  {
    id: 7,
    title: 'What is the Mess? Have You Tried Jesus?',
    minister: 'Apostle Oluwafunminiyi Olufisayo',
    category: 'Evangelism & Hope',
    scripture: 'John 4:1-26',
    date: 'Evangelistic Outreach',
    duration: '48m',
    series: 'Redemption Power',
    featured: false,
    description: 'No matter how broken or entangled your past is, the Potter is able to remake the marred vessel into honor.'
  },
  {
    id: 8,
    title: 'Fathering: Honour, Covering & Impartation',
    minister: 'Apostle Oluwafunminiyi Olufisayo',
    category: 'Leadership & Calling',
    scripture: '1 Corinthians 4:15',
    date: 'Ministers Gathering',
    duration: '1h 28m',
    series: 'Kingdom Order',
    featured: false,
    description: 'The difference between having ten thousand instructors and having spiritual fathers who pour their DNA and mantle into sons.'
  },
  {
    id: 9,
    title: 'Consecration: The Sacred Separation Unto God',
    minister: 'Apostle Oluwafunminiyi Olufisayo',
    category: 'Consecration',
    scripture: 'Leviticus 20:7, Romans 12:1',
    date: 'Revelational Hour',
    duration: '1h 05m',
    series: 'Purity & Power',
    featured: false,
    description: 'Living an uncompromised life in an era of laxity. The power that flows from a separated heart.'
  },
  {
    id: 10,
    title: 'Walking in the Fear of God',
    minister: 'Apostle Oluwafunminiyi Olufisayo',
    category: 'Consecration',
    scripture: 'Proverbs 9:10, Acts 9:31',
    date: 'Sunday Service',
    duration: '1h 12m',
    series: 'Foundation Truths',
    featured: false,
    description: 'Recovering holy awe, reverential reverence, and moral uprightness in private and public life.'
  },
  {
    id: 11,
    title: 'Walking in the Spirit of Discernment',
    minister: 'Apostle Oluwafunminiyi Olufisayo',
    category: 'Faith & Destiny',
    scripture: 'Hebrews 5:14, 1 John 4:1',
    date: 'Revelational Hour',
    duration: '1h 18m',
    series: 'Prophetic Sight',
    featured: false,
    description: 'Developing spiritual senses to test every spirit and navigate complex seasons with divine clarity.'
  },
  {
    id: 12,
    title: 'The Power of a Surrendered Life',
    minister: 'Apostle Oluwafunminiyi Olufisayo',
    category: 'Consecration',
    scripture: 'Romans 6:13, Colossians 1:13',
    date: 'ROS Summit Theme',
    duration: '1h 35m',
    series: 'Revelation of Our Salvation',
    featured: true,
    description: 'Salvation relocated you from the devil&apos;s dominion; surrender allows God to have complete preeminence over your will.'
  },
  {
    id: 13,
    title: 'The Law of Conditioning',
    minister: 'Apostle Oluwafunminiyi Olufisayo',
    category: 'Consecration',
    scripture: '1 Corinthians 9:27',
    date: 'Ministers Special',
    duration: '1h 15m',
    series: 'Spiritual Discipline',
    featured: false,
    description: 'Disciplining the physical appetites and fleshly impulses so the spirit man stays sensitive and receptive to divine frequency.'
  },
  {
    id: 14,
    title: 'Developing a Strong Spirit',
    minister: 'Apostle Oluwafunminiyi Olufisayo',
    category: 'Faith & Destiny',
    scripture: 'Proverbs 18:14, Ephesians 3:16',
    date: 'School of Prayer',
    duration: '1h 08m',
    series: 'Inner Man Strength',
    featured: false,
    description: 'The spirit of a man sustains his infirmity. Learn how fasting, Word-meditation, and prayer in the Holy Ghost fortify your inner fortitude.'
  },
  {
    id: 15,
    title: 'Taking Heed to the Ministry You Have Received in the Lord',
    minister: 'Apostle Oluwafunminiyi Olufisayo',
    category: 'Leadership & Calling',
    scripture: 'Colossians 4:17, Acts 20:28',
    date: 'Ministers Conference',
    duration: '2h 00m',
    series: 'Kingdom Calling',
    featured: true,
    description: 'Ministry begins with a call, not personal prerogative. The priority of ministry is not activity, but intimacy with the One who called you.'
  },
  {
    id: 16,
    title: 'Running the Race That is Set Before You',
    minister: 'Apostle Oluwafunminiyi Olufisayo',
    category: 'Faith & Destiny',
    scripture: 'Hebrews 12:1, 1 Corinthians 9:24, 2 Timothy 2:5',
    date: 'RDS 2025 Summit',
    duration: '1h 35m',
    series: 'Realised Destiny Summit',
    featured: true,
    description: 'Life and destiny is a lawful race. If you run another man’s race or ignore divine rules, you forfeit the eternal crown.'
  },
  {
    id: 17,
    title: 'Walking in the Newness of Life',
    minister: 'Apostle Oluwafunminiyi Olufisayo',
    category: 'Evangelism & Hope',
    scripture: 'Romans 6:4, 2 Corinthians 5:17',
    date: 'Ile-Ife Community Outreach',
    duration: '55m',
    series: 'Outreach Series',
    featured: false,
    description: 'Buried with Christ through baptism into death; raised up by the glory of the Father to walk henceforth in supernatural righteousness.'
  },
  {
    id: 18,
    title: 'Marriage: Do You Understand What You Are About to Get Into? (Series)',
    minister: 'Apostle & Rev. (Mrs) Olufisayo',
    category: 'Marriage & Family',
    scripture: 'Genesis 2:24, Matthew 19:4-6',
    date: 'Family & Courtship Clinic',
    duration: '1h 25m',
    series: 'Kingdom Home Clinic',
    featured: false,
    description: 'Crucial covenant principles for singles contemplating marriage and married couples desiring lasting peace and divine alignment.'
  }
];

const categories = [
  'All Sermons',
  'Prayer & Grace',
  'Consecration',
  'Leadership & Calling',
  'Marriage & Family',
  'Faith & Destiny',
  'Evangelism & Hope'
];

export default function SermonsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Sermons');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTrack, setActiveTrack] = useState(allSermons[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const filtered = allSermons.filter((s) => {
    const matchesCat = selectedCategory === 'All Sermons' || s.category === selectedCategory;
    const matchesSearch = s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.scripture.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.series.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handlePlay = (sermon) => {
    setActiveTrack(sermon);
    setIsPlaying(true);
    window.dispatchEvent(
      new CustomEvent('play-cpc-sermon', {
        detail: {
          title: sermon.title,
          minister: sermon.minister,
          category: sermon.category
        }
      })
    );
  };

  const handleCopy = (id) => {
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div>
      {/* Media Header */}
      <section style={{
        background: 'linear-gradient(180deg, #060c1a 0%, #0b1528 100%)',
        color: '#ffffff',
        padding: '70px 0 80px',
        textAlign: 'center'
      }}>
        <div className="cpc-container">
          <span className="badge-gold" style={{ marginBottom: '14px' }}>
            <Radio size={13} />
            CPC Watch &amp; Media Center
          </span>
          <h1 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.4rem)', fontWeight: 800, marginBottom: '16px' }}>
            Spiritual Food for Your <span className="text-gold-gradient">Spirit Man</span>
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: '680px',
            margin: '0 auto 36px',
            lineHeight: 1.6
          }}>
            &quot;For Man shall not live by bread alone but by every word that proceeds from the mouth of God.&quot; Stream live broadcasts, listen to deep apostolic series, and equip your soul.
          </p>

          {/* Quick Mixlr Banner */}
          <div style={{
            maxWidth: '640px',
            margin: '0 auto',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '16px',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className="live-dot" />
              <div style={{ textAlign: 'left' }}>
                <strong style={{ color: '#ffffff', display: 'block', fontSize: '0.92rem' }}>Online Live Stream (Mixlr)</strong>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.78rem' }}>Live during all weekly services</span>
              </div>
            </div>

            <a
              href="https://mixlr.com/christ-the-potter-church"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-primary"
            >
              <Radio size={14} />
              <span>Connect on Mixlr</span>
            </a>
          </div>
        </div>
      </section>

      {/* Featured Sermon Hero Player */}
      <section style={{ padding: '60px 0', background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
        <div className="cpc-container">
          <div className="cpc-card" style={{
            background: 'linear-gradient(135deg, #0b1528 0%, #15294d 100%)',
            color: '#ffffff',
            padding: '40px',
            borderRadius: '24px',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            boxShadow: '0 20px 50px rgba(0,0,0,0.15)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px',
              alignItems: 'center'
            }}>
              <div>
                <span className="badge-gold" style={{ marginBottom: '12px' }}>
                  FEATURED MESSAGE SPOTLIGHT
                </span>
                <h2 style={{ fontSize: '1.85rem', fontWeight: 800, margin: '8px 0 12px', lineHeight: 1.3 }}>
                  {activeTrack.title}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.85rem', color: '#d4af37', marginBottom: '16px' }}>
                  <span>{activeTrack.minister}</span>
                  <span>&bull;</span>
                  <span>{activeTrack.scripture}</span>
                  <span>&bull;</span>
                  <span>{activeTrack.duration}</span>
                </div>
                <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '28px' }}>
                  {activeTrack.description}
                </p>

                <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => handlePlay(activeTrack)}
                    className="btn btn-primary btn-lg"
                  >
                    <Play size={18} />
                    <span>Listen to Teaching</span>
                  </button>

                  <a
                    href="https://mixlr.com/christ-the-potter-church"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline-white btn-lg"
                  >
                    <Radio size={16} />
                    <span>Join Mixlr Stream</span>
                  </a>
                </div>
              </div>

              {/* Player UI Preview */}
              <div style={{
                background: 'rgba(0, 0, 0, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '20px',
                padding: '28px',
                backdropFilter: 'blur(10px)'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: 'var(--cpc-green)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <BookOpen size={30} style={{ color: '#ffffff' }} />
                  </div>
                  <div>
                    <strong style={{ color: '#ffffff', display: 'block', fontSize: '1rem' }}>
                      Christ The Potter Church
                    </strong>
                    <span style={{ color: '#d4af37', fontSize: '0.8rem' }}>
                      Apostolic Audio Stand
                    </span>
                  </div>
                </div>

                {/* Simulated Progress Bar */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{
                    height: '6px',
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '9999px',
                    overflow: 'hidden',
                    marginBottom: '8px'
                  }}>
                    <div style={{ width: '42%', height: '100%', background: 'var(--gold-gradient)' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>
                    <span>24:18</span>
                    <span>{activeTrack.duration}</span>
                  </div>
                </div>

                <div style={{
                  padding: '12px 16px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: '10px',
                  fontSize: '0.8rem',
                  color: 'rgba(255,255,255,0.7)',
                  textAlign: 'center'
                }}>
                  Also available physically at the <strong>Church Media Stand</strong> every Sunday!
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sermon Catalog & Search */}
      <section style={{ padding: '80px 0', background: '#ffffff' }}>
        <div className="cpc-container">
          {/* Filter & Search Bar */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            marginBottom: '40px'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '16px'
            }}>
              <div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--navy-900)', margin: 0 }}>
                  Apostolic Sermon Library
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', margin: '4px 0 0' }}>
                  Showing {filtered.length} messages
                </p>
              </div>

              {/* Search Box */}
              <div style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
                <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input
                  type="text"
                  placeholder="Search title, scripture, or topic..."
                  className="form-input"
                  style={{ paddingLeft: '42px', borderRadius: '9999px' }}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {/* Category Pills */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              overflowX: 'auto',
              paddingBottom: '8px'
            }}>
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    style={{
                      padding: '8px 18px',
                      borderRadius: '9999px',
                      fontSize: '0.85rem',
                      fontWeight: active ? 700 : 500,
                      background: active ? 'var(--navy-900)' : '#f1f5f9',
                      color: active ? '#ffffff' : 'var(--navy-900)',
                      whiteSpace: 'nowrap',
                      transition: 'all 0.2s ease',
                      border: active ? '1px solid var(--navy-900)' : '1px solid transparent'
                    }}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Sermons Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}>
            {filtered.map((sermon) => (
              <div
                key={sermon.id}
                className="cpc-card"
                style={{
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  borderTop: sermon.id === activeTrack.id ? '4px solid #d4af37' : '1px solid var(--border-light)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      padding: '4px 10px',
                      borderRadius: '9999px',
                      background: 'rgba(14, 107, 60, 0.1)',
                      color: '#0e6b3c'
                    }}>
                      {sermon.category}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{sermon.duration}</span>
                  </div>

                  <h4 style={{
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    color: 'var(--navy-900)',
                    lineHeight: 1.4,
                    marginBottom: '8px'
                  }}>
                    {sermon.title}
                  </h4>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: '12px' }}>
                    <span style={{ color: '#d4af37', fontWeight: 600 }}>{sermon.scripture}</span>
                    <span>&bull;</span>
                    <span>{sermon.series}</span>
                  </div>

                  <p style={{ color: '#475569', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '20px' }}>
                    {sermon.description}
                  </p>
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid #f1f5f9',
                  paddingTop: '16px'
                }}>
                  <button
                    onClick={() => handlePlay(sermon)}
                    className="btn btn-sm btn-primary"
                    style={{ padding: '8px 18px' }}
                  >
                    <Play size={14} />
                    <span>Play Now</span>
                  </button>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      onClick={() => handleCopy(sermon.id)}
                      title="Share Teaching"
                      style={{
                        padding: '8px',
                        borderRadius: '8px',
                        background: '#f1f5f9',
                        color: copiedId === sermon.id ? '#0e6b3c' : '#64748b'
                      }}
                    >
                      {copiedId === sermon.id ? <Check size={16} /> : <Share2 size={16} />}
                    </button>
                    <a
                      href="https://mixlr.com/christ-the-potter-church"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Listen on Mixlr"
                      style={{
                        padding: '8px',
                        borderRadius: '8px',
                        background: '#f1f5f9',
                        color: '#64748b'
                      }}
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Media Stand Audio Desk Banner */}
          <div style={{
            marginTop: '60px',
            background: 'linear-gradient(135deg, #060c1a 0%, #15294d 100%)',
            borderRadius: '20px',
            padding: '40px 32px',
            color: '#ffffff',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '16px'
          }}>
            <span className="badge-gold">
              <Volume2 size={13} />
              CPC Media &amp; Audio Library Desk
            </span>
            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>
              Invest in Your Spirit Man
            </h3>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255, 255, 255, 0.8)', maxWidth: '640px', lineHeight: 1.6 }}>
              &quot;For man shall not live by bread alone, but by every word that proceeds from the mouth of God.&quot; Order complete conference message packages, USB flash audio compilations, and sermon series through the CPC Media Stand.
            </p>
            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '10px' }}>
              <a href="tel:08148637261" className="btn btn-gold btn-lg">
                <Phone size={16} />
                <span>Order via Media Line: 0814 863 7261</span>
              </a>
              <a
                href="https://mixlr.com/christ-the-potter-church"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline-white btn-lg"
              >
                <Radio size={16} />
                <span>Mixlr Live Stream</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

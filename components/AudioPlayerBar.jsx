'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Radio, X, ExternalLink, Disc } from 'lucide-react';

export default function AudioPlayerBar() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTrack, setCurrentTrack] = useState({
    title: 'Cultivating the Habit of Seeking Divine Help',
    minister: 'Apostle Oluwafunminiyi Olufisayo',
    category: 'Spiritual Growth & Prayer',
    src: '' // can be stream or audio
  });
  const [isOpen, setIsOpen] = useState(false);

  // Listen to custom event for sermon play triggers
  useEffect(() => {
    const handlePlaySermon = (e) => {
      if (e.detail) {
        setCurrentTrack(e.detail);
        setIsPlaying(true);
        setIsOpen(true);
      }
    };
    window.addEventListener('play-cpc-sermon', handlePlaySermon);
    return () => window.removeEventListener('play-cpc-sermon', handlePlaySermon);
  }, []);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          zIndex: 99,
          background: 'linear-gradient(135deg, #0d6338 0%, #0b1528 100%)',
          border: '1.5px solid #d4af37',
          color: '#ffffff',
          padding: '12px 20px',
          borderRadius: '9999px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: 700,
          fontSize: '0.88rem',
          transition: 'transform 0.2s ease',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        <span className="live-dot" />
        <Radio size={16} className="text-gold" />
        <span>Audio Stream / Mixlr</span>
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '16px',
      right: '16px',
      left: '16px',
      maxWidth: '640px',
      marginLeft: 'auto',
      zIndex: 99,
      background: 'rgba(11, 21, 40, 0.95)',
      border: '1px solid rgba(212, 175, 55, 0.35)',
      borderRadius: '16px',
      padding: '14px 20px',
      boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '16px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px', overflow: 'hidden' }}>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          aria-label={isPlaying ? 'Pause' : 'Play'}
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'var(--gold-gradient)',
            color: '#060c1a',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 4px 14px rgba(212, 175, 55, 0.3)'
          }}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
        </button>

        <div style={{ overflow: 'hidden' }}>
          <div style={{
            fontSize: '0.88rem',
            fontWeight: 700,
            color: '#ffffff',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {currentTrack.title}
          </div>
          <div style={{
            fontSize: '0.75rem',
            color: 'rgba(255, 255, 255, 0.65)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span>{currentTrack.minister}</span>
            <span>&bull;</span>
            <span style={{ color: '#d4af37' }}>{currentTrack.category}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
        <a
          href="https://mixlr.com/christ-the-potter-church"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '6px 12px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            color: '#ffffff',
            fontSize: '0.75rem',
            fontWeight: 600
          }}
        >
          <Radio size={12} className="text-gold" />
          <span>Mixlr Hub</span>
          <ExternalLink size={10} />
        </a>

        <button
          onClick={() => setIsOpen(false)}
          aria-label="Close Player"
          style={{
            color: 'rgba(255, 255, 255, 0.6)',
            padding: '4px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

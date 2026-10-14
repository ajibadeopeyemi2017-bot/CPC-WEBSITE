'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  Volume1,
  VolumeX,
  Radio,
  X,
  ChevronDown,
  ExternalLink,
  Download,
  Share2,
  Check,
  Keyboard,
  Clock,
  Sparkles,
} from 'lucide-react';
import { SOCIAL_LINKS } from '../lib/site-config';
import {
  formatAudioTime,
  getSavedPlaybackPosition,
  savePlaybackPosition,
  clearPlaybackPosition,
  downloadSermonAudio,
} from '../lib/sermons';

const PLAYBACK_SPEEDS = [0.75, 1, 1.25, 1.5, 1.75, 2];

export default function AudioPlayerBar() {
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);

  const [track, setTrack] = useState({
    id: 'divine-help',
    title: 'Cultivating the Habit of Seeking & Receiving Divine Help in the Time of Need',
    minister: 'Apostle Oluwafunminiyi Olufisayo',
    category: 'Prayer & Grace',
    scripture: 'Hebrews 4:16',
    series: 'Divine Help Series',
    audioUrl: '/EXTRACTION.mp3',
    mode: 'sermon',
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [activeTab, setActiveTab] = useState('sermon'); // 'sermon' | 'mixlr'
  const [savedResumePos, setSavedResumePos] = useState(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showShortcutsHelp, setShowShortcutsHelp] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Initialize volume and speed from localStorage
  useEffect(() => {
    try {
      const savedVol = localStorage.getItem('cpc_audio_vol');
      if (savedVol !== null) {
        const v = parseFloat(savedVol);
        if (!isNaN(v) && v >= 0 && v <= 1) {
          setVolume(v);
          if (audioRef.current) audioRef.current.volume = v;
        }
      }
      const savedSpeed = localStorage.getItem('cpc_audio_speed');
      if (savedSpeed !== null) {
        const s = parseFloat(savedSpeed);
        if (PLAYBACK_SPEEDS.includes(s)) {
          setPlaybackSpeed(s);
          if (audioRef.current) audioRef.current.playbackRate = s;
        }
      }
    } catch {
      // Storage unavailable
    }
  }, []);

  // Listen for custom trigger event
  useEffect(() => {
    const onPlay = (e) => {
      if (!e.detail) return;
      const detail = e.detail;
      setTrack(detail);
      setIsOpen(true);

      if (detail.mode === 'mixlr') {
        setActiveTab('mixlr');
        if (audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
        setSavedResumePos(null);
      } else {
        setActiveTab('sermon');

        // Check for resume position
        if (typeof detail.resumeTime === 'number' && detail.resumeTime > 0) {
          // Explicit resume requested from caller
          setSavedResumePos(null);
          setTimeout(() => {
            if (audioRef.current) {
              audioRef.current.currentTime = detail.resumeTime;
              setCurrentTime(detail.resumeTime);
              audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
            }
          }, 150);
        } else {
          // Check saved position in storage
          const savedPos = getSavedPlaybackPosition(detail.id);
          if (savedPos && savedPos > 8) {
            setSavedResumePos(savedPos);
          } else {
            setSavedResumePos(null);
          }

          setTimeout(() => {
            if (audioRef.current) {
              audioRef.current.playbackRate = playbackSpeed;
              audioRef.current.volume = isMuted ? 0 : volume;
              audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
            }
          }, 150);
        }
      }
    };

    window.addEventListener('play-cpc-sermon', onPlay);
    return () => window.removeEventListener('play-cpc-sermon', onPlay);
  }, [playbackSpeed, volume, isMuted]);

  // Periodic position persistence
  useEffect(() => {
    if (!isPlaying || activeTab !== 'sermon' || !track.id) return;
    const interval = setInterval(() => {
      if (audioRef.current && !audioRef.current.paused && audioRef.current.currentTime > 5) {
        // If close to completion (>96%), clear memory
        if (duration > 30 && audioRef.current.currentTime >= duration * 0.96) {
          clearPlaybackPosition(track.id);
        } else {
          savePlaybackPosition(track.id, audioRef.current.currentTime);
        }
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [isPlaying, activeTab, track.id, duration]);

  // Mobile / Bluetooth MediaSession API synchronization
  useEffect(() => {
    if (typeof window === 'undefined' || !('mediaSession' in navigator)) return;

    if (activeTab === 'sermon' && track) {
      navigator.mediaSession.metadata = new window.MediaMetadata({
        title: track.title,
        artist: track.minister || 'Apostle Oluwafunminiyi Olufisayo',
        album: track.series || 'Christ The Potter Church Teaching Archive',
        artwork: [
          { src: '/images/pastor-portrait.jpg', sizes: '512x512', type: 'image/jpeg' },
          { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
          { src: '/icon-192.png', sizes: '192x192', type: 'image/png' },
        ],
      });

      navigator.mediaSession.setActionHandler('play', () => {
        if (audioRef.current) {
          audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      });
      navigator.mediaSession.setActionHandler('pause', () => {
        if (audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      });
      navigator.mediaSession.setActionHandler('seekbackward', () => skipTime(-15));
      navigator.mediaSession.setActionHandler('seekforward', () => skipTime(15));
    } else {
      navigator.mediaSession.metadata = null;
    }
  }, [track, activeTab]);

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

  const skipTime = useCallback((delta) => {
    if (!audioRef.current) return;
    const next = Math.max(0, Math.min(duration || 3600, audioRef.current.currentTime + delta));
    audioRef.current.currentTime = next;
    setCurrentTime(next);
  }, [duration]);

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const handleResumeClick = () => {
    if (savedResumePos && audioRef.current) {
      audioRef.current.currentTime = savedResumePos;
      setCurrentTime(savedResumePos);
      setSavedResumePos(null);
      if (!isPlaying) {
        audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    }
  };

  const handleDismissResume = () => {
    setSavedResumePos(null);
  };

  const handleVolumeChange = (e) => {
    const v = parseFloat(e.target.value);
    setVolume(v);
    setIsMuted(v === 0);
    if (audioRef.current) {
      audioRef.current.volume = v;
      audioRef.current.muted = v === 0;
    }
    try {
      localStorage.setItem('cpc_audio_vol', String(v));
    } catch {
      // Ignore
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audioRef.current.muted = nextMuted;
  };

  const cycleSpeed = () => {
    const nextIdx = (PLAYBACK_SPEEDS.indexOf(playbackSpeed) + 1) % PLAYBACK_SPEEDS.length;
    const next = PLAYBACK_SPEEDS[nextIdx];
    setPlaybackSpeed(next);
    if (audioRef.current) {
      audioRef.current.playbackRate = next;
    }
    try {
      localStorage.setItem('cpc_audio_speed', String(next));
    } catch {
      // Ignore
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      await downloadSermonAudio(track);
    } finally {
      setTimeout(() => setIsDownloading(false), 2000);
    }
  };

  const handleShare = async () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/sermons#${track.id}` : '';
    try {
      if (navigator.share) {
        await navigator.share({
          title: track.title,
          text: `Listen to "${track.title}" by ${track.minister} on Christ The Potter Church`,
          url,
        });
        return;
      }
      await navigator.clipboard.writeText(url);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2200);
    } catch {
      // Dismissed share sheet
    }
  };

  // Global Keyboard Shortcuts (Space = Play/Pause, Left/Right = Skip 15s, M = Mute, Esc = Minimize)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      // Skip if user is typing in an input, textarea, or contentEditable
      const target = e.target;
      if (
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.tagName === 'SELECT' ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowLeft' || e.key === 'j') {
        e.preventDefault();
        skipTime(-15);
      } else if (e.code === 'ArrowRight' || e.key === 'l') {
        e.preventDefault();
        skipTime(15);
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault();
        toggleMute();
      } else if (e.code === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, togglePlay, skipTime, isMuted]);

  // Minimized Floating Launcher Pill
  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2.5 border border-white/20 bg-ink-950 px-4 py-3 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-white shadow-2xl transition-all hover:bg-brand-700 sm:bottom-6 sm:right-6"
        aria-label="Open audio player"
      >
        {isPlaying ? (
          <span className="flex items-center gap-2 text-brand-300">
            {/* Animated Mini Soundwave */}
            <span className="flex items-end gap-[2px] h-3">
              <span className="w-[2px] h-2 bg-brand-400 animate-pulse" />
              <span className="w-[2px] h-3 bg-brand-300 animate-bounce" />
              <span className="w-[2px] h-1.5 bg-brand-400 animate-pulse" />
            </span>
            <span className="max-w-[180px] truncate sm:max-w-[240px]">
              {track.title}
            </span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <span className="live-dot" />
            <span>Audio Player / Mixlr</span>
          </span>
        )}
      </button>
    );
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      role="region"
      aria-label="Audio Player"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-ink-950/95 text-white shadow-2xl backdrop-blur-xl"
    >
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={track.audioUrl || undefined}
        onTimeUpdate={() => audioRef.current && setCurrentTime(audioRef.current.currentTime)}
        onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
        onEnded={() => {
          setIsPlaying(false);
          clearPlaybackPosition(track.id);
          setSavedResumePos(null);
        }}
        preload="metadata"
      />

      <div className="mx-auto max-w-[1240px] px-4 py-3 sm:px-6 sm:py-3.5">
        {/* Top Header bar: Tab toggles & utility actions */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2 text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('sermon')}
              className={`flex items-center gap-1.5 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] transition-colors ${
                activeTab === 'sermon'
                  ? 'border border-brand-400 bg-brand-600 text-white shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <span>Recorded Sermon</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('mixlr');
                if (audioRef.current && isPlaying) {
                  audioRef.current.pause();
                  setIsPlaying(false);
                }
              }}
              className={`flex items-center gap-1.5 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] transition-colors ${
                activeTab === 'mixlr'
                  ? 'border border-red-500 bg-red-600 text-white shadow-sm'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <span className="live-dot" />
              <span>Mixlr Live Service</span>
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Keyboard Shortcuts Hint */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowShortcutsHelp(!showShortcutsHelp)}
                aria-label="Keyboard shortcuts guide"
                title="Keyboard Shortcuts (Space, ←/→, M, Esc)"
                className="hidden items-center gap-1 rounded border border-white/15 px-2 py-0.5 text-[0.58rem] font-bold uppercase tracking-wider text-white/65 hover:border-white/40 hover:text-white md:inline-flex"
              >
                <Keyboard size={11} />
                <span>Shortcuts</span>
              </button>

              {showShortcutsHelp && (
                <div className="absolute right-0 bottom-full mb-2 w-64 rounded-sm border border-white/20 bg-ink-950 p-3 text-xs shadow-2xl z-50">
                  <div className="flex items-center justify-between border-b border-white/10 pb-1.5 font-bold uppercase tracking-wider text-[0.62rem] text-brand-300">
                    <span>Keyboard Controls</span>
                    <button
                      type="button"
                      onClick={() => setShowShortcutsHelp(false)}
                      className="text-white/50 hover:text-white"
                    >
                      <X size={12} />
                    </button>
                  </div>
                  <ul className="mt-2 space-y-1.5 text-[0.72rem] text-white/80">
                    <li className="flex justify-between">
                      <span className="font-mono text-brand-400">Space</span>
                      <span>Play / Pause</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-mono text-brand-400">← / →</span>
                      <span>Rewind / Skip 15s</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-mono text-brand-400">M</span>
                      <span>Mute / Unmute</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-mono text-brand-400">Esc</span>
                      <span>Minimize Player</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Minimize player"
              title="Minimize player"
              className="p-1 text-white/60 hover:text-white"
            >
              <ChevronDown size={18} />
            </button>
            <button
              type="button"
              onClick={() => {
                if (audioRef.current) {
                  audioRef.current.pause();
                  setIsPlaying(false);
                }
                setIsOpen(false);
              }}
              aria-label="Close and stop"
              title="Close player"
              className="p-1 text-white/60 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab 1: Sermon Recording Mode */}
        {activeTab === 'sermon' && (
          <div className="pt-2 sm:pt-3">
            {/* Audio Resume Smart Prompt */}
            {savedResumePos && (
              <div className="mb-2.5 flex items-center justify-between border border-brand-500/40 bg-brand-950/60 px-3 py-1.5 text-xs text-brand-200 animate-fadeIn">
                <div className="flex items-center gap-2">
                  <Clock size={13} className="text-brand-400" />
                  <span className="text-[0.72rem]">
                    You previously stopped at{' '}
                    <strong className="text-brand-300 font-mono">
                      {formatAudioTime(savedResumePos)}
                    </strong>
                    . Would you like to resume?
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleResumeClick}
                    className="border border-brand-400 bg-brand-600 px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-wider text-white hover:bg-brand-500"
                  >
                    Resume
                  </button>
                  <button
                    type="button"
                    onClick={handleDismissResume}
                    className="text-[0.62rem] uppercase text-white/60 hover:text-white"
                  >
                    Start over
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 items-center gap-3 md:grid-cols-[1.2fr_auto_1.2fr]">
              {/* Left Column: Track Info + Soundwave */}
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-2">
                  <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-brand-300">
                    {track.category || 'Apostolic Teaching'}
                  </span>
                  {isPlaying && (
                    <span className="inline-flex items-center gap-1.5 text-[0.58rem] font-bold uppercase text-brand-400">
                      {/* Animated Soundwave Bars */}
                      <span className="flex items-end gap-[2px] h-3">
                        <span className="w-[2px] h-3 bg-brand-400 animate-pulse" />
                        <span className="w-[2px] h-2 bg-brand-400" />
                        <span className="w-[2px] h-4 bg-brand-300 animate-bounce" />
                        <span className="w-[2px] h-1.5 bg-brand-400" />
                      </span>
                      <span>Now Playing</span>
                    </span>
                  )}
                </div>
                <h4 className="mt-0.5 truncate font-display text-base uppercase leading-tight sm:text-lg">
                  {track.title}
                </h4>
                <p className="truncate text-xs text-white/65">
                  {track.minister} {track.scripture ? `· ${track.scripture}` : ''}{' '}
                  {track.series ? `· [${track.series}]` : ''}
                </p>
              </div>

              {/* Center Column: Playback Controls */}
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => skipTime(-15)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white"
                  aria-label="Rewind 15 seconds (Left Arrow)"
                  title="Rewind 15 seconds"
                >
                  <RotateCcw size={14} />
                </button>

                <button
                  type="button"
                  onClick={togglePlay}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg transition-all hover:bg-brand-500 hover:scale-105 active:scale-95"
                  aria-label={isPlaying ? 'Pause sermon (Space)' : 'Play sermon (Space)'}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={() => skipTime(15)}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white"
                  aria-label="Forward 15 seconds (Right Arrow)"
                  title="Skip forward 15 seconds"
                >
                  <RotateCw size={14} />
                </button>
              </div>

              {/* Right Column: Speed, Volume, Download, Share */}
              <div className="flex flex-wrap items-center justify-start gap-2.5 md:justify-end sm:gap-3">
                {/* Playback Speed Pill */}
                <button
                  type="button"
                  onClick={cycleSpeed}
                  className="border border-white/25 px-2 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-white/85 transition-colors hover:border-brand-400 hover:text-brand-300"
                  title="Cycle playback speed (0.75x to 2x)"
                >
                  {playbackSpeed}x
                </button>

                {/* Volume Slider with Mute Toggle */}
                <div className="flex items-center gap-1.5 group">
                  <button
                    type="button"
                    onClick={toggleMute}
                    className="p-1 text-white/80 hover:text-white"
                    aria-label={isMuted ? 'Unmute (M)' : 'Mute (M)'}
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX size={16} className="text-red-400" />
                    ) : volume < 0.5 ? (
                      <Volume1 size={16} />
                    ) : (
                      <Volume2 size={16} />
                    )}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    aria-label="Volume slider"
                    className="h-1 w-14 cursor-pointer appearance-none bg-white/25 accent-brand-500 hover:bg-white/40 sm:w-16"
                  />
                </div>

                {/* Instant MP3 Download Button */}
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex items-center gap-1 border border-white/25 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-white/85 transition-colors hover:border-brand-400 hover:text-brand-300 disabled:opacity-50"
                  title="Download MP3 for offline listening"
                  aria-label="Download MP3"
                >
                  <Download size={12} className={isDownloading ? 'animate-bounce' : ''} />
                  <span className="hidden sm:inline">
                    {isDownloading ? 'Saving…' : 'MP3'}
                  </span>
                </button>

                {/* Share Message */}
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-1 border border-white/25 px-2 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-white/85 transition-colors hover:border-white hover:text-white"
                  title="Share sermon link"
                  aria-label="Share sermon link"
                >
                  {isCopied ? (
                    <>
                      <Check size={12} className="text-brand-400" />
                      <span className="text-brand-300 text-[0.58rem]">Copied!</span>
                    </>
                  ) : (
                    <Share2 size={12} />
                  )}
                </button>

                <a
                  href={SOCIAL_LINKS.mixlr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden items-center gap-1 border border-white/30 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-white/90 hover:bg-white hover:text-ink-950 lg:inline-flex"
                >
                  <span>Mixlr</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </div>

            {/* Timeline Progress Slider */}
            <div className="mt-2.5 flex items-center gap-3">
              <span className="w-10 text-right font-mono text-[0.7rem] text-white/60">
                {formatAudioTime(currentTime)}
              </span>

              <div className="relative flex-1">
                <input
                  ref={progressBarRef}
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Sermon progress"
                  className="h-1.5 w-full cursor-pointer appearance-none bg-white/20 accent-brand-500 hover:bg-white/30"
                  style={{
                    background: `linear-gradient(to right, #22c55e ${progressPercent}%, rgba(255,255,255,0.2) ${progressPercent}%)`,
                  }}
                />
              </div>

              <span className="w-10 font-mono text-[0.7rem] text-white/60">
                {formatAudioTime(duration)}
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Mixlr Live Broadcast Mode */}
        {activeTab === 'mixlr' && (
          <div className="pt-2 sm:pt-3">
            <div className="grid gap-3 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="live-dot" />
                  <span className="text-[0.64rem] font-bold uppercase tracking-[0.2em] text-red-400">
                    Mixlr Live Stream &bull; Christ The Potter Church
                  </span>
                </div>
                <h4 className="mt-0.5 font-display text-lg uppercase sm:text-xl">
                  Live Service Broadcast
                </h4>
                <p className="mt-0.5 text-xs leading-relaxed text-white/70">
                  Broadcasts live during Sunday Service (8:00 AM WAT), Tuesday School of Prayer (5:00 PM), and Thursday Revelational Hour (5:00 PM).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5 md:justify-end">
                <a
                  href={SOCIAL_LINKS.mixlr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-red-500 bg-red-600 px-3.5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-700 shadow-md"
                >
                  <Radio size={14} />
                  <span>Open Mixlr Live Channel</span>
                  <ExternalLink size={12} />
                </a>

                <button
                  type="button"
                  onClick={() => setActiveTab('sermon')}
                  className="border border-white/25 px-3 py-2 text-xs font-semibold text-white/80 hover:border-white hover:text-white"
                >
                  Back to Recorded Sermons
                </button>
              </div>
            </div>

            {/* Embedded Mixlr widget iframe */}
            <div className="mt-2.5 overflow-hidden border border-white/10 bg-black/40">
              <iframe
                title="Mixlr Live Player"
                src="https://mixlr.com/users/christ-the-potter-church/embed"
                width="100%"
                height="120px"
                scrolling="no"
                frameBorder="no"
                marginHeight="0"
                marginWidth="0"
                className="w-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

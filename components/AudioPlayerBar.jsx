'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Radio,
  X,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { SOCIAL_LINKS } from '../lib/site-config';

function formatTime(seconds) {
  if (isNaN(seconds) || seconds === null) return '0:00';
  const s = Math.floor(seconds);
  const hrs = Math.floor(s / 3600);
  const mins = Math.floor((s % 3600) / 60);
  const secs = s % 60;

  if (hrs > 0) {
    return `${hrs}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

export default function AudioPlayerBar() {
  const audioRef = useRef(null);

  const [track, setTrack] = useState({
    id: 'divine-help',
    title: 'Cultivating the Habit of Seeking & Receiving Divine Help in the Time of Need',
    minister: 'Apostle Oluwafunminiyi Olufisayo',
    category: 'Prayer & Grace',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    mode: 'sermon',
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [activeTab, setActiveTab] = useState('sermon'); // 'sermon' | 'mixlr'

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
      } else {
        setActiveTab('sermon');
        setTimeout(() => {
          if (audioRef.current) {
            audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
          }
        }, 100);
      }
    };

    window.addEventListener('play-cpc-sermon', onPlay);
    return () => window.removeEventListener('play-cpc-sermon', onPlay);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  const handleSeek = (e) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const skipTime = (delta) => {
    if (!audioRef.current) return;
    const next = Math.max(0, Math.min(duration, audioRef.current.currentTime + delta));
    audioRef.current.currentTime = next;
    setCurrentTime(next);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5];
    const next = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
    setPlaybackSpeed(next);
    if (audioRef.current) {
      audioRef.current.playbackRate = next;
    }
  };

  // Minimized Floating Launcher Pill
  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2.5 border border-white/20 bg-ink-950 px-4 py-3 text-[0.66rem] font-bold uppercase tracking-[0.2em] text-white shadow-2xl transition-all hover:bg-brand-700 sm:bottom-6 sm:right-6"
        aria-label="Open audio player"
      >
        <span className="live-dot" />
        {isPlaying ? (
          <span className="flex items-center gap-1.5 text-brand-300">
            <span className="inline-block h-2 w-2 animate-ping rounded-full bg-brand-300" />
            Playing: {track.title.slice(0, 22)}…
          </span>
        ) : (
          <span>Audio Player / Mixlr</span>
        )}
      </button>
    );
  }

  return (
    <div
      role="region"
      aria-label="Audio Player"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-white/15 bg-ink-950 text-white shadow-2xl backdrop-blur-lg"
    >
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={track.audioUrl || undefined}
        onTimeUpdate={() => audioRef.current && setCurrentTime(audioRef.current.currentTime)}
        onLoadedMetadata={() => audioRef.current && setDuration(audioRef.current.duration)}
        onEnded={() => setIsPlaying(false)}
        preload="metadata"
      />

      <div className="mx-auto max-w-[1240px] px-4 py-3.5 sm:px-6 sm:py-4">
        {/* Top Header bar: Tab toggles & window actions */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2.5 text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                setActiveTab('sermon');
              }}
              className={`flex items-center gap-1.5 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.16em] transition-colors ${
                activeTab === 'sermon'
                  ? 'border border-brand-400 bg-brand-600 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <span>Sermon Track</span>
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
                  ? 'border border-red-500 bg-red-600 text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              <span className="live-dot" />
              <span>Mixlr Live Broadcast</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
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
          <div className="pt-3">
            <div className="grid grid-cols-1 items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
              {/* Left Column: Track Info */}
              <div className="min-w-0 pr-2">
                <div className="flex items-center gap-2">
                  <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-brand-300">
                    {track.category || 'Apostolic Teaching'}
                  </span>
                  {isPlaying && (
                    <span className="inline-flex items-center gap-1 text-[0.58rem] font-bold uppercase text-brand-400">
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-400" />
                      Playing
                    </span>
                  )}
                </div>
                <h4 className="mt-1 truncate font-display text-lg uppercase leading-tight sm:text-xl">
                  {track.title}
                </h4>
                <p className="truncate text-xs text-white/65">
                  {track.minister} {track.scripture ? `· ${track.scripture}` : ''}
                </p>
              </div>

              {/* Center Column: Playback Controls */}
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => skipTime(-15)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white"
                  aria-label="Rewind 15 seconds"
                  title="Rewind 15 seconds"
                >
                  <RotateCcw size={15} />
                </button>

                <button
                  type="button"
                  onClick={togglePlay}
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-600 text-white transition-all hover:bg-brand-500 hover:scale-105"
                  aria-label={isPlaying ? 'Pause sermon' : 'Play sermon'}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
                </button>

                <button
                  type="button"
                  onClick={() => skipTime(15)}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white"
                  aria-label="Forward 15 seconds"
                  title="Skip forward 15 seconds"
                >
                  <RotateCw size={15} />
                </button>
              </div>

              {/* Right Column: Speed, Mute, Mixlr Shortcut */}
              <div className="flex items-center justify-start gap-3 md:justify-end">
                <button
                  type="button"
                  onClick={cycleSpeed}
                  className="border border-white/25 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-white/80 transition-colors hover:border-white hover:text-white"
                  title="Playback speed"
                >
                  {playbackSpeed}x
                </button>

                <button
                  type="button"
                  onClick={toggleMute}
                  className="p-1.5 text-white/80 hover:text-white"
                  aria-label={isMuted ? 'Unmute' : 'Mute'}
                  title={isMuted ? 'Unmute' : 'Mute'}
                >
                  {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
                </button>

                <a
                  href={SOCIAL_LINKS.mixlr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden items-center gap-1 border border-white/30 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-wider text-white/90 hover:bg-white hover:text-ink-950 sm:inline-flex"
                >
                  <span>Mixlr Archive</span>
                  <ExternalLink size={11} />
                </a>
              </div>
            </div>

            {/* Timeline Progress Slider */}
            <div className="mt-3 flex items-center gap-3">
              <span className="w-10 text-right font-mono text-[0.7rem] text-white/60">
                {formatTime(currentTime)}
              </span>

              <div className="relative flex-1">
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  step="0.1"
                  value={currentTime}
                  onChange={handleSeek}
                  aria-label="Sermon progress"
                  className="h-1.5 w-full cursor-pointer appearance-none bg-white/20 accent-brand-500 hover:bg-white/30"
                />
              </div>

              <span className="w-10 font-mono text-[0.7rem] text-white/60">
                {formatTime(duration)}
              </span>
            </div>
          </div>
        )}

        {/* Tab 2: Mixlr Live Broadcast Mode */}
        {activeTab === 'mixlr' && (
          <div className="pt-3">
            <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr] md:items-center">
              <div>
                <div className="flex items-center gap-2">
                  <span className="live-dot" />
                  <span className="text-[0.64rem] font-bold uppercase tracking-[0.2em] text-red-400">
                    Mixlr Live Stream &bull; Christ The Potter Church
                  </span>
                </div>
                <h4 className="mt-1 font-display text-xl uppercase sm:text-2xl">
                  Live Service Broadcast
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-white/70">
                  Broadcasts live during Sunday Service (8:00 AM WAT), Tuesday School of Prayer (5:00 PM), and Thursday Revelational Hour (5:00 PM).
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 md:justify-end">
                <a
                  href={SOCIAL_LINKS.mixlr}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-red-500 bg-red-600 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-700"
                >
                  <Radio size={14} />
                  <span>Open Mixlr Web / App</span>
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

            {/* Embedded Mixlr widget preview */}
            <div className="mt-3 overflow-hidden border border-white/10 bg-black/40">
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

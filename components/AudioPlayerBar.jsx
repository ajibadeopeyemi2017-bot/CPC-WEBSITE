'use client';

import { useState, useEffect } from 'react';
import { Radio, X, ExternalLink } from 'lucide-react';
import { SOCIAL_LINKS } from '../lib/site-config';

// There are no hosted audio files yet, so "playing" a sermon surfaces it here
// and hands the listener to Mixlr, where recordings and live streams live.
export default function AudioPlayerBar() {
  const [track, setTrack] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const onPlay = (e) => {
      if (!e.detail) return;
      setTrack(e.detail);
      setIsOpen(true);
    };
    window.addEventListener('play-cpc-sermon', onPlay);
    return () => window.removeEventListener('play-cpc-sermon', onPlay);
  }, []);

  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 flex items-center gap-2.5 bg-ink-950 px-4 py-3 text-[0.64rem] font-bold uppercase tracking-[0.2em] text-white shadow-xl ring-1 ring-white/15 hover:bg-brand-700 sm:bottom-6 sm:right-6"
      >
        <span className="live-dot" />
        Listen live
      </button>
    );
  }

  return (
    <div
      role="region"
      aria-label="Audio"
      className="fixed inset-x-3 bottom-3 z-40 ml-auto flex max-w-xl items-center gap-4 bg-ink-950 p-4 text-white shadow-2xl ring-1 ring-white/15 sm:inset-x-6 sm:bottom-6"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-brand-600">
        <Radio size={18} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold">{track ? track.title : 'Christ The Potter Church — live audio'}</p>
        <p className="truncate text-xs text-white/60">
          {track ? `${track.minister} · ${track.category}` : 'Live during every service'}
        </p>
      </div>
      <a
        href={SOCIAL_LINKS.mixlr}
        target="_blank"
        rel="noopener noreferrer"
        className="flex shrink-0 items-center gap-1.5 border border-white/40 px-3 py-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] hover:bg-white hover:text-ink-950"
      >
        Mixlr
        <ExternalLink size={11} />
      </a>
      <button type="button" onClick={() => setIsOpen(false)} aria-label="Close audio bar" className="shrink-0 text-white/60 hover:text-white">
        <X size={18} />
      </button>
    </div>
  );
}

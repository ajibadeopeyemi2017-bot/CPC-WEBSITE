'use client';

import { useState } from 'react';
import { Volume2, X, Radio } from 'lucide-react';
import { useLiveStatus } from '../hooks/useLiveStatus';
import { playLiveMixlr } from '../lib/sermons';

export default function LiveFloatingBadge() {
  const { isLive, activeService, isSimulated } = useLiveStatus();
  const [dismissed, setDismissed] = useState(false);

  // If not live, or if the user dismissed this session, don't display
  if (!isLive || !activeService || dismissed) return null;

  return (
    <aside
      aria-label="Active Live Stream Indicator"
      className="fixed bottom-20 right-4 z-40 sm:bottom-24 sm:right-6 animate-bounce-subtle"
    >
      <div className="flex items-center gap-3 rounded-full border border-red-500/70 bg-ink-950/95 py-2 pl-3.5 pr-2.5 text-white shadow-2xl backdrop-blur-md ring-2 ring-red-500/20">
        {/* Pulsing indicator */}
        <span className="flex items-center gap-2">
          <span className="live-dot !h-2.5 !w-2.5" />
          <span className="flex items-center gap-1 text-[0.68rem] font-bold uppercase tracking-wider text-red-400">
            Live
          </span>
        </span>

        {/* Divider */}
        <span className="h-3 w-px bg-white/20" />

        {/* Service title */}
        <div className="max-w-[150px] truncate text-xs font-semibold sm:max-w-[200px]">
          {activeService.shortName || activeService.name}
        </div>

        {/* Action Button: Tune in */}
        <button
          type="button"
          onClick={() => playLiveMixlr()}
          className="flex items-center gap-1.5 rounded-full bg-red-600 px-3 py-1 text-[0.68rem] font-bold uppercase tracking-wider text-white shadow transition-all hover:bg-red-500 hover:scale-105"
        >
          <Volume2 size={12} />
          <span>Tune In</span>
        </button>

        {/* Dismiss button */}
        <button
          type="button"
          onClick={() => setDismissed(true)}
          aria-label="Dismiss live alert"
          className="rounded-full p-1 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={13} />
        </button>
      </div>
    </aside>
  );
}

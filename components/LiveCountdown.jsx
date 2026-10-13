'use client';

import { useLiveStatus } from '../hooks/useLiveStatus';
import { playLiveMixlr } from '../lib/sermons';

// Rendered on dark/green backgrounds. State starts null so server and client
// markup match; the real countdown appears after mount.
export default function LiveCountdown() {
  const { isLive, activeService, nextService, countdown, mounted } = useLiveStatus();

  if (!mounted) {
    return (
      <div className="flex min-h-[3.5rem] items-center border-t border-white/20 pt-6 text-white/50 text-xs">
        Connecting to Ile-Ife service schedule...
      </div>
    );
  }

  const parts = countdown
    ? [
        ['d', countdown.days],
        ['h', countdown.hours],
        ['m', countdown.minutes],
        ['s', countdown.seconds],
      ]
    : [];

  return (
    <div className="flex min-h-[3.5rem] flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/20 pt-6 text-white">
      {isLive && activeService && (
        <>
          <span className="flex items-center gap-2.5 text-[0.68rem] font-bold uppercase tracking-[0.25em] text-red-300">
            <span className="live-dot" />
            Live now
          </span>
          <span className="font-display text-2xl uppercase">{activeService.name} is in session</span>
          <button
            type="button"
            onClick={() => playLiveMixlr()}
            className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-brand-300 underline-offset-4 hover:underline"
          >
            Join live audio →
          </button>
        </>
      )}

      {!isLive && nextService && countdown && (
        <>
          <div>
            <span className="block text-[0.62rem] font-bold uppercase tracking-[0.3em] text-white/70">
              Next gathering (WAT)
            </span>
            <span className="text-sm text-white/90">
              {nextService.name} ({nextService.time})
            </span>
          </div>
          <div className="flex items-baseline gap-4 font-display text-3xl tabular-nums" aria-hidden="true">
            {parts.map(([unit, value]) => (
              <span key={unit}>
                {String(value).padStart(2, '0')}
                <span className="ml-0.5 font-sans text-xs font-semibold uppercase text-white/60">{unit}</span>
              </span>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

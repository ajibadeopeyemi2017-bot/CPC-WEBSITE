'use client';

import { useState, useEffect } from 'react';
import { SERVICE_SCHEDULE, SOCIAL_LINKS } from '../lib/site-config';

function computeState(now) {
  const day = now.getDay();
  const hours = now.getHours();
  const minutes = now.getMinutes();

  const live = SERVICE_SCHEDULE.find((s) => {
    if (s.day !== day || hours < s.hour) return false;
    if (hours > s.liveEndHour) return false;
    return !(hours === s.liveEndHour && minutes > s.liveEndMinute);
  });
  if (live) return { isLive: true, service: live.shortName };

  let nearest = Infinity;
  let service = `${SERVICE_SCHEDULE[0].name} (${SERVICE_SCHEDULE[0].time})`;
  for (const s of SERVICE_SCHEDULE) {
    const candidate = new Date(now);
    candidate.setHours(s.hour, s.minute, 0, 0);
    let dayDiff = s.day - day;
    if (dayDiff < 0 || (dayDiff === 0 && now >= candidate)) dayDiff += 7;
    candidate.setDate(now.getDate() + dayDiff);
    const diff = candidate - now;
    if (diff > 0 && diff < nearest) {
      nearest = diff;
      service = `${s.name} (${s.time})`;
    }
  }

  const total = Math.floor(nearest / 1000);
  return {
    isLive: false,
    service,
    parts: [
      ['d', Math.floor(total / 86400)],
      ['h', Math.floor((total % 86400) / 3600)],
      ['m', Math.floor((total % 3600) / 60)],
      ['s', total % 60],
    ],
  };
}

// Rendered on dark/green backgrounds. State starts null so server and client
// markup match; the real countdown appears after mount.
export default function LiveCountdown() {
  const [state, setState] = useState(null);

  useEffect(() => {
    const tick = () => setState(computeState(new Date()));
    tick();
    const timer = setInterval(tick, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex min-h-[3.5rem] flex-wrap items-center gap-x-6 gap-y-3 border-t border-white/20 pt-6 text-white">
      {state?.isLive && (
        <>
          <span className="flex items-center gap-2.5 text-[0.68rem] font-bold uppercase tracking-[0.25em]">
            <span className="live-dot" />
            Live now
          </span>
          <span className="font-display text-2xl uppercase">{state.service} is in session</span>
          <a
            href={SOCIAL_LINKS.mixlr}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-brand-300 underline-offset-4 hover:underline"
          >
            Join live audio →
          </a>
        </>
      )}
      {state && !state.isLive && (
        <>
          <div>
            <span className="block text-[0.62rem] font-bold uppercase tracking-[0.3em] text-white/70">Next gathering</span>
            <span className="text-sm text-white/90">{state.service}</span>
          </div>
          <div className="flex items-baseline gap-4 font-display text-3xl tabular-nums" aria-hidden="true">
            {state.parts.map(([unit, value]) => (
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

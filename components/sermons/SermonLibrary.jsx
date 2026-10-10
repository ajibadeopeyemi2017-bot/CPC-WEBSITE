'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { Play, Search, Share2, Check, Radio } from 'lucide-react';
import { SERMONS, SERMON_CATEGORIES, playSermon } from '../../lib/sermons';
import { SOCIAL_LINKS } from '../../lib/site-config';
import Container from '../ui/Container';
import Eyebrow from '../ui/Eyebrow';
import Button from '../ui/Button';

function ShareButton({ sermon }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = `${window.location.origin}/sermons#${sermon.id}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: sermon.title, text: `${sermon.title} — ${sermon.minister}`, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // User dismissed the share sheet, or clipboard is unavailable.
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      aria-label={`Share ${sermon.title}`}
      className="flex h-9 w-9 items-center justify-center border border-ink-950/20 text-ink-950/70 hover:border-ink-950 hover:text-ink-950"
    >
      {copied ? <Check size={14} className="text-brand-600" /> : <Share2 size={14} />}
    </button>
  );
}

export default function SermonLibrary() {
  const [category, setCategory] = useState('All');
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(SERMONS[0]);

  const q = query.trim().toLowerCase();
  const filtered = SERMONS.filter(
    (s) =>
      (category === 'All' || s.category === category) &&
      (!q || [s.title, s.scripture, s.series].some((field) => field.toLowerCase().includes(q)))
  );

  const play = (sermon) => {
    setActive(sermon);
    playSermon(sermon);
  };

  return (
    <>
      <section className="py-20 lg:py-24">
        <Container>
          <div className="grid gap-10 bg-ink-950 p-8 text-white sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <Eyebrow tone="light">Featured message</Eyebrow>
              <h2 className="mt-5 font-display text-[2.2rem] uppercase leading-[0.95] sm:text-5xl">{active.title}</h2>
              <p className="mt-4 text-[0.64rem] font-bold uppercase tracking-[0.22em] text-brand-300">
                {active.minister} · {active.scripture} · {active.duration}
              </p>
              <p className="mt-5 max-w-2xl leading-relaxed text-white/80">{active.description}</p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <Button variant="solid" size="lg" onClick={() => playSermon(active)}>
                <Play size={14} />
                Listen
              </Button>
              <Button variant="outlineLight" size="lg" href={SOCIAL_LINKS.mixlr} external>
                <Radio size={14} />
                Mixlr
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-20 lg:pb-28">
        <Container>
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Sermon library</Eyebrow>
              <h2 className="mt-4 font-display text-[2.4rem] uppercase leading-[0.95] text-ink-950 sm:text-5xl">
                Apostolic teaching
              </h2>
              <p className="mt-2 text-sm text-ink-950/60" aria-live="polite">
                Showing {filtered.length} of {SERMONS.length} messages
              </p>
            </div>
            <label className="relative block w-full md:max-w-sm">
              <span className="sr-only">Search sermons</span>
              <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-950/40" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, scripture, or series…"
                className="w-full border border-ink-950/20 bg-white py-3 pl-11 pr-4 text-base text-ink-950 placeholder:text-ink-950/40 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/15 sm:text-sm"
              />
            </label>
          </div>

          <div className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by category">
            {SERMON_CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                aria-pressed={category === cat}
                className={clsx(
                  'shrink-0 border px-4 py-2 text-[0.64rem] font-bold uppercase tracking-[0.18em] transition-colors',
                  category === cat ? 'border-ink-950 bg-ink-950 text-white' : 'border-ink-950/20 text-ink-950 hover:border-ink-950'
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 ? (
            <p className="mt-10 border-t border-ink-950/10 pt-10 text-ink-950/60">
              No messages match “{query}”. Try a different word or category.
            </p>
          ) : (
            <ul className="mt-10 border-b border-ink-950/10">
              {filtered.map((sermon) => (
                <li
                  key={sermon.id}
                  id={sermon.id}
                  className={clsx(
                    'grid scroll-mt-24 gap-4 border-t py-6 md:grid-cols-[1fr_auto] md:items-center md:gap-10',
                    active.id === sermon.id ? 'border-t-2 border-brand-600' : 'border-ink-950/10'
                  )}
                >
                  <div>
                    <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-brand-600">
                      {sermon.category} · {sermon.occasion}
                    </p>
                    <h3 className="mt-2 font-display text-xl uppercase leading-tight text-ink-950 sm:text-2xl">{sermon.title}</h3>
                    <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-950/65">{sermon.description}</p>
                    <p className="mt-2 text-xs text-ink-950/50">
                      {sermon.scripture} · {sermon.series} · {sermon.duration}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outlineDark" size="sm" onClick={() => play(sermon)} aria-label={`Play ${sermon.title}`}>
                      <Play size={12} />
                      Play
                    </Button>
                    <ShareButton sermon={sermon} />
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}

'use client';

import { Play, ArrowRight } from 'lucide-react';
import { SERMONS, playSermon } from '../../lib/sermons';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';

const latest = SERMONS.slice(0, 4);

export default function LatestSermons() {
  return (
    <section className="pb-20 lg:pb-28">
      <Container>
        <SectionHeader
          eyebrow="From the pulpit"
          title="Latest messages"
          aside="“Man shall not live by bread alone, but by every word that proceeds from the mouth of God.” Invest in your spirit man."
        />

        <ol className="border-b border-ink-950/10">
          {latest.map((sermon, i) => (
            <li
              key={sermon.id}
              className="grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-4 border-t border-ink-950/10 py-6 md:grid-cols-[auto_1fr_auto_auto] md:gap-x-8"
            >
              <span className="font-display text-3xl text-brand-600 md:text-4xl">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="font-display text-xl uppercase leading-tight text-ink-950 md:text-2xl">{sermon.title}</h3>
                <p className="mt-1.5 text-[0.64rem] font-bold uppercase tracking-[0.22em] text-ink-950/55">
                  {sermon.series} · {sermon.scripture}
                </p>
              </div>
              <span className="col-start-2 text-sm text-ink-950/60 md:col-start-auto">{sermon.duration}</span>
              <Button
                variant="outlineDark"
                size="sm"
                onClick={() => playSermon(sermon)}
                className="col-start-2 justify-self-start md:col-start-auto"
                aria-label={`Play ${sermon.title}`}
              >
                <Play size={12} />
                Play
              </Button>
            </li>
          ))}
        </ol>

        <Button variant="outlineDark" href="/sermons" className="mt-10">
          Full sermon archive
          <ArrowRight size={14} />
        </Button>
      </Container>
    </section>
  );
}

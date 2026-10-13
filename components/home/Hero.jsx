'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { ArrowRight, Radio, Volume2 } from 'lucide-react';
import { SOCIAL_LINKS } from '../../lib/site-config';
import { useLiveStatus } from '../../hooks/useLiveStatus';
import { playLiveMixlr } from '../../lib/sermons';
import Container from '../ui/Container';
import Button from '../ui/Button';
import PlanVisitTrigger from '../PlanVisitTrigger';

const slides = [
  {
    eyebrow: 'Ile-Ife · Osun State · Nigeria',
    line1: 'Christ The Potter.',
    line2: 'Walk in the reality of Christ.',
    image: '/images/pastor-action.jpg',
    alt: 'Apostle Oluwafunminiyi Olufisayo',
  },
  {
    eyebrow: 'KYMC 2026 · September 24 – 26',
    line1: 'Kingdom Young Ministers.',
    line2: 'The man the Lord will work with.',
    image: '/images/pastor-portrait.jpg',
    alt: 'Apostle Oluwafunminiyi Olufisayo, convener of KYMC',
  },
  {
    eyebrow: 'Sundays 8:00AM · Tue & Thu 5:00PM',
    line1: 'You belong here.',
    line2: 'Come as you are.',
    image: '/images/pastor-oluwafunminiyi.jpg',
    alt: 'Apostle Oluwafunminiyi Olufisayo',
  },
];

const SLIDE_MS = 7000;

export default function Hero() {
  const [active, setActive] = useState(0);
  const { isLive } = useLiveStatus();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = setInterval(() => setActive((i) => (i + 1) % slides.length), SLIDE_MS);
    return () => clearInterval(timer);
  }, [active]);

  return (
    <section className="relative isolate flex min-h-[600px] flex-col overflow-hidden bg-ink-950 text-white sm:min-h-[640px] lg:min-h-[700px]">
      <h1 className="sr-only">Christ The Potter Church, Ile-Ife</h1>

      {slides.map((slide, i) => (
        <div
          key={slide.image}
          aria-hidden={i !== active}
          className={clsx(
            'absolute inset-0 transition-opacity duration-1000',
            i === active ? 'opacity-100' : 'pointer-events-none opacity-0'
          )}
        >
          <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover object-[center_20%]"
            />
          </div>
          <div className="absolute inset-0 bg-ink-950/70 lg:bg-gradient-to-r lg:from-ink-950 lg:via-ink-950/70 lg:to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950/90 to-transparent" />
        </div>
      ))}

      <Container className="relative z-10 mt-auto pb-12 pt-32">
        {/* All slide texts share one grid cell, so the block is as tall as the longest slide. */}
        <div className="grid">
          {slides.map((slide, i) => (
            <div
              key={slide.line1}
              aria-hidden={i !== active}
              className={clsx(
                'self-end transition-opacity duration-500 [grid-area:1/1]',
                i === active ? 'opacity-100 delay-300' : 'opacity-0'
              )}
            >
              <p className="text-[0.66rem] font-bold uppercase tracking-[0.35em] text-white/80">{slide.eyebrow}</p>
              <h2 className="mt-5 max-w-[1100px] font-display text-[2.7rem] uppercase leading-[0.92] sm:text-[4rem] lg:text-[5rem]">
                <span className="block">{slide.line1}</span>
                <span className="block text-brand-300">{slide.line2}</span>
              </h2>
            </div>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap gap-3">
          <PlanVisitTrigger variant="solid" size="lg" className="w-full sm:w-auto">
            Plan a Visit
            <ArrowRight size={14} />
          </PlanVisitTrigger>
          {isLive ? (
            <button
              type="button"
              onClick={() => playLiveMixlr()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded bg-red-600 hover:bg-red-500 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white shadow-xl shadow-red-950/70 transition-all hover:scale-105"
            >
              <span className="live-dot !h-2.5 !w-2.5" />
              <Volume2 size={15} />
              <span>Listen Live Now</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => playLiveMixlr()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded border border-white/40 bg-white/10 hover:bg-white hover:text-ink-950 px-6 py-3.5 text-xs font-bold uppercase tracking-[0.16em] text-white transition-all"
            >
              <Radio size={14} />
              <span>Join Live Online</span>
            </button>
          )}
          <Button variant="outlineLight" size="lg" href="/sermons" className="w-full sm:w-auto">
            Sermons
          </Button>
        </div>

        <div className="mt-10 flex gap-2.5" role="tablist" aria-label="Hero slides">
          {slides.map((slide, i) => (
            <button
              key={slide.image}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show slide ${i + 1}: ${slide.line1}`}
              onClick={() => setActive(i)}
              className="py-2"
            >
              <span
                className={clsx(
                  'block h-[2px] w-8 transition-colors',
                  i === active ? 'bg-white' : 'bg-white/30 hover:bg-white/60'
                )}
              />
            </button>
          ))}
        </div>
      </Container>

      <span className="absolute bottom-8 left-1/2 hidden h-10 w-px bg-white/40 lg:block" aria-hidden="true" />
    </section>
  );
}

'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { ArrowRight, Radio, Volume2 } from 'lucide-react';
import { useLiveStatus } from '../../hooks/useLiveStatus';
import { playLiveMixlr } from '../../lib/sermons';
import Container from '../ui/Container';
import Button from '../ui/Button';
import PlanVisitTrigger from '../PlanVisitTrigger';

const slides = [
  {
    eyebrow: 'WELCOME ;',
    line1: 'CHRIST THE POTTER CHURCH',
    sublocation: 'Ile Ife. Osun State. Nigeria',
    line2: 'Teaching Men to Walk in the reality of who Christ is',
    image: '/images/pastor-action.jpg',
    alt: 'Christ The Potter Church, Ile-Ife',
  },
  {
    eyebrow: 'DIVINE ENCOUNTERS',
    line1: 'YOU ARE AT THE RIGHT PLACE',
    line2: 'FOR DIVINE ENCOUNTERS THAT BRING TOTAL TRANSFORMATION IN YOUR LIFE',
    image: '/images/pastor-portrait.jpg',
    alt: 'Apostle Oluwafunminiyi Olufisayo',
  },
  {
    eyebrow: 'CHURCH FAMILY',
    line1: 'YOU BELONG HERE.',
    line2: 'COME AS YOU ARE AND BE TRANSFORMED TO YOUR BEST ORDAINED VERSION',
    image: '/images/pastor-oluwafunminiyi.jpg',
    alt: 'Christ The Potter Church Family',
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
    <section className="relative isolate flex min-h-[520px] flex-col overflow-hidden bg-ink-950 text-white sm:min-h-[640px] lg:min-h-[700px]">
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
          <div className="absolute inset-0 bg-ink-950/75 lg:bg-gradient-to-r lg:from-ink-950 lg:via-ink-950/70 lg:to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink-950/95 to-transparent" />
        </div>
      ))}

      <Container className="relative z-10 mt-auto pb-8 pt-20 sm:pb-12 sm:pt-32">
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
              <p className="text-[0.64rem] font-bold uppercase tracking-[0.3em] text-brand-300 sm:text-[0.68rem] sm:tracking-[0.35em]">
                {slide.eyebrow}
              </p>
              <h2 className="mt-3 max-w-[1100px] font-display text-[2.05rem] uppercase leading-[0.94] sm:mt-4 sm:text-[3.8rem] sm:leading-[0.92] lg:text-[4.6rem]">
                <span className="block">{slide.line1}</span>
                {slide.sublocation && (
                  <span className="my-1.5 block font-sans text-[0.7rem] font-semibold normal-case tracking-[0.18em] text-white/80 sm:text-sm sm:tracking-[0.22em]">
                    ({slide.sublocation})
                  </span>
                )}
                <span className="mt-2 block font-sans text-base font-medium leading-snug normal-case text-white/95 sm:text-3xl sm:leading-tight lg:text-4xl">
                  {slide.line2}
                </span>
              </h2>
            </div>
          ))}
        </div>

        <div className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-9 sm:flex sm:flex-wrap sm:gap-3">
          <PlanVisitTrigger variant="solid" size="lg" className="col-span-2 w-full sm:w-auto">
            Plan a Visit
            <ArrowRight size={14} />
          </PlanVisitTrigger>
          {isLive ? (
            <button
              type="button"
              onClick={() => playLiveMixlr()}
              className="inline-flex w-full items-center justify-center gap-2 rounded bg-red-600 px-4 py-3 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-white shadow-xl shadow-red-950/70 transition-all hover:bg-red-500 sm:w-auto sm:px-6 sm:py-3.5 sm:text-xs sm:tracking-[0.16em]"
            >
              <span className="live-dot !h-2 !w-2" />
              <Volume2 size={14} />
              <span>Listen Live</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => playLiveMixlr()}
              className="inline-flex w-full items-center justify-center gap-2 rounded border border-white/40 bg-white/10 px-4 py-3 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-white transition-all hover:bg-white hover:text-ink-950 sm:w-auto sm:px-6 sm:py-3.5 sm:text-xs sm:tracking-[0.16em]"
            >
              <Radio size={14} />
              <span>Join Live</span>
            </button>
          )}
          <Button variant="outlineLight" size="lg" href="/sermons" className="w-full sm:w-auto">
            Sermons
          </Button>
        </div>

        <div className="mt-7 flex gap-2.5 sm:mt-10" role="tablist" aria-label="Hero slides">
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

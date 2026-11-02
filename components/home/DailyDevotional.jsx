'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  BookOpen,
  Flame,
  Copy,
  Check,
  ArrowRight,
  Download,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import {
  DEVOTIONAL_THEME,
  DEVOTIONAL_AUTHOR,
  DEVOTIONAL_PDF_URL,
  getAllDevotionals,
  getTodayDevotional,
  formatWhatsAppShareText,
} from '../../lib/devotional';
import Container from '../ui/Container';
import Eyebrow from '../ui/Eyebrow';
import Button from '../ui/Button';

function WhatsAppIcon({ size = 15 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.002 3.2C8.932 3.2 3.2 8.929 3.2 15.995c0 2.256.59 4.458 1.71 6.4L3.09 28.8l6.564-1.721a12.798 12.798 0 0 0 6.348 1.696h.005c7.069 0 12.801-5.73 12.801-12.796 0-3.42-1.331-6.635-3.748-9.053A12.716 12.716 0 0 0 16.002 3.2Zm0 23.418h-.004a10.63 10.63 0 0 1-5.419-1.484l-.389-.23-4.03 1.057 1.076-3.928-.253-.403a10.597 10.597 0 0 1-1.628-5.635c0-5.869 4.777-10.644 10.651-10.644 2.844 0 5.518 1.108 7.529 3.12a10.576 10.576 0 0 1 3.118 7.526c0 5.87-4.778 10.621-10.651 10.621Zm5.842-7.973c-.32-.16-1.894-.934-2.187-1.041-.293-.107-.507-.16-.72.16-.214.32-.827 1.041-1.014 1.254-.187.214-.373.24-.693.08-.32-.16-1.351-.498-2.574-1.588-.951-.848-1.594-1.896-1.78-2.216-.187-.32-.02-.493.14-.653.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.214.053-.4-.027-.56-.08-.16-.72-1.734-.987-2.375-.26-.624-.524-.539-.72-.549-.186-.009-.4-.011-.613-.011-.214 0-.56.08-.854.4-.293.32-1.12 1.094-1.12 2.668 0 1.574 1.147 3.095 1.307 3.309.16.213 2.257 3.446 5.468 4.832.764.33 1.36.527 1.825.674.767.244 1.465.209 2.017.127.615-.092 1.894-.774 2.161-1.521.267-.747.267-1.387.187-1.521-.08-.133-.294-.213-.614-.373Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function DailyDevotional() {
  const allDays = getAllDevotionals();
  const [dayNumber, setDayNumber] = useState(1);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const today = getTodayDevotional();
    setDayNumber(today.day);
  }, []);

  const current = allDays.find((d) => d.day === dayNumber) || allDays[0];
  const prevDay = dayNumber > 1 ? dayNumber - 1 : 31;
  const nextDay = dayNumber < 31 ? dayNumber + 1 : 1;

  const handleCopyDecree = async () => {
    const text = `TODAY'S APOSTOLIC DECREE (${current.dayFormatted} — ${current.title}):\n"${current.prayer}"\n— ${DEVOTIONAL_AUTHOR}, Christ The Potter Church`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  const getWhatsAppHref = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://christthepotterchurch.org';
    const text = formatWhatsAppShareText(current, origin);
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="devotional" className="border-y border-ink-950/10 bg-sand-50 py-20 lg:py-28">
      <Container>
        {/* Header Bar */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:mb-14 md:flex-row md:items-end">
          <div>
            <Eyebrow>Daily Devotional &amp; Apostolic Decree</Eyebrow>
            <h2 className="mt-4 font-display text-[2.4rem] uppercase leading-[0.95] text-ink-950 sm:text-5xl lg:text-[3.6rem]">
              Today&apos;s Prophetic Word
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setDayNumber(prevDay)}
              className="inline-flex items-center gap-1 border border-ink-950/15 bg-white px-3.5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink-950 transition-colors hover:border-brand-600"
              aria-label="Previous day devotional"
            >
              <ChevronLeft size={14} />
              Prev
            </button>

            <span className="border border-brand-600/30 bg-brand-600 px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-white">
              {current.dayFormatted} of 31
            </span>

            <button
              type="button"
              onClick={() => setDayNumber(nextDay)}
              className="inline-flex items-center gap-1 border border-ink-950/15 bg-white px-3.5 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink-950 transition-colors hover:border-brand-600"
              aria-label="Next day devotional"
            >
              Next
              <ChevronRight size={14} />
            </button>

            <Button variant="outlineDark" size="sm" href="/devotional">
              All 31 Days
            </Button>
          </div>
        </div>

        {/* Main Card Grid */}
        <div className="grid gap-8 lg:grid-cols-[1.35fr_0.85fr] lg:items-stretch">
          {/* Left: Devotional Reading & Apostolic Decree */}
          <div className="flex flex-col justify-between border border-ink-950/10 bg-white p-6 shadow-sm sm:p-9 lg:p-11">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 bg-brand-50 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-brand-700">
                  <Sparkles size={12} />
                  {DEVOTIONAL_THEME}
                </span>
                <span className="text-xs font-semibold text-ink-950/60">
                  {current.date} · By {DEVOTIONAL_AUTHOR}
                </span>
              </div>

              <h3 className="mt-4 font-display text-2xl uppercase leading-[1.02] text-ink-950 sm:text-3xl lg:text-[2.2rem]">
                <Link href={`/devotional/${current.slug}`} className="hover:text-brand-600">
                  {current.title}
                </Link>
              </h3>

              {/* Anchor Scripture */}
              <div className="mt-5 border-l-4 border-[#d4af37] bg-[#fbf8ef] p-4 sm:p-5">
                <div className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-[#9a7b1c]">
                  <BookOpen size={14} />
                  <span>Anchor Scripture: {current.anchorScripture}</span>
                </div>
                <p className="mt-1.5 font-serif text-sm italic leading-relaxed text-ink-950/90 sm:text-[0.95rem]">
                  &ldquo;{current.anchorVerse}&rdquo;
                </p>
              </div>

              {/* Excerpt */}
              <p className="mt-5 text-[0.96rem] leading-[1.8] text-ink-950/80">
                {current.body[0]}
              </p>

              {/* Apostolic Decree Box */}
              <div className="mt-6 border border-brand-600 bg-ink-950 p-5 text-white sm:p-6">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#d4af37]">
                    <Flame size={14} />
                    Today&apos;s Apostolic Decree
                  </span>
                  <span className="text-[0.62rem] font-semibold uppercase tracking-widest text-white/55">
                    Bible In A Year: {current.bibleInAYear.split('·')[0]}...
                  </span>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-white/95 sm:text-[0.95rem]">
                  &ldquo;{current.prayer}&rdquo;
                </p>

                <div className="mt-4 flex flex-wrap items-center gap-2.5 border-t border-white/15 pt-4">
                  <a
                    href={getWhatsAppHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white transition-transform hover:scale-[1.02]"
                  >
                    <WhatsAppIcon size={14} />
                    Share Decree on WhatsApp
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyDecree}
                    className="inline-flex items-center gap-1.5 border border-white/30 bg-white/10 px-3.5 py-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white hover:text-ink-950"
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? 'Copied!' : 'Copy Decree'}
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-ink-950/10 pt-5">
              <Link
                href={`/devotional/${current.slug}`}
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-600 hover:text-brand-700"
              >
                Read Full Devotional &amp; Meditation
                <ArrowRight size={15} />
              </Link>

              <a
                href={DEVOTIONAL_PDF_URL}
                download="CPC_Daily_Devotional_31Days.pdf"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.16em] text-ink-950/70 hover:text-ink-950"
              >
                <Download size={14} className="text-brand-600" />
                Download 31-Day PDF Booklet
              </a>
            </div>
          </div>

          {/* Right: Visual Daily Devotional Card Preview */}
          <div className="flex flex-col justify-between border border-ink-950/10 bg-ink-950 p-5 text-white">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <p className="text-[0.64rem] font-bold uppercase tracking-[0.24em] text-[#d4af37]">
                  Official Daily Card
                </p>
                <p className="font-display text-lg uppercase text-white">
                  {current.dayFormatted} Status Card
                </p>
              </div>
              <a
                href={current.cardImage}
                download={`CPC_${current.dayFormatted.replace(' ', '_')}.png`}
                className="inline-flex items-center gap-1.5 bg-brand-600 px-3 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white hover:bg-brand-700"
              >
                <Download size={12} />
                Save Card
              </a>
            </div>

            <Link
              href={`/devotional/${current.slug}`}
              className="group relative aspect-[9/16] w-full overflow-hidden border border-white/15 bg-black"
            >
              <Image
                src={current.cardImage}
                alt={`${current.dayFormatted} - ${current.title}`}
                fill
                sizes="(min-width: 1024px) 400px, 100vw"
                className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </Link>

            <div className="mt-4 flex items-center justify-between text-[0.68rem] text-white/70">
              <span>Save &amp; post on your WhatsApp Status</span>
              <Link
                href="/devotional"
                className="font-bold uppercase tracking-wider text-brand-300 hover:underline"
              >
                Open Reader &rarr;
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


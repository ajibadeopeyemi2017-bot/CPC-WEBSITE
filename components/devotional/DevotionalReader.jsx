'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import {
  BookOpen,
  Sparkles,
  Copy,
  Check,
  Download,
  ChevronLeft,
  ChevronRight,
  Calendar,
  CheckCircle2,
  Circle,
  Compass,
  Flame,
  FileText,
  Maximize2,
  X,
} from 'lucide-react';
import {
  DEVOTIONAL_THEME,
  DEVOTIONAL_AUTHOR,
  DEVOTIONAL_AUTHOR_ROLE,
  DEVOTIONAL_PDF_URL,
  getAllDevotionals,
  getTodayDevotional,
  formatWhatsAppShareText,
} from '../../lib/devotional';
import Container from '../ui/Container';

function WhatsAppIcon({ size = 16, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
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

export default function DevotionalReader({ initialDay }) {
  const allDays = getAllDevotionals();
  const [selectedDayNum, setSelectedDayNum] = useState(initialDay || 1);
  const [copiedDecree, setCopiedDecree] = useState(false);
  const [copiedFull, setCopiedFull] = useState(false);
  const [amenDeclared, setAmenDeclared] = useState(false);
  const [checkedReadings, setCheckedReadings] = useState({});
  const [cardModalOpen, setCardModalOpen] = useState(false);

  // Sync with client today date if no explicit initialDay was passed
  useEffect(() => {
    if (!initialDay) {
      const todayDevotional = getTodayDevotional();
      setSelectedDayNum(todayDevotional.day);
    } else {
      setSelectedDayNum(initialDay);
    }
  }, [initialDay]);

  // Load saved Bible reading checklist & Amen status from localStorage
  useEffect(() => {
    try {
      const savedChecks = localStorage.getItem('cpc_devotional_checks_v1');
      if (savedChecks) {
        setCheckedReadings(JSON.parse(savedChecks));
      }
      const savedAmen = localStorage.getItem(`cpc_amen_day_${selectedDayNum}`);
      setAmenDeclared(savedAmen === 'true');
    } catch {
      // Ignore storage errors
    }
  }, [selectedDayNum]);

  const current = allDays.find((d) => d.day === selectedDayNum) || allDays[0];
  const biblePortions = current.bibleInAYear.split('·').map((s) => s.trim());

  const prevDay = selectedDayNum > 1 ? selectedDayNum - 1 : 31;
  const nextDay = selectedDayNum < 31 ? selectedDayNum + 1 : 1;

  const handleToggleReading = (portion) => {
    const key = `day_${current.day}_${portion}`;
    const updated = { ...checkedReadings, [key]: !checkedReadings[key] };
    setCheckedReadings(updated);
    try {
      localStorage.setItem('cpc_devotional_checks_v1', JSON.stringify(updated));
    } catch {
      // Ignore storage errors
    }
  };

  const handleDeclareAmen = () => {
    const nextVal = !amenDeclared;
    setAmenDeclared(nextVal);
    try {
      localStorage.setItem(`cpc_amen_day_${current.day}`, String(nextVal));
    } catch {
      // Ignore
    }
  };

  const handleCopyDecree = async () => {
    const text = `APOSTOLIC DECREE (${current.dayFormatted} — ${current.title}):\n"${current.prayer}"\n— Apostle Oluwafunminiyi Olufisayo, Christ The Potter Church`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedDecree(true);
      setTimeout(() => setCopiedDecree(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleCopyFullShare = async () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://christthepotterchurch.org';
    const text = formatWhatsAppShareText(current, origin);
    try {
      await navigator.clipboard.writeText(text);
      setCopiedFull(true);
      setTimeout(() => setCopiedFull(false), 2500);
    } catch {
      // Fallback
    }
  };

  const getWhatsAppShareHref = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://christthepotterchurch.org';
    const text = formatWhatsAppShareText(current, origin);
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  const completedCount = biblePortions.filter(
    (portion) => checkedReadings[`day_${current.day}_${portion}`]
  ).length;

  return (
    <section id="reader" className="py-14 lg:py-20">
      <Container>
        {/* Top Day Navigation Bar */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-ink-950/10 pb-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 bg-brand-600 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-white">
              <Sparkles size={13} />
              {DEVOTIONAL_THEME}
            </span>
            <span className="inline-flex items-center gap-1.5 border border-ink-950/15 bg-sand-50 px-3 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink-950">
              <Calendar size={13} className="text-brand-600" />
              {current.dayFormatted} of 31 · {current.date}
            </span>
          </div>

          <div className="grid w-full grid-cols-3 gap-1.5 sm:flex sm:w-auto sm:items-center sm:gap-2">
            <button
              type="button"
              onClick={() => setSelectedDayNum(prevDay)}
              className="inline-flex items-center justify-center gap-1 border border-ink-950/15 bg-white px-2.5 py-2.5 text-[0.64rem] font-bold uppercase tracking-[0.12em] text-ink-950 transition-colors hover:border-brand-600 hover:bg-brand-50 sm:px-3.5 sm:py-2 sm:text-[0.68rem] sm:tracking-[0.16em]"
              title={`Go to Day ${prevDay}`}
            >
              <ChevronLeft size={14} />
              Prev Day
            </button>

            <button
              type="button"
              onClick={() => {
                const t = getTodayDevotional();
                setSelectedDayNum(t.day);
              }}
              className="inline-flex items-center justify-center border border-brand-600/30 bg-brand-50 px-2.5 py-2.5 text-[0.64rem] font-bold uppercase tracking-[0.12em] text-brand-700 transition-colors hover:bg-brand-600 hover:text-white sm:px-3.5 sm:py-2 sm:text-[0.68rem] sm:tracking-[0.16em]"
            >
              Today&apos;s Word
            </button>

            <button
              type="button"
              onClick={() => setSelectedDayNum(nextDay)}
              className="inline-flex items-center justify-center gap-1 border border-ink-950/15 bg-white px-2.5 py-2.5 text-[0.64rem] font-bold uppercase tracking-[0.12em] text-ink-950 transition-colors hover:border-brand-600 hover:bg-brand-50 sm:px-3.5 sm:py-2 sm:text-[0.68rem] sm:tracking-[0.16em]"
              title={`Go to Day ${nextDay}`}
            >
              Next Day
              <ChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Main 2-Column Devotional Layout */}
        <div className="grid gap-10 lg:grid-cols-[1.45fr_0.95fr] lg:items-start">
          {/* LEFT: Full Editorial Devotional & Apostolic Decree */}
          <div className="border border-ink-950/10 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
            {/* Setman Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink-950/10 pb-6">
              <div className="flex items-center gap-3.5">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-brand-600">
                  <Image
                    src="/images/setman.jpg"
                    alt={DEVOTIONAL_AUTHOR}
                    fill
                    sizes="48px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-ink-950">{DEVOTIONAL_AUTHOR}</p>
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand-600">
                    {DEVOTIONAL_AUTHOR_ROLE}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={getWhatsAppShareHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] px-3.5 py-2 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-white shadow-sm transition-transform hover:scale-[1.02]"
                >
                  <WhatsAppIcon size={15} />
                  Share on WhatsApp
                </a>
              </div>
            </div>

            {/* Day & Title */}
            <div className="mt-7">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.24em] text-brand-600">
                {current.dayFormatted} · {current.date}
              </p>
              <h2 className="mt-2 font-display text-3xl uppercase leading-[0.98] text-ink-950 sm:text-4xl lg:text-[2.65rem]">
                {current.title}
              </h2>
            </div>

            {/* Anchor Scripture Box */}
            <div className="mt-7 border-l-4 border-[#d4af37] bg-[#fbf8ef] p-5 sm:p-6">
              <div className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#9a7b1c]">
                <BookOpen size={15} />
                <span>Anchor Scripture: {current.anchorScripture}</span>
              </div>
              <blockquote className="mt-2.5 font-serif text-base italic leading-relaxed text-ink-950/90 sm:text-[1.05rem]">
                &ldquo;{current.anchorVerse}&rdquo;
              </blockquote>
            </div>

            {/* Devotional Message Paragraphs */}
            <div className="mt-8 space-y-5 text-[1.02rem] leading-[1.85] text-ink-950/85">
              {current.body.map((paragraph, index) => (
                <p
                  key={index}
                  className={clsx(
                    index === 0 &&
                      'first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-5xl first-letter:leading-none first-letter:text-brand-600'
                  )}
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Meditation Box */}
            <div className="mt-9 border border-[#d4af37]/40 bg-[#fdfaf2] p-6">
              <div className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#9a7b1c]">
                <Compass size={16} />
                <span>Heart Meditation &amp; Audit</span>
              </div>
              <p className="mt-2.5 text-[0.98rem] font-semibold italic leading-relaxed text-ink-950">
                {current.meditation}
              </p>
            </div>

            {/* Apostolic Decree & Prayer Card */}
            <div className="mt-8 relative overflow-hidden border-2 border-brand-600 bg-ink-950 p-6 text-white sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#d4af37]">
                  <Flame size={16} />
                  <span>Today&apos;s Apostolic Decree &amp; Prayer</span>
                </div>
                <span className="bg-white/10 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-brand-300">
                  Declare Out Loud
                </span>
              </div>

              <p className="mt-4 text-base leading-relaxed text-white/95 sm:text-[1.08rem]">
                &ldquo;{current.prayer}&rdquo;
              </p>

              {/* Action Buttons Inside Decree */}
              <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/15 pt-5">
                <button
                  type="button"
                  onClick={handleDeclareAmen}
                  className={clsx(
                    'inline-flex items-center gap-2 px-4 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] transition-colors',
                    amenDeclared
                      ? 'bg-[#d4af37] text-ink-950'
                      : 'border border-white/30 bg-white/10 text-white hover:bg-white/20'
                  )}
                >
                  <CheckCircle2 size={15} />
                  {amenDeclared ? 'Amen Declared!' : 'I Declare Amen'}
                </button>

                <button
                  type="button"
                  onClick={handleCopyDecree}
                  className="inline-flex items-center gap-2 border border-white/30 bg-white/5 px-4 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-ink-950"
                >
                  {copiedDecree ? <Check size={15} className="text-brand-300" /> : <Copy size={15} />}
                  {copiedDecree ? 'Decree Copied!' : 'Copy Decree'}
                </button>

                <a
                  href={getWhatsAppShareHref()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] px-4 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white transition-transform hover:scale-[1.02]"
                >
                  <WhatsAppIcon size={15} />
                  Share to WhatsApp Status / Group
                </a>
              </div>
            </div>

            {/* Bible In A Year Interactive Reading Tracker */}
            <div className="mt-8 border border-ink-950/10 bg-sand-50 p-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-brand-600">
                    Daily Scripture Diet
                  </p>
                  <h3 className="mt-1 font-display text-xl uppercase text-ink-950">
                    Bible In A Year Reading Plan
                  </h3>
                </div>
                <span className="bg-white px-3 py-1 text-xs font-bold text-brand-700 border border-ink-950/10">
                  {completedCount} / {biblePortions.length} Completed
                </span>
              </div>

              <p className="mt-2 text-xs text-ink-950/65">
                Tick each scripture portion below as you complete your daily Bible reading:
              </p>

              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {biblePortions.map((portion) => {
                  const isDone = !!checkedReadings[`day_${current.day}_${portion}`];
                  return (
                    <button
                      key={portion}
                      type="button"
                      onClick={() => handleToggleReading(portion)}
                      className={clsx(
                        'flex items-center gap-3 border px-4 py-3 text-left text-sm font-semibold transition-all',
                        isDone
                          ? 'border-brand-600 bg-brand-50 text-brand-800'
                          : 'border-ink-950/10 bg-white text-ink-950 hover:border-brand-600/40'
                      )}
                    >
                      {isDone ? (
                        <CheckCircle2 size={18} className="shrink-0 text-brand-600" />
                      ) : (
                        <Circle size={18} className="shrink-0 text-ink-950/30" />
                      )}
                      <span className={clsx(isDone && 'line-through opacity-80')}>{portion}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bottom Prev / Next Day Navigation */}
            <div className="mt-8 flex items-center justify-between border-t border-ink-950/10 pt-6">
              <button
                type="button"
                onClick={() => {
                  setSelectedDayNum(prevDay);
                  window.scrollTo({ top: 280, behavior: 'smooth' });
                }}
                className="group flex items-center gap-2 text-left text-xs font-bold uppercase tracking-[0.16em] text-ink-950/75 hover:text-brand-600"
              >
                <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" />
                <span>Previous: Day {String(prevDay).padStart(2, '0')}</span>
              </button>

              <Link
                href={`/devotional/${current.slug}`}
                className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-brand-600 hover:underline"
              >
                Direct Link ({current.dayFormatted})
              </Link>

              <button
                type="button"
                onClick={() => {
                  setSelectedDayNum(nextDay);
                  window.scrollTo({ top: 280, behavior: 'smooth' });
                }}
                className="group flex items-center gap-2 text-right text-xs font-bold uppercase tracking-[0.16em] text-ink-950/75 hover:text-brand-600"
              >
                <span>Next: Day {String(nextDay).padStart(2, '0')}</span>
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>

          {/* RIGHT: Official Daily Devotional Graphic Card + 31-Day Selector */}
          <div className="space-y-6 lg:sticky lg:top-24">
            {/* Official Daily Card Display */}
            <div className="border border-ink-950/10 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-brand-600">
                    Official Devotional Card
                  </span>
                  <h3 className="font-display text-lg uppercase text-ink-950">
                    {current.dayFormatted} Graphic Card
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCardModalOpen(true)}
                  className="inline-flex items-center gap-1.5 border border-ink-950/15 px-2.5 py-1.5 text-[0.65rem] font-bold uppercase tracking-[0.14em] text-ink-950 hover:bg-sand-50"
                >
                  <Maximize2 size={12} />
                  Enlarge
                </button>
              </div>

              <div
                onClick={() => setCardModalOpen(true)}
                className="group relative mx-auto aspect-[9/16] w-full max-w-[270px] cursor-pointer overflow-hidden border border-ink-950/10 bg-ink-950 sm:max-w-[330px] lg:max-w-none"
              >
                <Image
                  src={current.cardImage}
                  alt={`${current.dayFormatted} - ${current.title}`}
                  fill
                  sizes="(min-width: 1024px) 420px, 100vw"
                  className="object-contain transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>

              <div className="mt-4 grid gap-2.5 sm:grid-cols-2">
                <a
                  href={current.cardImage}
                  download={`CPC_Devotional_${current.dayFormatted.replace(' ', '_')}.png`}
                  className="inline-flex items-center justify-center gap-2 bg-brand-600 px-4 py-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-brand-700"
                >
                  <Download size={14} />
                  Save Card Image
                </a>

                <button
                  type="button"
                  onClick={handleCopyFullShare}
                  className="inline-flex items-center justify-center gap-2 border border-ink-950 bg-white px-4 py-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink-950 transition-colors hover:bg-ink-950 hover:text-white"
                >
                  {copiedFull ? <Check size={14} /> : <Copy size={14} />}
                  {copiedFull ? 'Copied Text!' : 'Copy Full Text'}
                </button>
              </div>
            </div>

            {/* 31-Day Quick Number Grid */}
            <div className="border border-ink-950/10 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-brand-600">
                  31-Day Blueprint
                </p>
                <span className="text-[0.68rem] font-semibold text-ink-950/60">
                  Jump to any day
                </span>
              </div>

              <div className="mt-3.5 grid grid-cols-7 gap-1.5">
                {allDays.map((item) => {
                  const active = item.day === current.day;
                  return (
                    <button
                      key={item.day}
                      type="button"
                      onClick={() => setSelectedDayNum(item.day)}
                      title={`${item.dayFormatted}: ${item.title}`}
                      className={clsx(
                        'flex h-9 items-center justify-center border text-xs font-bold transition-all',
                        active
                          ? 'border-brand-600 bg-brand-600 text-white shadow-sm'
                          : 'border-ink-950/10 bg-sand-50 text-ink-950 hover:border-brand-600 hover:bg-white'
                      )}
                    >
                      {String(item.day).padStart(2, '0')}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Download Complete 31-Day PDF Booklet */}
            <div className="border border-brand-600/25 bg-brand-600 p-6 text-white">
              <div className="flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-brand-100">
                <FileText size={15} />
                <span>Complete eBooklet</span>
              </div>
              <h3 className="mt-2 font-display text-2xl uppercase leading-tight">
                Download Full 31-Day Devotional PDF
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/80">
                Get all 31 daily devotional cards, scriptures, meditations, and apostolic decrees by Apostle Oluwafunminiyi Olufisayo for offline study and family altar.
              </p>
              <a
                href={DEVOTIONAL_PDF_URL}
                download="CPC_Daily_Devotional_31Days_My_Purpose_Divine_Blueprint.pdf"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-white px-5 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-brand-700 transition-colors hover:bg-brand-50"
              >
                <Download size={15} />
                Download PDF (11.9 MB)
              </a>
            </div>
          </div>
        </div>
      </Container>

      {/* Fullscreen Lightbox Modal for the Daily Graphic Card */}
      {cardModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setCardModalOpen(false)}
        >
          <div
            className="relative max-h-[92vh] w-full max-w-lg overflow-hidden bg-ink-950 p-2 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between bg-ink-950 px-3 py-2 text-white">
              <span className="text-xs font-bold uppercase tracking-widest">
                {current.dayFormatted} — {current.title}
              </span>
              <button
                type="button"
                onClick={() => setCardModalOpen(false)}
                className="p-1 text-white/75 hover:text-white"
                aria-label="Close preview"
              >
                <X size={20} />
              </button>
            </div>
            <div className="relative h-[78vh] w-full">
              <Image
                src={current.cardImage}
                alt={current.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


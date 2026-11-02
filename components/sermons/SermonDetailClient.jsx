'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import {
  Play,
  RotateCcw,
  Download,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
  BookOpen,
  Sparkles,
  Flame,
  Compass,
  FileText,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Headphones,
} from 'lucide-react';
import {
  SERMONS,
  playSermon,
  downloadSermonAudio,
  getSavedPlaybackPosition,
  formatAudioTime,
  isSermonBookmarked,
  toggleBookmarkSermon,
  formatSermonWhatsAppShare,
} from '../../lib/sermons';
import { CHURCH } from '../../lib/site-config';
import Container from '../ui/Container';
import Card from '../ui/Card';

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

export default function SermonDetailClient({ sermon, relatedSermons }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [resumePos, setResumePos] = useState(null);
  const [bookmarked, setBookmarked] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [copiedNotes, setCopiedNotes] = useState(false);
  const [copiedPrayer, setCopiedPrayer] = useState(false);
  const [copiedPersonalNotes, setCopiedPersonalNotes] = useState(false);
  const [personalNotes, setPersonalNotes] = useState('');

  const currentIndex = SERMONS.findIndex((s) => s.id === sermon.id);
  const prevSermon = currentIndex > 0 ? SERMONS[currentIndex - 1] : SERMONS[SERMONS.length - 1];
  const nextSermon = currentIndex < SERMONS.length - 1 ? SERMONS[currentIndex + 1] : SERMONS[0];

  useEffect(() => {
    setBookmarked(isSermonBookmarked(sermon.id));
    const saved = getSavedPlaybackPosition(sermon.id);
    if (saved && saved > 8) {
      setResumePos(saved);
    } else {
      setResumePos(null);
    }

    try {
      const savedUserNotes = localStorage.getItem(`cpc_sermon_notes_${sermon.id}`);
      setPersonalNotes(savedUserNotes || '');
    } catch {
      // ignore
    }

    const onPlay = (e) => {
      if (e.detail?.id) {
        setIsPlaying(e.detail.id === sermon.id);
      }
    };

    const onBookmarkChange = () => {
      setBookmarked(isSermonBookmarked(sermon.id));
    };

    window.addEventListener('play-cpc-sermon', onPlay);
    window.addEventListener('cpc:bookmarks-changed', onBookmarkChange);
    return () => {
      window.removeEventListener('play-cpc-sermon', onPlay);
      window.removeEventListener('cpc:bookmarks-changed', onBookmarkChange);
    };
  }, [sermon.id]);

  const handlePersonalNotesChange = (e) => {
    const val = e.target.value;
    setPersonalNotes(val);
    try {
      localStorage.setItem(`cpc_sermon_notes_${sermon.id}`, val);
    } catch {
      // ignore
    }
  };

  const handleToggleBookmark = () => {
    const nextState = toggleBookmarkSermon(sermon.id);
    setBookmarked(nextState);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadSermonAudio(sermon);
    } finally {
      setTimeout(() => setDownloading(false), 2000);
    }
  };

  const handleCopyFullOutline = async () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : CHURCH.siteUrl;
    const text =
      `SERMON STUDY NOTES — CHRIST THE POTTER CHURCH\n` +
      `Title: ${sermon.title}\n` +
      `Minister: ${sermon.minister}\n` +
      `Scripture: ${sermon.scripture}\n` +
      `Series: ${sermon.series} (${sermon.duration})\n\n` +
      `ANCHOR VERSE:\n"${sermon.anchorVerseText}"\n\n` +
      `KEY PROPHETIC TAKEAWAYS:\n` +
      (sermon.keyTakeaways || []).map((t, i) => `${i + 1}. ${t}`).join('\n') +
      `\n\nPRAYER DECLARATION:\n"${sermon.prayerFocus}"\n\n` +
      `Listen & Read Full Notes: ${origin}/sermons/${sermon.id}`;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedNotes(true);
      setTimeout(() => setCopiedNotes(false), 2500);
    } catch {
      // ignore
    }
  };

  const handleCopyPrayer = async () => {
    const text = `PRAYER DECLARATION (${sermon.title}):\n"${sermon.prayerFocus}"\n— ${sermon.minister}, Christ The Potter Church`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPrayer(true);
      setTimeout(() => setCopiedPrayer(false), 2500);
    } catch {
      // ignore
    }
  };

  const handleCopyPersonalNotes = async () => {
    if (!personalNotes.trim()) return;
    const text = `MY PERSONAL NOTES — ${sermon.title} (${sermon.minister}):\n\n${personalNotes}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedPersonalNotes(true);
      setTimeout(() => setCopiedPersonalNotes(false), 2500);
    } catch {
      // ignore
    }
  };

  const getWhatsAppShareUrl = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : CHURCH.siteUrl;
    const text = formatSermonWhatsAppShare(sermon, origin);
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  return (
    <section className="py-14 lg:py-20">
      <Container>
        {/* Audio Control & Share Console */}
        <div className="mb-10 border border-ink-950/15 bg-ink-950 p-6 text-white shadow-lg sm:p-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex items-start gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsPlaying(true);
                  playSermon(sermon);
                }}
                aria-label={`Play ${sermon.title}`}
                className="flex h-14 w-14 shrink-0 items-center justify-center bg-brand-600 text-white transition-transform hover:scale-105 hover:bg-brand-500"
              >
                <Play size={22} className="ml-0.5 fill-current" />
              </button>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-brand-600/30 border border-brand-400/40 px-2.5 py-0.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-brand-300">
                    {sermon.series}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-white/65">
                    <Clock size={12} />
                    {sermon.duration}
                  </span>
                  {isPlaying && (
                    <span className="inline-flex items-center gap-1.5 bg-brand-600 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-widest text-white">
                      <span className="live-dot !bg-white" />
                      Playing in Audio Bar
                    </span>
                  )}
                </div>

                <h2 className="mt-2 font-display text-xl uppercase leading-tight text-white sm:text-2xl">
                  {sermon.title}
                </h2>
                <p className="mt-1 text-xs text-white/70">
                  {sermon.minister} · Anchor: <span className="text-[#d4af37]">{sermon.scripture}</span>
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid w-full grid-cols-2 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:items-center sm:gap-2.5">
              {resumePos ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsPlaying(true);
                    playSermon(sermon, { resumeTime: resumePos });
                  }}
                  className="col-span-2 inline-flex items-center justify-center gap-2 bg-[#d4af37] px-4 py-3 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink-950 transition-colors hover:bg-[#e3be42]"
                >
                  <RotateCcw size={14} />
                  Resume ({formatAudioTime(resumePos)})
                </button>
              ) : null}

              <button
                type="button"
                onClick={() => {
                  setIsPlaying(true);
                  playSermon(sermon);
                }}
                className="inline-flex items-center justify-center gap-2 bg-brand-600 px-3.5 py-3 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-brand-500 sm:px-5 sm:text-[0.68rem] sm:tracking-[0.18em]"
              >
                <Headphones size={15} />
                {isPlaying ? 'Playing Now' : 'Listen Audio'}
              </button>

              <button
                type="button"
                onClick={handleDownload}
                disabled={downloading}
                className="inline-flex items-center justify-center gap-2 border border-white/25 bg-white/5 px-3.5 py-3 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-white hover:text-ink-950 disabled:opacity-50 sm:px-4 sm:text-[0.68rem] sm:tracking-[0.16em]"
              >
                <Download size={14} className={downloading ? 'animate-bounce' : ''} />
                {downloading ? 'Saving...' : 'Download MP3'}
              </button>

              <a
                href={getWhatsAppShareUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#25D366] px-3.5 py-3 text-[0.66rem] font-bold uppercase tracking-[0.14em] text-white transition-transform hover:scale-[1.02] sm:px-4 sm:text-[0.68rem] sm:tracking-[0.16em]"
              >
                <WhatsAppIcon size={15} />
                WhatsApp Share
              </a>

              <button
                type="button"
                onClick={handleToggleBookmark}
                title={bookmarked ? 'Saved in your library' : 'Save message for later'}
                className={clsx(
                  'inline-flex items-center justify-center gap-1.5 border p-3 text-[0.66rem] font-bold uppercase tracking-[0.14em] transition-colors',
                  bookmarked
                    ? 'border-brand-400 bg-brand-600 text-white'
                    : 'border-white/25 bg-white/5 text-white/80 hover:border-white hover:text-white'
                )}
              >
                {bookmarked ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                <span className="sm:hidden">{bookmarked ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main 2-Column Study Guide & Notes Layout */}
        <div className="grid gap-10 lg:grid-cols-[1.45fr_0.95fr] lg:items-start">
          {/* LEFT: Full Sermon Study Guide, Takeaways, Exegesis & Prayer */}
          <div className="border border-ink-950/10 bg-white p-6 shadow-sm sm:p-10 lg:p-12">
            {/* Minister Attribution Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ink-950/10 pb-6">
              <div className="flex items-center gap-3.5">
                <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-brand-600">
                  <Image
                    src="/images/setman.jpg"
                    alt={sermon.minister}
                    fill
                    sizes="48px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <p className="text-sm font-bold text-ink-950">{sermon.minister}</p>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-brand-600">
                    {sermon.category} · {sermon.occasion}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopyFullOutline}
                className="inline-flex items-center gap-2 border border-ink-950/15 bg-sand-50 px-3.5 py-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink-950 transition-colors hover:border-brand-600 hover:bg-brand-50"
              >
                {copiedNotes ? <Check size={14} className="text-brand-600" /> : <Copy size={14} />}
                {copiedNotes ? 'Study Outline Copied!' : 'Copy Study Outline'}
              </button>
            </div>

            {/* Anchor Scripture Block */}
            <div className="mt-7 border-l-4 border-[#d4af37] bg-[#fbf8ef] p-5 sm:p-6">
              <div className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-[#9a7b1c]">
                <BookOpen size={15} />
                <span>Anchor Scripture: {sermon.scripture}</span>
              </div>
              {sermon.anchorVerseText && (
                <blockquote className="mt-2.5 font-serif text-base italic leading-relaxed text-ink-950/90 sm:text-[1.05rem]">
                  &ldquo;{sermon.anchorVerseText}&rdquo;
                </blockquote>
              )}
            </div>

            {/* Key Prophetic Takeaways */}
            {sermon.keyTakeaways && sermon.keyTakeaways.length > 0 && (
              <div className="mt-9">
                <div className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-brand-600">
                  <Sparkles size={15} />
                  <span>Key Prophetic Takeaways</span>
                </div>
                <h3 className="mt-1 font-display text-2xl uppercase text-ink-950">
                  Core Truths from This Message
                </h3>

                <div className="mt-4 grid gap-3.5">
                  {sermon.keyTakeaways.map((point, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 border border-ink-950/10 bg-sand-50/70 p-4 sm:p-5"
                    >
                      <span className="font-display text-2xl leading-none text-brand-600">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <p className="text-sm font-medium leading-relaxed text-ink-950/90 sm:text-[0.95rem]">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Full Study Notes & Exegesis */}
            {sermon.studyNotes && sermon.studyNotes.length > 0 && (
              <div className="mt-10 border-t border-ink-950/10 pt-8">
                <div className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-brand-600">
                  <FileText size={15} />
                  <span>Apostolic Exegesis &amp; Study Guide</span>
                </div>
                <h3 className="mt-1 font-display text-2xl uppercase text-ink-950">
                  Teaching Summary &amp; Doctrine
                </h3>

                <div className="mt-5 space-y-5 text-[1.02rem] leading-[1.85] text-ink-950/85">
                  {sermon.studyNotes.map((paragraph, idx) => (
                    <p
                      key={idx}
                      className={clsx(
                        idx === 0 &&
                          'first-letter:float-left first-letter:mr-3 first-letter:font-display first-letter:text-5xl first-letter:leading-none first-letter:text-brand-600'
                      )}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            )}

            {/* Personal & Cell-Group Reflection Questions */}
            {sermon.reflectionQuestions && sermon.reflectionQuestions.length > 0 && (
              <div className="mt-9 border border-[#d4af37]/40 bg-[#fdfaf2] p-6">
                <div className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-[#9a7b1c]">
                  <Compass size={16} />
                  <span>Heart Audit &amp; Discipleship Questions</span>
                </div>
                <ul className="mt-3 space-y-2.5 text-[0.95rem] font-semibold italic leading-relaxed text-ink-950">
                  {sermon.reflectionQuestions.map((q, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <span className="text-[#9a7b1c]">{idx + 1}.</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Altar Response & Prayer Focus */}
            {sermon.prayerFocus && (
              <div className="mt-8 border-2 border-brand-600 bg-ink-950 p-6 text-white sm:p-8">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.24em] text-[#d4af37]">
                    <Flame size={16} />
                    <span>Altar Response &amp; Prophetic Prayer</span>
                  </div>
                  <span className="bg-white/10 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-brand-300">
                    Pray Out Loud
                  </span>
                </div>

                <p className="mt-4 text-base leading-relaxed text-white/95 sm:text-[1.06rem]">
                  &ldquo;{sermon.prayerFocus}&rdquo;
                </p>

                <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/15 pt-5">
                  <button
                    type="button"
                    onClick={handleCopyPrayer}
                    className="inline-flex items-center gap-2 border border-white/30 bg-white/5 px-4 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-ink-950"
                  >
                    {copiedPrayer ? <Check size={14} className="text-brand-300" /> : <Copy size={14} />}
                    {copiedPrayer ? 'Prayer Copied!' : 'Copy Prayer'}
                  </button>

                  <a
                    href={getWhatsAppShareUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-[#25D366] px-4 py-2.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white transition-transform hover:scale-[1.02]"
                  >
                    <WhatsAppIcon size={15} />
                    Share Message &amp; Notes on WhatsApp
                  </a>
                </div>
              </div>
            )}

            {/* Prev / Next Sermon Navigation */}
            <div className="mt-10 grid gap-4 border-t border-ink-950/10 pt-7 sm:grid-cols-2">
              <Link
                href={`/sermons/${prevSermon.id}`}
                className="group flex flex-col justify-between border border-ink-950/10 bg-sand-50 p-4 transition-colors hover:border-brand-600"
              >
                <span className="inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink-950/55 group-hover:text-brand-600">
                  <ChevronLeft size={13} />
                  Previous Message
                </span>
                <span className="mt-1.5 font-display text-lg uppercase leading-tight text-ink-950">
                  {prevSermon.title}
                </span>
              </Link>

              <Link
                href={`/sermons/${nextSermon.id}`}
                className="group flex flex-col justify-between border border-ink-950/10 bg-sand-50 p-4 text-right transition-colors hover:border-brand-600"
              >
                <span className="inline-flex items-center justify-end gap-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink-950/55 group-hover:text-brand-600">
                  Next Message
                  <ChevronRight size={13} />
                </span>
                <span className="mt-1.5 font-display text-lg uppercase leading-tight text-ink-950">
                  {nextSermon.title}
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT: Interactive Personal Study Pad & Related Messages */}
          <div className="space-y-6 lg:sticky lg:top-24">
            {/* Personal Study Notes Scratchpad */}
            <div className="border border-ink-950/10 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-brand-600">
                    Interactive Study Pad
                  </span>
                  <h3 className="font-display text-xl uppercase text-ink-950">
                    My Personal Sermon Notes
                  </h3>
                </div>
                <span className="bg-brand-50 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-brand-700">
                  Auto-Saved
                </span>
              </div>

              <p className="mt-1.5 text-xs text-ink-950/60">
                Jot down personal revelations, scriptures, and action steps while listening to this message. Saved automatically in your browser.
              </p>

              <textarea
                rows={6}
                value={personalNotes}
                onChange={handlePersonalNotesChange}
                placeholder={`Write your personal study notes for "${sermon.title}" here...`}
                className="mt-3.5 w-full border border-ink-950/15 bg-sand-50 p-3.5 text-sm leading-relaxed text-ink-950 placeholder:text-ink-950/40 focus:border-brand-600 focus:bg-white focus:outline-none"
              />

              <div className="mt-3 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={handleCopyPersonalNotes}
                  disabled={!personalNotes.trim()}
                  className="inline-flex items-center gap-1.5 border border-ink-950 bg-ink-950 px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-brand-600 hover:border-brand-600 disabled:opacity-40"
                >
                  {copiedPersonalNotes ? <Check size={13} /> : <Copy size={13} />}
                  {copiedPersonalNotes ? 'Copied My Notes!' : 'Copy My Notes'}
                </button>

                {personalNotes.trim() && (
                  <button
                    type="button"
                    onClick={() => {
                      setPersonalNotes('');
                      try {
                        localStorage.removeItem(`cpc_sermon_notes_${sermon.id}`);
                      } catch {
                        // ignore
                      }
                    }}
                    className="text-[0.65rem] font-semibold uppercase tracking-wider text-ink-950/50 hover:text-red-600"
                  >
                    Clear Pad
                  </button>
                )}
              </div>
            </div>

            {/* Related Messages in Category / Series */}
            <div className="border border-ink-950/10 bg-white p-6 shadow-sm">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-brand-600">
                Continue Studying
              </span>
              <h3 className="mt-1 font-display text-xl uppercase text-ink-950">
                Related Apostolic Messages
              </h3>

              <div className="mt-4 divide-y divide-ink-950/10">
                {relatedSermons.map((rel) => (
                  <Card key={rel.id} className="border-0 py-4 first:pt-0 last:pb-0">
                    <span className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-brand-600">
                      {rel.series} · {rel.duration}
                    </span>
                    <h4 className="mt-1 font-display text-lg uppercase leading-snug text-ink-950 hover:text-brand-600">
                      <Link href={`/sermons/${rel.id}`}>{rel.title}</Link>
                    </h4>
                    <p className="mt-1 text-xs text-ink-950/60">{rel.scripture}</p>
                    <div className="mt-2.5 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => playSermon(rel)}
                        className="inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-ink-950 hover:text-brand-600"
                      >
                        <Play size={11} className="fill-current" />
                        Play Audio
                      </button>
                      <span className="text-ink-950/25">·</span>
                      <Link
                        href={`/sermons/${rel.id}`}
                        className="inline-flex items-center gap-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-brand-600 hover:underline"
                      >
                        Study Notes
                        <ArrowRight size={11} />
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>

              <Link
                href="/sermons"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 border border-ink-950/15 bg-sand-50 px-4 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ink-950 transition-colors hover:border-brand-600 hover:bg-brand-50"
              >
                Browse All {SERMONS.length} Messages
                <ArrowRight size={13} />
              </Link>
            </div>

            {/* Today's Devotional Cross-Link Card */}
            <div className="border border-brand-600/25 bg-brand-600 p-6 text-white">
              <span className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-brand-100">
                Daily Prophetic Word
              </span>
              <h3 className="mt-1.5 font-display text-2xl uppercase leading-tight">
                Read Today&apos;s Devotional &amp; Decree
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-white/80">
                Pair your sermon study with today&apos;s 31-Day Divine Blueprint devotional and apostolic decree.
              </p>
              <Link
                href="/devotional"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 bg-white px-4 py-3 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-brand-700 transition-colors hover:bg-brand-50"
              >
                Open Today&apos;s Devotional
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


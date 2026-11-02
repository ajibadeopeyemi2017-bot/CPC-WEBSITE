'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import {
  Tv,
  Radio,
  Play,
  Volume2,
  ExternalLink,
  Copy,
  Check,
  Heart,
  FileText,
  Sparkles,
  Calendar,
  BookOpen,
  Download,
  HandHeart,
  Send,
  Clock,
  ArrowRight,
} from 'lucide-react';
import {
  CHURCH,
  SERVICE_SCHEDULE,
  SOCIAL_LINKS,
  BANK_ACCOUNTS,
  FEATURED_VIDEOS,
} from '../../lib/site-config';
import {
  SERMONS,
  playSermon,
  playLiveMixlr,
  downloadSermonAudio,
} from '../../lib/sermons';
import { useLiveStatus } from '../../hooks/useLiveStatus';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
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

export default function LiveBroadcastCenter() {
  const {
    isLive,
    isSimulated,
    activeService,
    nextService,
    countdown,
    watTime,
    mounted,
    toggleSimulation,
  } = useLiveStatus();

  // Stream channel: 'video' | 'mixlr' | 'rebroadcast'
  const [streamMode, setStreamMode] = useState('video');
  // Sidebar tab: 'notes' | 'prayer' | 'give' | 'schedule'
  const [sidebarTab, setSidebarTab] = useState('notes');

  const [liveNotes, setLiveNotes] = useState('');
  const [copiedNotes, setCopiedNotes] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(null);
  const [salvationHandRaised, setSalvationHandRaised] = useState(false);
  const [prayerText, setPrayerText] = useState('');
  const [selectedRebroadcast, setSelectedRebroadcast] = useState(SERMONS[0]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cpc_live_sanctuary_notes');
      if (saved) setLiveNotes(saved);
    } catch {
      // ignore
    }
  }, []);

  const handleNotesChange = (e) => {
    const val = e.target.value;
    setLiveNotes(val);
    try {
      localStorage.setItem('cpc_live_sanctuary_notes', val);
    } catch {
      // ignore
    }
  };

  const handleCopyNotes = async () => {
    if (!liveNotes.trim()) return;
    const header = `MY LIVE SERVICE NOTES — ${CHURCH.name}\nDate: ${new Date().toLocaleDateString()}\n\n`;
    try {
      await navigator.clipboard.writeText(header + liveNotes);
      setCopiedNotes(true);
      setTimeout(() => setCopiedNotes(false), 2500);
    } catch {
      // ignore
    }
  };

  const handleCopyAccount = async (acctNum) => {
    try {
      await navigator.clipboard.writeText(acctNum);
      setCopiedAccount(acctNum);
      setTimeout(() => setCopiedAccount(null), 2500);
    } catch {
      // ignore
    }
  };

  const getInviteWhatsAppHref = () => {
    const origin = typeof window !== 'undefined' ? window.location.origin : CHURCH.siteUrl;
    const serviceLabel = isLive && activeService ? activeService.name : 'our Live Broadcast & Online Sanctuary';
    const text =
      `🔥 *JOIN US LIVE AT CHRIST THE POTTER CHURCH!* 🔥\n\n` +
      `We are gathering for *${serviceLabel}* with *Apostle Oluwafunminiyi Olufisayo*.\n\n` +
      `📺 Watch Live Video or Stream Low-Data Mixlr Audio here:\n${origin}/live`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  const getPrayerWhatsAppHref = () => {
    const msg = prayerText.trim()
      ? `Hello Christ The Potter Church Prayer Desk, I am connected to the Live Sanctuary and would like to submit this prayer request:\n\n"${prayerText.trim()}"`
      : `Hello Christ The Potter Church Prayer Desk, I am watching the Live Broadcast and need someone to agree with me in prayer.`;
    return `https://wa.me/${CHURCH.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      <section id="sanctuary" className="py-12 lg:py-16">
        <Container>
          {/* Top Broadcast Status & Channel Selector Bar */}
          <div className="mb-8 flex flex-col justify-between gap-4 border border-ink-950/15 bg-ink-950 p-5 text-white sm:flex-row sm:items-center sm:p-6">
            <div className="flex flex-wrap items-center gap-3">
              {mounted && isLive ? (
                <span className="inline-flex items-center gap-2 bg-red-600 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-white shadow">
                  <span className="live-dot !bg-white" />
                  Live Now: {activeService?.name}
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 border border-white/20 bg-white/10 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-brand-300">
                  <Clock size={13} />
                  {mounted && nextService && countdown
                    ? `Next Live: ${nextService.shortName} in ${countdown.formatted}`
                    : 'Online Sanctuary Ready'}
                </span>
              )}

              {mounted && watTime && (
                <span className="text-xs font-medium text-white/60">
                  Ile-Ife Time: <strong className="text-white/90">{watTime} WAT</strong>
                </span>
              )}

              <button
                type="button"
                onClick={() => toggleSimulation()}
                className={clsx(
                  'border px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] transition-colors',
                  isSimulated
                    ? 'border-red-400 bg-red-950/60 text-red-200'
                    : 'border-white/20 bg-white/5 text-white/65 hover:text-white'
                )}
                title="Preview how the sanctuary looks during a live broadcast"
              >
                {isSimulated ? 'Exit Live Preview' : 'Preview Live Mode'}
              </button>
            </div>

            {/* Stream Channel Tabs */}
            <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Broadcast Stream Mode">
              <button
                type="button"
                role="tab"
                aria-selected={streamMode === 'video'}
                onClick={() => setStreamMode('video')}
                className={clsx(
                  'inline-flex items-center gap-2 px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] transition-colors',
                  streamMode === 'video'
                    ? 'bg-brand-600 text-white'
                    : 'border border-white/20 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white'
                )}
              >
                <Tv size={14} />
                Video Stream
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={streamMode === 'mixlr'}
                onClick={() => setStreamMode('mixlr')}
                className={clsx(
                  'inline-flex items-center gap-2 px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] transition-colors',
                  streamMode === 'mixlr'
                    ? 'bg-brand-600 text-white'
                    : 'border border-white/20 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white'
                )}
              >
                <Radio size={14} />
                Mixlr Audio (Low Data)
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={streamMode === 'rebroadcast'}
                onClick={() => setStreamMode('rebroadcast')}
                className={clsx(
                  'inline-flex items-center gap-2 px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] transition-colors',
                  streamMode === 'rebroadcast'
                    ? 'bg-brand-600 text-white'
                    : 'border border-white/20 bg-white/5 text-white/75 hover:bg-white/10 hover:text-white'
                )}
              >
                <Play size={14} />
                Service Rebroadcast
              </button>
            </div>
          </div>

          {/* Main 2-Column Sanctuary Grid */}
          <div className="grid gap-8 lg:grid-cols-[1.55fr_0.95fr] lg:items-start">
            {/* LEFT: Primary Broadcast Stage */}
            <div className="border border-ink-950/15 bg-ink-950 text-white shadow-xl">
              {/* MODE 1: VIDEO STREAM */}
              {streamMode === 'video' && (
                <div>
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <Image
                      src="/images/pastor-action.jpg"
                      alt="Christ The Potter Church Live Video Broadcast"
                      fill
                      priority
                      sizes="(min-width: 1024px) 65vw, 100vw"
                      className="object-cover object-top opacity-45"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-transparent" />

                    {/* Top-left Live Badge */}
                    <div className="absolute left-5 top-5 flex items-center gap-2.5">
                      {mounted && isLive ? (
                        <span className="inline-flex items-center gap-2 bg-red-600 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-white shadow-lg">
                          <span className="live-dot !bg-white" />
                          Live Video Broadcast
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2 bg-ink-950/85 border border-white/20 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#d4af37]">
                          <Tv size={13} />
                          CPC Video Sanctuary
                        </span>
                      )}
                    </div>

                    {/* Center Broadcast Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                      <p className="text-[0.68rem] font-bold uppercase tracking-[0.28em] text-brand-300">
                        {mounted && isLive && activeService
                          ? activeService.name
                          : 'Christ The Potter Church · Ile-Ife'}
                      </p>
                      <h2 className="mt-2 max-w-xl font-display text-3xl uppercase leading-none text-white sm:text-5xl">
                        {mounted && isLive
                          ? 'Service Is Live Now'
                          : 'Watch Live on Facebook & YouTube'}
                      </h2>
                      <p className="mt-3 max-w-lg text-xs leading-relaxed text-white/80 sm:text-sm">
                        {mounted && isLive
                          ? 'Join Apostle Oluwafunminiyi Olufisayo live from the main auditorium in Ile-Ife via Facebook Live video or Mixlr low-data audio.'
                          : 'Our live video stream activates during Sunday Worship (8:00 AM), Tuesday School of Prayer (5:00 PM), and Thursday Revelational Hour (5:00 PM WAT).'}
                      </p>

                      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                        <a
                          href={SOCIAL_LINKS.facebookLive}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-brand-600 px-6 py-3.5 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-white shadow-lg transition-colors hover:bg-brand-500"
                        >
                          <Tv size={15} />
                          Open Facebook Live Video
                          <ExternalLink size={13} />
                        </a>

                        <button
                          type="button"
                          onClick={() => setStreamMode('mixlr')}
                          className="inline-flex items-center gap-2 border border-white/30 bg-ink-950/80 px-5 py-3.5 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white hover:text-ink-950"
                        >
                          <Radio size={15} />
                          Switch to Mixlr Audio
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Bar under Video */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 p-5 sm:px-7">
                    <div>
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.22em] text-[#d4af37]">
                        Low Data or Travelling?
                      </p>
                      <p className="mt-0.5 text-xs text-white/75">
                        Launch our Mixlr audio stream in the persistent bottom bar so you can listen with your phone screen off.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => playLiveMixlr()}
                        className="inline-flex items-center gap-2 bg-white px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink-950 transition-colors hover:bg-brand-50"
                      >
                        <Volume2 size={14} className="text-brand-600" />
                        Pop Out Audio Bar
                      </button>

                      <a
                        href={getInviteWhatsAppHref()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white transition-transform hover:scale-[1.02]"
                      >
                        <WhatsAppIcon size={14} />
                        Invite on WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* MODE 2: MIXLR AUDIO STREAM */}
              {streamMode === 'mixlr' && (
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                      <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-brand-300">
                        <Radio size={14} />
                        Mixlr Official Audio Broadcast
                      </span>
                      <h2 className="mt-1 font-display text-2xl uppercase text-white sm:text-3xl">
                        Christ The Potter Church Live Audio
                      </h2>
                    </div>

                    <a
                      href={SOCIAL_LINKS.mixlr}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 border border-white/25 bg-white/10 px-4 py-2 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white hover:bg-white hover:text-ink-950"
                    >
                      Open on Mixlr.com
                      <ExternalLink size={13} />
                    </a>
                  </div>

                  {/* Embedded Mixlr Player */}
                  <div className="mt-6 overflow-hidden border border-white/15 bg-black">
                    <iframe
                      title="Christ The Potter Church Mixlr Live Stream"
                      src={SOCIAL_LINKS.mixlrEmbed}
                      width="100%"
                      height="240"
                      scrolling="no"
                      frameBorder="0"
                      marginHeight="0"
                      marginWidth="0"
                      className="w-full"
                    />
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 bg-white/5 p-4">
                    <p className="text-xs leading-relaxed text-white/75">
                      Want to browse the Daily Devotional or Sermon Study Notes while listening? Dock the stream to the bottom player bar:
                    </p>
                    <button
                      type="button"
                      onClick={() => playLiveMixlr()}
                      className="inline-flex items-center gap-2 bg-brand-600 px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white hover:bg-brand-500"
                    >
                      <Volume2 size={14} />
                      Dock to Bottom Player
                    </button>
                  </div>
                </div>
              )}

              {/* MODE 3: SERVICE REBROADCAST */}
              {streamMode === 'rebroadcast' && (
                <div className="p-6 sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
                    <div>
                      <span className="text-[0.68rem] font-bold uppercase tracking-[0.22em] text-[#d4af37]">
                        On-Demand Pulpit Rebroadcast
                      </span>
                      <h2 className="mt-1 font-display text-2xl uppercase text-white sm:text-3xl">
                        {selectedRebroadcast.title}
                      </h2>
                      <p className="mt-1 text-xs text-white/70">
                        {selectedRebroadcast.minister} · {selectedRebroadcast.scripture} · {selectedRebroadcast.duration}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => playSermon(selectedRebroadcast)}
                      className="inline-flex items-center gap-2 bg-brand-600 px-5 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white hover:bg-brand-500"
                    >
                      <Play size={15} className="fill-current" />
                      Play Rebroadcast Audio
                    </button>
                  </div>

                  <p className="mt-5 text-sm leading-relaxed text-white/80">
                    {selectedRebroadcast.description}
                  </p>

                  {selectedRebroadcast.keyTakeaways && (
                    <div className="mt-5 border-l-2 border-[#d4af37] bg-white/5 p-4">
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                        Prophetic Highlight
                      </p>
                      <p className="mt-1 text-xs italic leading-relaxed text-white/90">
                        &ldquo;{selectedRebroadcast.keyTakeaways[0]}&rdquo;
                      </p>
                    </div>
                  )}

                  {/* Quick Switch Rebroadcast Message */}
                  <div className="mt-6">
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-white/55">
                      Select Rebroadcast Message:
                    </p>
                    <div className="mt-2.5 grid gap-2 sm:grid-cols-3">
                      {SERMONS.slice(0, 3).map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setSelectedRebroadcast(item)}
                          className={clsx(
                            'border p-3 text-left transition-colors',
                            selectedRebroadcast.id === item.id
                              ? 'border-brand-400 bg-brand-900/40 text-white'
                              : 'border-white/15 bg-white/5 text-white/75 hover:border-white/40'
                          )}
                        >
                          <p className="text-[0.6rem] font-bold uppercase tracking-wider text-brand-300">
                            {item.series}
                          </p>
                          <p className="mt-1 line-clamp-2 font-display text-sm uppercase leading-tight">
                            {item.title}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-white/10 pt-5">
                    <Link
                      href={`/sermons/${selectedRebroadcast.id}`}
                      className="inline-flex items-center gap-2 border border-white/25 bg-white/10 px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white hover:bg-white hover:text-ink-950"
                    >
                      <BookOpen size={14} />
                      Open Full Study Notes
                    </Link>

                    <button
                      type="button"
                      onClick={() => downloadSermonAudio(selectedRebroadcast)}
                      className="inline-flex items-center gap-2 border border-white/25 px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/85 hover:border-white hover:text-white"
                    >
                      <Download size={14} />
                      Download MP3
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT: Interactive Online Sanctuary Companion Sidebar */}
            <div className="border border-ink-950/15 bg-white shadow-sm">
              {/* Sidebar Navigation Tabs */}
              <div className="grid grid-cols-4 border-b border-ink-950/10 bg-sand-50">
                {[
                  { id: 'notes', label: 'Notes', icon: FileText },
                  { id: 'prayer', label: 'Altar', icon: HandHeart },
                  { id: 'give', label: 'Give', icon: Heart },
                  { id: 'schedule', label: 'Times', icon: Calendar },
                ].map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSidebarTab(id)}
                    className={clsx(
                      'flex flex-col items-center justify-center gap-1 border-b-2 py-3.5 text-[0.65rem] font-bold uppercase tracking-[0.16em] transition-colors',
                      sidebarTab === id
                        ? 'border-brand-600 bg-white text-brand-700'
                        : 'border-transparent text-ink-950/60 hover:text-ink-950'
                    )}
                  >
                    <Icon size={15} />
                    <span>{label}</span>
                  </button>
                ))}
              </div>

              {/* TAB 1: LIVE SERVICE NOTES */}
              {sidebarTab === 'notes' && (
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-brand-600">
                        Online Sanctuary Pad
                      </span>
                      <h3 className="font-display text-xl uppercase text-ink-950">
                        Live Sermon Notes
                      </h3>
                    </div>
                    <span className="bg-brand-50 px-2 py-0.5 text-[0.6rem] font-bold uppercase text-brand-700">
                      Auto-Saved
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-ink-950/60">
                    Take notes during the live broadcast. Your notes stay saved in your browser.
                  </p>

                  <textarea
                    rows={8}
                    value={liveNotes}
                    onChange={handleNotesChange}
                    placeholder="Type scriptures, prophetic declarations, and personal takeaways as the Word goes forth..."
                    className="mt-3.5 w-full border border-ink-950/15 bg-sand-50 p-3.5 text-sm leading-relaxed text-ink-950 placeholder:text-ink-950/40 focus:border-brand-600 focus:bg-white focus:outline-none"
                  />

                  <div className="mt-3.5 flex flex-wrap items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={handleCopyNotes}
                      disabled={!liveNotes.trim()}
                      className="inline-flex items-center gap-1.5 bg-brand-600 px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-brand-700 disabled:opacity-40"
                    >
                      {copiedNotes ? <Check size={13} /> : <Copy size={13} />}
                      {copiedNotes ? 'Notes Copied!' : 'Copy My Notes'}
                    </button>

                    <Link
                      href="/devotional"
                      className="text-[0.66rem] font-bold uppercase tracking-wider text-brand-600 hover:underline"
                    >
                      Today&apos;s Devotional &rarr;
                    </Link>
                  </div>
                </div>
              )}

              {/* TAB 2: ALTAR CALL & LIVE PRAYER */}
              {sidebarTab === 'prayer' && (
                <div className="p-6">
                  <div className="border-l-4 border-[#d4af37] bg-[#fbf8ef] p-4">
                    <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-[#9a7b1c]">
                      Online Altar Call
                    </p>
                    <h3 className="mt-1 font-display text-lg uppercase text-ink-950">
                      Surrender Your Life to Christ
                    </h3>
                    <p className="mt-1 text-xs leading-relaxed text-ink-950/75">
                      Are you ready to give your life to Jesus or rededicate your heart to God during today&apos;s broadcast?
                    </p>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setSalvationHandRaised(true)}
                        className={clsx(
                          'inline-flex items-center gap-1.5 px-3.5 py-2 text-[0.66rem] font-bold uppercase tracking-[0.16em] transition-colors',
                          salvationHandRaised
                            ? 'bg-brand-600 text-white'
                            : 'bg-ink-950 text-white hover:bg-brand-600'
                        )}
                      >
                        <Sparkles size={13} />
                        {salvationHandRaised
                          ? 'Hand Raised! Connect Below'
                          : 'I Raise My Hand for Jesus'}
                      </button>

                      {salvationHandRaised && (
                        <a
                          href={`https://wa.me/${CHURCH.whatsapp}?text=${encodeURIComponent(
                            'Hello Christ The Potter Church! I just raised my hand during the Live Broadcast to give my life to Jesus Christ. Please guide me on my next steps.'
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 bg-[#25D366] px-3 py-2 text-[0.65rem] font-bold uppercase tracking-wider text-white"
                        >
                          <WhatsAppIcon size={13} />
                          Chat Pastor Now
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Live Prayer Request Box */}
                  <div className="mt-5">
                    <h4 className="font-display text-lg uppercase text-ink-950">
                      Send a Live Prayer Request
                    </h4>
                    <p className="mt-1 text-xs text-ink-950/60">
                      Our intercessory team is standing by to pray over your burden right now:
                    </p>
                    <textarea
                      rows={3}
                      value={prayerText}
                      onChange={(e) => setPrayerText(e.target.value)}
                      placeholder="Write your prayer request or testimony here..."
                      className="mt-2.5 w-full border border-ink-950/15 bg-sand-50 p-3 text-sm text-ink-950 placeholder:text-ink-950/40 focus:border-brand-600 focus:bg-white focus:outline-none"
                    />
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <a
                        href={getPrayerWhatsAppHref()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 bg-[#25D366] px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white"
                      >
                        <Send size={13} />
                        Send to Prayer Desk (WhatsApp)
                      </a>
                      <Link
                        href="/salvation#prayer"
                        className="border border-ink-950/20 px-3 py-2.5 text-[0.65rem] font-bold uppercase tracking-wider text-ink-950 hover:bg-sand-50"
                      >
                        Full Form
                      </Link>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: ONLINE GIVING / OFFERING */}
              {sidebarTab === 'give' && (
                <div className="p-6">
                  <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-brand-600">
                    Worship With Your Substance
                  </span>
                  <h3 className="mt-1 font-display text-xl uppercase text-ink-950">
                    Service Tithes &amp; Offerings
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-ink-950/65">
                    Click any account number below to copy it directly for your mobile banking transfer without leaving the live stream.
                  </p>

                  <div className="mt-4 space-y-3">
                    {BANK_ACCOUNTS.map((acct) => {
                      const isCopied = copiedAccount === acct.accountNumber;
                      return (
                        <div
                          key={acct.accountNumber}
                          className="border border-ink-950/10 bg-sand-50 p-4"
                        >
                          <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-brand-700">
                            {acct.purpose}
                          </p>
                          <div className="mt-2 flex items-center justify-between gap-2">
                            <div>
                              <p className="font-display text-2xl tracking-wider text-ink-950">
                                {acct.accountNumber}
                              </p>
                              <p className="text-xs font-semibold text-ink-950/70">
                                {acct.bank} · {acct.accountName}
                              </p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleCopyAccount(acct.accountNumber)}
                              className="inline-flex items-center gap-1.5 border border-ink-950 bg-ink-950 px-3 py-2 text-[0.65rem] font-bold uppercase tracking-wider text-white hover:bg-brand-600 hover:border-brand-600"
                            >
                              {isCopied ? <Check size={13} /> : <Copy size={13} />}
                              {isCopied ? 'Copied!' : 'Copy'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* TAB 4: BROADCAST SCHEDULE & INVITE */}
              {sidebarTab === 'schedule' && (
                <div className="p-6">
                  <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-brand-600">
                    Weekly Broadcast Schedule (WAT)
                  </span>
                  <h3 className="mt-1 font-display text-xl uppercase text-ink-950">
                    Service Times in Ile-Ife
                  </h3>

                  <div className="mt-4 space-y-3">
                    {SERVICE_SCHEDULE.map((service) => (
                      <div
                        key={service.id}
                        className="border-l-4 border-brand-600 bg-sand-50 p-3.5"
                      >
                        <div className="flex items-center justify-between">
                          <p className="font-display text-base uppercase text-ink-950">
                            {service.name}
                          </p>
                          <span className="bg-brand-600 px-2 py-0.5 text-[0.62rem] font-bold uppercase text-white">
                            {service.time}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-ink-950/65">
                          {service.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <a
                    href={getInviteWhatsAppHref()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex w-full items-center justify-center gap-2 bg-[#25D366] px-4 py-3 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white transition-transform hover:scale-[1.01]"
                  >
                    <WhatsAppIcon size={15} />
                    Invite Friends on WhatsApp
                  </a>
                </div>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Pulpit Video & Conference Highlights Section */}
      <section id="highlights" className="border-t border-ink-950/10 bg-sand-50 py-20 lg:py-28">
        <Container>
          <SectionHeader
            eyebrow="Pulpit Video & Audio Highlights"
            title="Featured Ministrations"
            aside="Catch up on recent conference charges, Sunday worship encounters, and prophetic teachings from Apostle Oluwafunminiyi Olufisayo."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {FEATURED_VIDEOS.map((video) => {
              const matchingSermon =
                SERMONS.find((s) => s.id === video.sermonSlug) || SERMONS[0];

              return (
                <Card
                  key={video.id}
                  className="group flex flex-col justify-between overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div>
                    <div className="relative aspect-video w-full overflow-hidden bg-ink-950">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        sizes="(min-width: 768px) 33vw, 100vw"
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/85 via-ink-950/25 to-transparent" />

                      <span className="absolute left-3 top-3 bg-brand-600 px-2.5 py-1 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-white">
                        {video.category}
                      </span>

                      <span className="absolute bottom-3 right-3 bg-ink-950/85 px-2 py-0.5 text-[0.62rem] font-bold text-white">
                        {video.duration}
                      </span>

                      <button
                        type="button"
                        onClick={() => playSermon(matchingSermon)}
                        aria-label={`Play ${video.title}`}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <span className="flex h-13 w-13 items-center justify-center rounded-full bg-brand-600/95 p-3.5 text-white shadow-xl transition-transform group-hover:scale-110">
                          <Play size={20} className="ml-0.5 fill-current" />
                        </span>
                      </button>
                    </div>

                    <div className="p-6">
                      <p className="text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#9a7b1c]">
                        {video.scripture}
                      </p>
                      <h3 className="mt-2 font-display text-2xl uppercase leading-tight text-ink-950 group-hover:text-brand-600">
                        <Link href={`/sermons/${video.sermonSlug}`}>{video.title}</Link>
                      </h3>
                      <p className="mt-2.5 text-sm leading-relaxed text-ink-950/70">
                        {video.summary}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t border-ink-950/10 px-6 py-4">
                    <button
                      type="button"
                      onClick={() => playSermon(matchingSermon)}
                      className="inline-flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-brand-600 hover:text-brand-700"
                    >
                      <Play size={12} className="fill-current" />
                      Stream Audio
                    </button>

                    <Link
                      href={`/sermons/${video.sermonSlug}`}
                      className="inline-flex items-center gap-1 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-ink-950/70 hover:text-ink-950"
                    >
                      Study Notes
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}


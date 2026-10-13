'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, MapPin, Calendar, HeartHandshake } from 'lucide-react';
import clsx from 'clsx';
import { CHURCH } from '../lib/site-config';

const QUICK_TOPICS = [
  {
    icon: Calendar,
    label: 'Plan a visit this Sunday',
    message: 'Hello Christ The Potter Church, I am planning to worship with you this Sunday at 8:00 AM and would like some guidance.',
  },
  {
    icon: HeartHandshake,
    label: 'Prayer & pastoral counseling',
    message: 'Grace and peace. I am reaching out to request pastoral counseling and prayer agreement with Apostle Olufisayo and the ministry team.',
  },
  {
    icon: MapPin,
    label: 'Directions & church landmark',
    message: 'Hello, please can you guide me with the exact directions to the main auditorium at Fajuyi Road, Ile-Ife?',
  },
  {
    icon: Sparkles,
    label: 'KYMC / AGOTE / RDS conferences',
    message: 'Hello, I would like to inquire about upcoming conferences and registration details.',
  },
];

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const cardRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (cardRef.current && !cardRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      const handleKeyDown = (e) => e.key === 'Escape' && setIsOpen(false);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  const openWhatsApp = (msg) => {
    const textToSend = msg || customMessage.trim() || 'Hello Christ The Potter Church, I am reaching out from your website.';
    const encoded = encodeURIComponent(textToSend);
    const url = `https://wa.me/${CHURCH.whatsapp}?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <aside
      ref={cardRef}
      aria-label="WhatsApp Pastoral and Protocol Support"
      className="fixed bottom-4 left-4 z-40 sm:bottom-6 sm:left-6 print:hidden"
    >
      {/* -------------------------------------------------------- */}
      {/* POPUP CHAT DIALOG */}
      {/* -------------------------------------------------------- */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Chat with Christ The Potter Church on WhatsApp"
          className="mb-3 w-[calc(100vw-2rem)] max-w-sm rounded-lg border border-ink-950/15 bg-white text-ink-950 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200 overflow-hidden sm:w-96"
        >
          {/* Header */}
          <div className="bg-[#0f4a17] p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white ring-2 ring-white/20">
                  <MessageCircle size={22} className="text-[#4ade80]" />
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#0f4a17] bg-[#22c55e]" />
                </div>
                <div>
                  <h3 className="font-display text-lg tracking-wide uppercase text-white leading-tight">
                    {CHURCH.shortName}
                  </h3>
                  <p className="flex items-center gap-1.5 text-xs text-white/80">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#22c55e] animate-pulse" />
                    Protocol &amp; Pastoral Desk Online
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close WhatsApp chat popup"
                className="rounded p-1 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4 max-h-[70vh] overflow-y-auto bg-paper/40">
            {/* Welcome greeting card */}
            <div className="rounded-md border border-ink-950/10 bg-white p-3.5 text-xs leading-relaxed text-ink-950 shadow-sm">
              <p className="font-semibold text-brand-800">Peace and grace to you!</p>
              <p className="mt-1 text-ink-950/75">
                Welcome to Christ The Potter Church. How can we assist, guide, or pray with you today? Tap any topic
                below to chat directly with our team on WhatsApp:
              </p>
            </div>

            {/* Quick Topic Chips */}
            <div className="space-y-2">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-ink-950/60">
                Frequently Asked Topics:
              </p>
              <div className="grid gap-1.5">
                {QUICK_TOPICS.map((topic, i) => {
                  const Icon = topic.icon;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => openWhatsApp(topic.message)}
                      className="group flex w-full items-center gap-2.5 rounded border border-ink-950/15 bg-white p-2.5 text-left text-xs font-medium text-ink-950 transition-all hover:border-[#22c55e] hover:bg-[#eef7ea] hover:text-[#0f4a17]"
                    >
                      <Icon size={14} className="shrink-0 text-brand-700 group-hover:text-[#22c55e]" />
                      <span className="flex-1">{topic.label}</span>
                      <Send size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#0f4a17]" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Custom Message Field */}
            <div className="pt-2 border-t border-ink-950/10">
              <label htmlFor="custom-wa-msg" className="block text-[0.62rem] font-bold uppercase tracking-[0.2em] text-ink-950/60 mb-1.5">
                Or Type a Specific Question:
              </label>
              <div className="flex gap-2">
                <input
                  id="custom-wa-msg"
                  type="text"
                  placeholder="Type your message here..."
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      openWhatsApp(customMessage);
                    }
                  }}
                  className="flex-1 rounded border border-ink-950/20 bg-white px-3 py-2 text-xs text-ink-950 placeholder:text-ink-950/40 focus:border-[#22c55e] focus:outline-none focus:ring-1 focus:ring-[#22c55e]"
                />
                <button
                  type="button"
                  onClick={() => openWhatsApp(customMessage)}
                  aria-label="Send custom message on WhatsApp"
                  className="inline-flex items-center justify-center rounded bg-[#25D366] px-3.5 py-2 text-white hover:bg-[#20ba59] transition-colors"
                >
                  <Send size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Footer banner */}
          <div className="bg-paper border-t border-ink-950/10 px-4 py-2.5 text-center text-[0.68rem] text-ink-950/60">
            Replies typically within minutes &bull; Confidential &bull; Official CPC Desk
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* FLOATING LAUNCHER PILL / BUTTON */}
      {/* -------------------------------------------------------- */}
      <button
        type="button"
        onClick={() => {
          setIsOpen(!isOpen);
          setHasInteracted(true);
        }}
        aria-label={isOpen ? 'Close WhatsApp assistance' : 'Open WhatsApp assistance with Christ The Potter Church'}
        aria-expanded={isOpen}
        className={clsx(
          'group relative flex items-center gap-2.5 rounded-full px-4 py-3 shadow-2xl transition-all duration-200 sm:px-4.5',
          'bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white',
          'hover:from-[#20ba59] hover:to-[#0f7a6d] hover:shadow-green-900/30 hover:scale-105 active:scale-95',
          'ring-4 ring-white/80'
        )}
      >
        {/* Radar ping dot */}
        <span className="relative flex h-3 w-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
          <span className="relative inline-flex h-3 w-3 rounded-full bg-white" />
        </span>

        {/* WhatsApp Icon */}
        <MessageCircle size={20} className="shrink-0 transition-transform group-hover:rotate-6" />

        {/* Text Label */}
        <span className="text-[0.68rem] font-bold uppercase tracking-[0.16em]">
          WhatsApp Help
        </span>

        {/* First-time visitor subtle attention badge */}
        {!hasInteracted && (
          <span className="hidden sm:inline-block rounded-full bg-white/20 px-1.5 py-0.5 text-[0.58rem] font-semibold uppercase tracking-wider text-white">
            Online
          </span>
        )}
      </button>
    </aside>
  );
}

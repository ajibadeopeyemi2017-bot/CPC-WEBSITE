'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Sparkles, MapPin, Calendar, HeartHandshake, CheckCircle2, ExternalLink } from 'lucide-react';
import clsx from 'clsx';
import { CHURCH } from '../lib/site-config';
import { WHATSAPP_LINES, dispatchToBothWhatsAppLines, getWhatsAppLinks } from '../lib/whatsapp';

function WhatsAppLogo({ className = 'h-6 w-6' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12.031 2c-5.516 0-9.998 4.486-9.998 10.004 0 1.764.459 3.487 1.332 5.006L2 22l5.122-1.341a9.956 9.956 0 0 0 4.906 1.293h.004c5.515 0 9.998-4.486 9.998-10.004 0-2.673-1.04-5.186-2.928-7.076A9.936 9.936 0 0 0 12.031 2Zm0 18.295h-.003a8.29 8.29 0 0 1-4.228-1.158l-.303-.18-3.144.824.839-3.066-.198-.314a8.297 8.297 0 0 1-1.275-4.427c0-4.588 3.732-8.321 8.316-8.321 2.221 0 4.308.866 5.878 2.438a8.273 8.273 0 0 1 2.434 5.884c0 4.589-3.731 8.32-8.316 8.32Zm4.562-6.23c-.25-.125-1.478-.73-1.707-.813-.229-.084-.396-.125-.562.125-.167.25-.646.813-.792.98-.145.166-.291.187-.541.062-.25-.125-1.055-.389-2.01-1.24-.743-.663-1.244-1.482-1.39-1.732-.146-.25-.015-.385.11-.51.112-.112.25-.291.375-.437.125-.146.166-.25.25-.417.083-.167.042-.313-.021-.438-.062-.125-.562-1.355-.77-1.855-.203-.487-.41-.421-.563-.429-.145-.007-.312-.009-.479-.009s-.437.063-.666.313c-.229.25-.875.855-.875 2.085s.896 2.418 1.02 2.585c.125.167 1.762 2.691 4.27 3.773.596.258 1.062.412 1.425.527.599.19 1.144.163 1.575.099.48-.072 1.478-.604 1.686-1.188.209-.584.209-1.084.146-1.188-.062-.104-.229-.167-.479-.292Z" />
    </svg>
  );
}

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
    label: 'Conferences & schools registration',
    message: 'Hello Christ The Potter Church, I would like to inquire about upcoming conferences, schools, and registration details.',
  },
];

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const [dispatchedMessage, setDispatchedMessage] = useState(null);
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

  const sendToBoth = (msg) => {
    const textToSend = msg || customMessage.trim() || 'Hello Christ The Potter Church, I am reaching out from your website.';
    const links = dispatchToBothWhatsAppLines(textToSend);
    setDispatchedMessage({
      text: textToSend,
      links,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  };

  const openSingle = (url) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <aside
      ref={cardRef}
      aria-label="WhatsApp Pastoral and Protocol Support"
      className="fixed bottom-5 right-5 z-40 flex flex-col items-end sm:bottom-6 sm:right-6 print:hidden"
    >
      {/* -------------------------------------------------------- */}
      {/* POPUP CHAT DIALOG */}
      {/* -------------------------------------------------------- */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Chat with Christ The Potter Church on WhatsApp"
          className="mb-3.5 w-[calc(100vw-2.5rem)] max-w-sm rounded-2xl border border-ink-950/10 bg-white text-ink-950 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200 overflow-hidden sm:w-96"
        >
          {/* Header */}
          <div className="bg-[#25D366] p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/20 text-white ring-2 ring-white/40">
                  <WhatsAppLogo className="h-6 w-6 text-white" />
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#25D366] bg-white" />
                </div>
                <div>
                  <h3 className="font-display text-lg tracking-wide uppercase text-white leading-tight drop-shadow-sm">
                    {CHURCH.shortName}
                  </h3>
                  <p className="flex items-center gap-1.5 text-xs font-medium text-white/95">
                    <span className="inline-block h-2 w-2 rounded-full bg-white animate-pulse" />
                    Pastoral Desk &bull; Both Lines Online
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close WhatsApp chat popup"
                className="rounded-full p-1.5 text-white/90 hover:bg-black/10 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Dual-Number Badges */}
            <div className="mt-3 flex flex-wrap gap-2 text-[0.62rem] font-bold uppercase tracking-wider text-white">
              <span className="inline-flex items-center gap-1 rounded-full bg-black/15 px-2.5 py-0.5">
                Line 1: 0706 270 9694
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-black/15 px-2.5 py-0.5">
                Line 2: 0816 377 6464
              </span>
            </div>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4 max-h-[min(55vh,420px)] overflow-y-auto bg-paper/40">
            {/* Status if recently dispatched */}
            {dispatchedMessage ? (
              <div className="rounded-md border border-[#25D366]/40 bg-emerald-50 p-3 text-xs text-emerald-950 animate-in fade-in duration-200">
                <div className="flex items-center gap-2 font-bold text-[#0f4a17]">
                  <CheckCircle2 size={16} className="text-[#25D366] shrink-0" />
                  <span>Dispatched to both pastoral lines!</span>
                </div>
                <p className="mt-1 text-[0.72rem] text-ink-950/70">
                  Chats opened for both numbers. If a browser popup was blocked, tap either line below to open directly:
                </p>
                <div className="mt-2.5 grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => openSingle(dispatchedMessage.links.line1.url)}
                    className="flex items-center justify-center gap-1.5 rounded bg-[#25D366] px-2 py-1.5 text-[0.68rem] font-bold text-white shadow-sm hover:bg-[#1ebe57]"
                  >
                    <span>0706 270 9694</span>
                    <ExternalLink size={11} />
                  </button>
                  <button
                    type="button"
                    onClick={() => openSingle(dispatchedMessage.links.line2.url)}
                    className="flex items-center justify-center gap-1.5 rounded bg-[#25D366] px-2 py-1.5 text-[0.68rem] font-bold text-white shadow-sm hover:bg-[#1ebe57]"
                  >
                    <span>0816 377 6464</span>
                    <ExternalLink size={11} />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => setDispatchedMessage(null)}
                  className="mt-2 text-[0.65rem] underline text-ink-950/60 hover:text-ink-950"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <>
                {/* Welcome greeting card */}
                <div className="rounded-md border border-ink-950/10 bg-white p-3.5 text-xs leading-relaxed text-ink-950 shadow-sm">
                  <p className="font-semibold text-[#128C7E]">Peace and grace to you!</p>
                  <p className="mt-1 text-ink-950/75">
                    Messages are delivered simultaneously to both official pastoral WhatsApp numbers:
                    <strong className="block text-[#0f4a17] mt-0.5">0706 270 9694 &amp; 0816 377 6464</strong>
                  </p>
                </div>

                {/* Quick Topic Chips */}
                <div className="space-y-2">
                  <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-ink-950/60">
                    Frequently Asked Topics (Sends to Both Lines):
                  </p>
                  <div className="grid gap-1.5">
                    {QUICK_TOPICS.map((topic, i) => {
                      const Icon = topic.icon;
                      return (
                        <button
                          key={i}
                          type="button"
                          onClick={() => sendToBoth(topic.message)}
                          className="group flex w-full items-center gap-2.5 rounded border border-ink-950/15 bg-white p-2.5 text-left text-xs font-medium text-ink-950 transition-all hover:border-[#25D366] hover:bg-[#eef7ea] hover:text-[#0f4a17]"
                        >
                          <Icon size={14} className="shrink-0 text-[#25D366] group-hover:text-[#1ebe57]" />
                          <span className="flex-1">{topic.label}</span>
                          <Send size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#25D366]" />
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
                          sendToBoth(customMessage);
                        }
                      }}
                      className="flex-1 rounded border border-ink-950/20 bg-white px-3 py-2 text-xs text-ink-950 placeholder:text-ink-950/40 focus:border-[#25D366] focus:outline-none focus:ring-1 focus:ring-[#25D366]"
                    />
                    <button
                      type="button"
                      onClick={() => sendToBoth(customMessage)}
                      aria-label="Send message to both WhatsApp numbers"
                      className="inline-flex items-center justify-center rounded bg-[#25D366] px-3.5 py-2 text-white hover:bg-[#1ebe57] transition-colors shadow-sm"
                      title="Send to both lines: 07062709694 & 08163776464"
                    >
                      <Send size={14} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer banner */}
          <div className="bg-paper border-t border-ink-950/10 px-4 py-2 text-center text-[0.66rem] text-ink-950/65">
            Both 07062709694 &amp; 08163776464 receive your chat &bull; Call: {CHURCH.phone}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------- */}
      {/* FLOATING WHATSAPP VERTICAL PILL (RIGHT SIDE) */}
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
          'group relative flex flex-col items-center justify-between rounded-full text-white shadow-2xl transition-all duration-300',
          'bg-[#25D366] hover:bg-[#1ebe57]',
          'w-12 py-3.5 sm:w-13 sm:py-4',
          'hover:shadow-[0_10px_28px_rgba(37,211,102,0.5)] hover:scale-105 active:scale-95',
          'ring-4 ring-white/95'
        )}
      >
        {/* Top: Official WhatsApp logo or close X */}
        <div className="flex items-center justify-center">
          {isOpen ? (
            <X className="h-6 w-6 text-white transition-transform duration-200 group-hover:rotate-90" />
          ) : (
            <WhatsAppLogo className="h-7 w-7 shrink-0 text-white transition-transform duration-200 group-hover:scale-110" />
          )}
        </div>

        {/* Middle: Vertical Text Label extending upwards */}
        <span className="my-2 [writing-mode:vertical-rl] rotate-180 text-[10px] sm:text-[11px] font-extrabold uppercase tracking-[0.24em] text-white drop-shadow-sm select-none">
          {isOpen ? 'Close' : 'WhatsApp'}
        </span>

        {/* Bottom: Online pulse indicator dot */}
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-80" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
      </button>
    </aside>
  );
}

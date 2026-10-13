'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  CalendarPlus,
  Check,
  ChevronDown,
  Download,
  ExternalLink,
  X,
  Bell,
  Calendar,
  Sparkles,
} from 'lucide-react';
import clsx from 'clsx';
import {
  SERVICE_EVENTS,
  getGoogleCalendarUrl,
  downloadIcsCalendar,
} from '../../lib/calendar';

export default function AddToCalendarButton({
  eventKey = 'sunday',
  customEvent = null,
  variant = 'white',
  size = 'md',
  className = '',
  label = 'Add to Calendar',
  fullWidth = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState(eventKey);
  const [downloaded, setDownloaded] = useState(false);
  const [mounted, setMounted] = useState(false);
  const modalContentRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const activeEvent = customEvent || SERVICE_EVENTS[selectedKey] || SERVICE_EVENTS.sunday;

  // Handle body scroll locking and Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleAppleIcsDownload = () => {
    downloadIcsCalendar(activeEvent);
    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
      setIsOpen(false);
    }, 1500);
  };

  const googleUrl = getGoogleCalendarUrl(activeEvent);

  const buttonVariants = {
    white: 'border-white bg-white text-brand-700 hover:bg-brand-50 shadow-sm active:scale-[0.98]',
    solid: 'border-brand-600 bg-brand-600 text-white hover:bg-brand-700 shadow-sm active:scale-[0.98]',
    outlineLight: 'border-white/80 text-white hover:bg-white hover:text-ink-950 active:scale-[0.98]',
    outlineDark: 'border-ink-950 text-ink-950 hover:bg-ink-950 hover:text-white active:scale-[0.98]',
  };

  const buttonSizes = {
    sm: 'px-3 py-1.5 text-[0.64rem]',
    md: 'px-4 py-2.5 text-[0.68rem] sm:px-5 sm:py-3 sm:text-[0.70rem]',
    lg: 'px-5 py-3 text-[0.72rem] sm:px-6 sm:py-3.5 sm:text-[0.74rem]',
  };

  const modalMarkup = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Add event to calendar"
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-ink-950/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        // Close if clicking the backdrop outside modal content
        if (modalContentRef.current && !modalContentRef.current.contains(e.target)) {
          setIsOpen(false);
        }
      }}
    >
      {/* MODAL / BOTTOM SHEET CONTAINER */}
      <div
        ref={modalContentRef}
        className="w-full max-w-lg rounded-t-2xl sm:rounded-xl border border-ink-950/15 bg-white text-ink-950 shadow-2xl animate-in slide-in-from-bottom sm:zoom-in-95 duration-200 overflow-hidden max-h-[90vh] flex flex-col"
      >
        {/* Mobile Pull Indicator */}
        <div className="flex justify-center pt-2 sm:hidden">
          <div className="h-1 w-10 rounded-full bg-ink-950/20" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-ink-950/10 px-5 py-4 bg-brand-50/50">
          <div className="flex items-center gap-2 text-brand-700">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-white shadow-sm">
              <CalendarPlus size={15} />
            </span>
            <div>
              <h3 className="font-display text-base uppercase tracking-wide text-ink-950 sm:text-lg">
                Add to Calendar
              </h3>
              <p className="text-[0.65rem] font-bold uppercase tracking-wider text-brand-700">
                1-Click Reminders with 1-hr alert
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close calendar options"
            className="rounded-full p-1.5 text-ink-950/50 transition-colors hover:bg-ink-950/10 hover:text-ink-950"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Body for small viewports */}
        <div className="overflow-y-auto px-5 py-4 space-y-4">
          {/* Service Selector if not custom event */}
          {!customEvent && (
            <div>
              <p className="mb-1.5 text-[0.64rem] font-bold uppercase tracking-wider text-ink-950/60">
                Select Service
              </p>
              <div className="grid grid-cols-3 gap-1.5 rounded-lg bg-paper p-1 text-[0.64rem] font-bold uppercase">
                {['sunday', 'tuesday', 'thursday'].map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setSelectedKey(key)}
                    className={clsx(
                      'rounded py-2 px-1 text-center transition-all',
                      selectedKey === key
                        ? 'bg-brand-600 text-white shadow-sm font-extrabold'
                        : 'text-ink-950/70 hover:text-ink-950 hover:bg-white/60'
                    )}
                  >
                    {key === 'sunday' ? 'Sunday 8 AM' : key === 'tuesday' ? 'Tue 5 PM' : 'Thu 5 PM'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Active Event Summary */}
          <div className="rounded-lg border border-brand-600/20 bg-brand-50/70 p-3.5 text-left">
            <p className="text-[0.62rem] font-bold uppercase tracking-widest text-brand-700">
              Selected Gathering
            </p>
            <h4 className="mt-1 font-display text-sm uppercase text-ink-950 sm:text-base">
              {activeEvent.title}
            </h4>
            <p className="mt-1 text-xs text-ink-950/80 leading-relaxed">
              📍 {activeEvent.location || '76B PHCN Office, Off Fajuyi Road, Ile-Ife'}
            </p>
            {activeEvent.date && (
              <p className="mt-1 text-[0.72rem] font-semibold text-brand-800">
                🗓️ {activeEvent.date} {activeEvent.time ? `· ${activeEvent.time}` : ''}
              </p>
            )}
          </div>

          {/* Action Options */}
          <div className="space-y-2.5">
            {/* Google Calendar */}
            <a
              href={googleUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="group flex w-full items-center justify-between rounded-lg border border-ink-950/15 bg-white p-3.5 text-left transition-all hover:border-brand-600 hover:bg-brand-50 hover:shadow-sm active:bg-brand-100"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 font-extrabold text-sm border border-blue-100">
                  G
                </span>
                <div>
                  <span className="block text-sm font-bold text-ink-950 group-hover:text-brand-900">
                    Google Calendar
                  </span>
                  <span className="block text-[0.68rem] text-ink-950/65">
                    Android, Chrome, Gmail &amp; Web
                  </span>
                </div>
              </div>
              <ExternalLink size={16} className="text-ink-950/40 group-hover:text-brand-700 shrink-0" />
            </a>

            {/* Apple Calendar / iPhone (.ics) */}
            <button
              type="button"
              onClick={handleAppleIcsDownload}
              className="group flex w-full items-center justify-between rounded-lg border border-ink-950/15 bg-white p-3.5 text-left transition-all hover:border-brand-600 hover:bg-brand-50 hover:shadow-sm active:bg-brand-100"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-ink-950 font-extrabold text-sm border border-zinc-200">
                  
                </span>
                <div>
                  <span className="block text-sm font-bold text-ink-950 group-hover:text-brand-900">
                    Apple Calendar &amp; iPhone
                  </span>
                  <span className="block text-[0.68rem] text-ink-950/65">
                    Direct .ics download with 1-hr advance alarm
                  </span>
                </div>
              </div>
              {downloaded ? (
                <span className="inline-flex items-center gap-1 rounded bg-green-100 px-2 py-1 text-xs font-bold text-green-800 shrink-0">
                  <Check size={14} /> Added!
                </span>
              ) : (
                <Download size={16} className="text-ink-950/40 group-hover:text-brand-700 shrink-0" />
              )}
            </button>

            {/* Outlook / Universal */}
            <button
              type="button"
              onClick={handleAppleIcsDownload}
              className="group flex w-full items-center justify-between rounded-lg border border-ink-950/15 bg-white p-3.5 text-left transition-all hover:border-brand-600 hover:bg-brand-50 hover:shadow-sm active:bg-brand-100"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sky-50 text-sky-700 font-extrabold text-sm border border-sky-100">
                  O
                </span>
                <div>
                  <span className="block text-sm font-bold text-ink-950 group-hover:text-brand-900">
                    Microsoft Outlook &amp; Others
                  </span>
                  <span className="block text-[0.68rem] text-ink-950/65">
                    Universal iCalendar RFC-5545 format
                  </span>
                </div>
              </div>
              <Download size={16} className="text-ink-950/40 group-hover:text-brand-700 shrink-0" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-ink-950/10 bg-paper/60 px-5 py-3 text-center sm:text-right">
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="w-full sm:w-auto rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wider text-ink-950/70 hover:bg-ink-950/5 hover:text-ink-950 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <div className={clsx('inline-block', fullWidth ? 'w-full' : '', className)}>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-haspopup="dialog"
          aria-expanded={isOpen}
          className={clsx(
            'inline-flex w-full items-center justify-center gap-2 border font-bold uppercase tracking-[0.18em] transition-all duration-150',
            buttonVariants[variant] || buttonVariants.white,
            buttonSizes[size] || buttonSizes.md
          )}
        >
          <CalendarPlus size={15} />
          <span>{label}</span>
          <ChevronDown size={14} className={clsx('transition-transform duration-200', isOpen && 'rotate-180')} />
        </button>
      </div>

      {isOpen && mounted && createPortal(modalMarkup, document.body)}
    </>
  );
}

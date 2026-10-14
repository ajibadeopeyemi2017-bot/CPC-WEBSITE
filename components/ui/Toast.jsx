'use client';

import { useState, useEffect, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, X, Sparkles } from 'lucide-react';
import clsx from 'clsx';

// Global toast trigger utility that works from any Client Component
export function showToast(message, options = {}) {
  if (typeof window === 'undefined') return;
  const detail = {
    id: `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    message: typeof message === 'string' ? message : message.message,
    title: options.title || (typeof message === 'object' ? message.title : null),
    type: options.type || (typeof message === 'object' ? message.type : 'success'), // 'success' | 'error' | 'info'
    duration: options.duration || 3800,
  };
  window.dispatchEvent(new CustomEvent('cpc:toast', { detail }));
}

export const toast = {
  success: (msg, title) => showToast(msg, { type: 'success', title }),
  error: (msg, title) => showToast(msg, { type: 'error', title }),
  info: (msg, title) => showToast(msg, { type: 'info', title }),
};

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    const handleToastEvent = (e) => {
      if (!e.detail) return;
      const newToast = e.detail;
      setToasts((prev) => [...prev.slice(-3), newToast]); // keep maximum 4 active toasts

      if (newToast.duration > 0) {
        setTimeout(() => {
          removeToast(newToast.id);
        }, newToast.duration);
      }
    };

    window.addEventListener('cpc:toast', handleToastEvent);
    return () => window.removeEventListener('cpc:toast', handleToastEvent);
  }, [removeToast]);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="pointer-events-none fixed bottom-20 right-4 z-[9999] flex flex-col items-end gap-2.5 sm:bottom-6 sm:right-6 max-w-sm w-full px-2"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          role="status"
          className={clsx(
            'pointer-events-auto flex items-start gap-3 w-full border p-3.5 shadow-2xl backdrop-blur-xl transition-all animate-fadeIn',
            t.type === 'error'
              ? 'border-red-500/50 bg-ink-950/95 text-white ring-1 ring-red-500/20'
              : t.type === 'info'
              ? 'border-blue-400/50 bg-ink-950/95 text-white ring-1 ring-blue-400/20'
              : 'border-brand-500/50 bg-ink-950/95 text-white ring-1 ring-brand-500/20'
          )}
        >
          <div className="shrink-0 mt-0.5">
            {t.type === 'error' ? (
              <AlertCircle size={18} className="text-red-400" />
            ) : t.type === 'info' ? (
              <Info size={18} className="text-blue-400" />
            ) : (
              <CheckCircle2 size={18} className="text-brand-400" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            {t.title && (
              <h5 className="font-display text-xs uppercase tracking-wider text-brand-300">
                {t.title}
              </h5>
            )}
            <p className="text-xs leading-relaxed text-white/90 font-medium">
              {t.message}
            </p>
          </div>

          <button
            type="button"
            onClick={() => removeToast(t.id)}
            aria-label="Dismiss notification"
            className="shrink-0 p-1 text-white/50 hover:text-white transition-colors"
          >
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

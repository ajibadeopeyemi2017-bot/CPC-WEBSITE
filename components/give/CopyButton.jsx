'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import clsx from 'clsx';
import { toast } from '../ui/Toast';

export default function CopyButton({ value, label = 'Copy', tone = 'dark', toastMessage }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(toastMessage || `Copied "${value}" to clipboard`);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard can be blocked (e.g. non-HTTPS); the number is still visible to copy by hand.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`${label} ${value}`}
      className={clsx(
        'inline-flex items-center gap-2 border px-4 py-2 text-[0.64rem] font-bold uppercase tracking-[0.18em] transition-colors',
        tone === 'light'
          ? 'border-white/40 text-white hover:bg-white hover:text-ink-950'
          : 'border-ink-950/25 text-ink-950 hover:border-ink-950'
      )}
    >
      {copied ? <Check size={13} /> : <Copy size={13} />}
      {copied ? 'Copied' : label}
    </button>
  );
}

'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCw, Home, Phone } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import { CHURCH } from '../lib/site-config';

export default function ErrorBoundary({ error, reset }) {
  useEffect(() => {
    // Log error to console for debugging
    console.error('[CPC APP ERROR]', error);
  }, [error]);

  return (
    <div className="py-24 sm:py-32 bg-paper min-h-[70vh] flex items-center">
      <Container narrow className="text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-amber-50 text-amber-700 ring-8 ring-amber-500/10 mb-6">
          <AlertTriangle size={30} />
        </div>

        <p className="text-[0.68rem] font-bold uppercase tracking-[0.25em] text-brand-700">
          Temporary Technical Hiccup
        </p>

        <h1 className="mt-3 font-display text-4xl uppercase text-ink-950 sm:text-5xl">
          Something Went Wrong
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink-950/75">
          We encountered an unexpected issue while loading this page. Please refresh or return to the main church portal.
        </p>

        {error?.message && (
          <div className="mx-auto mt-4 max-w-md rounded bg-ink-950/5 p-3 text-xs font-mono text-ink-950/70 overflow-x-auto text-left">
            <code>{error.message}</code>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button variant="solid" size="lg" onClick={() => reset()}>
            <RefreshCw size={14} />
            Try Again
          </Button>
          <Button variant="outlineDark" size="lg" href="/">
            <Home size={14} />
            Return Home
          </Button>
        </div>

        <div className="mt-10 border-t border-ink-950/10 pt-6 text-xs text-ink-950/60">
          Need immediate assistance? Call our church office at{' '}
          <a href={CHURCH.phoneHref} className="font-semibold text-brand-700 underline">
            {CHURCH.phone}
          </a>
        </div>
      </Container>
    </div>
  );
}

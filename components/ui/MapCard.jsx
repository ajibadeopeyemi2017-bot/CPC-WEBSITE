'use client';

import { useState } from 'react';
import { MapPin, Navigation, Copy, Check, Phone, Compass, ExternalLink } from 'lucide-react';
import { CHURCH } from '../../lib/site-config';
import Button from './Button';
import Card from './Card';
import Eyebrow from './Eyebrow';

export default function MapCard({ showEmbed = true, className = '' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(CHURCH.address.full);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard fallback
    }
  };

  return (
    <Card className={`overflow-hidden ${className}`}>
      {showEmbed && (
        <div className="relative aspect-[16/10] w-full border-b border-ink-950/15 bg-paper sm:aspect-[21/9]">
          <iframe
            title="Christ The Potter Church Location Map"
            src={CHURCH.mapsEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full grayscale-[25%] contrast-[1.05]"
          />
          <div className="pointer-events-none absolute left-4 top-4 hidden sm:block">
            <span className="inline-flex items-center gap-1.5 border border-ink-950/20 bg-white/95 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-ink-950 shadow-sm backdrop-blur-sm">
              <MapPin size={12} className="text-brand-600" />
              Ile-Ife Main Auditorium
            </span>
          </div>
        </div>
      )}

      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <Eyebrow>Location &amp; Directions</Eyebrow>
            <h3 className="mt-3 font-display text-3xl uppercase leading-none text-ink-950 sm:text-4xl">
              {CHURCH.address.venue}
            </h3>
            <p className="mt-2 text-base font-medium text-ink-950/80 sm:text-lg">
              {CHURCH.address.full}
            </p>
          </div>

          <button
            type="button"
            onClick={handleCopy}
            className="flex items-center gap-2 border border-ink-950/20 bg-white px-3.5 py-2 text-xs font-semibold text-ink-950 transition-colors hover:border-ink-950 hover:bg-paper"
            aria-label="Copy church address"
          >
            {copied ? (
              <>
                <Check size={14} className="text-brand-600" />
                <span className="text-brand-700">Address copied</span>
              </>
            ) : (
              <>
                <Copy size={14} className="text-ink-950/60" />
                <span>Copy address</span>
              </>
            )}
          </button>
        </div>

        <div className="mt-6 border-l-2 border-brand-600 bg-brand-50/70 p-4 text-sm leading-relaxed text-brand-900">
          <p className="font-semibold text-brand-800">
            📍 Landmark &amp; Parking Guide:
          </p>
          <p className="mt-1 text-ink-950/80">
            {CHURCH.address.landmark} Marshals and protocol team are stationed at the gate to direct you to safe on-site parking.
          </p>
        </div>

        <div className="mt-7 flex flex-wrap gap-3">
          <Button
            variant="solid"
            size="lg"
            href={CHURCH.mapsUrl}
            external
          >
            <Navigation size={14} />
            Get Turn-by-Turn Directions
          </Button>

          <Button
            variant="outlineDark"
            size="lg"
            href={CHURCH.phoneHref}
          >
            <Phone size={14} />
            Call Help Line ({CHURCH.phone})
          </Button>
        </div>
      </div>
    </Card>
  );
}

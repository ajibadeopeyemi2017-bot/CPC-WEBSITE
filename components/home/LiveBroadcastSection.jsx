'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Tv, Radio, Play, Volume2, ArrowRight, Clock, ExternalLink } from 'lucide-react';
import { SOCIAL_LINKS, FEATURED_VIDEOS } from '../../lib/site-config';
import { SERMONS, playSermon, playLiveMixlr } from '../../lib/sermons';
import { useLiveStatus } from '../../hooks/useLiveStatus';
import Container from '../ui/Container';
import Eyebrow from '../ui/Eyebrow';
import Button from '../ui/Button';

export default function LiveBroadcastSection() {
  const { isLive, activeService, nextService, countdown, mounted } = useLiveStatus();
  const featuredVideo = FEATURED_VIDEOS[0];
  const matchingSermon = SERMONS.find((s) => s.id === featuredVideo.sermonSlug) || SERMONS[0];

  return (
    <section id="live-stream" className="bg-ink-950 py-20 text-white lg:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:items-center">
          {/* Left: Live Broadcast Callout & Countdown */}
          <div>
            <div className="flex flex-wrap items-center gap-3">
              {mounted && isLive ? (
                <span className="inline-flex items-center gap-2 bg-red-600 px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-white">
                  <span className="live-dot !bg-white" />
                  Live Broadcast in Progress
                </span>
              ) : (
                <Eyebrow tone="light">Online Church Sanctuary</Eyebrow>
              )}

              {mounted && !isLive && nextService && countdown && (
                <span className="inline-flex items-center gap-1.5 border border-white/15 bg-white/5 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.18em] text-[#d4af37]">
                  <Clock size={12} />
                  Next Live: {nextService.shortName} in {countdown.formatted}
                </span>
              )}
            </div>

            <h2 className="mt-5 font-display text-[2.4rem] uppercase leading-[0.94] text-white sm:text-5xl lg:text-[3.5rem]">
              {mounted && isLive && activeService
                ? `${activeService.name} Is Live`
                : 'Watch Live Video & Mixlr Broadcasts'}
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/75 sm:text-base">
              Join believers across Nigeria and around the globe in our Online Sanctuary. Stream live video on Facebook Live, tune in via low-data Mixlr audio, take live sermon notes, and submit real-time prayer requests.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button variant="solid" size="lg" href="/live">
                <Tv size={15} />
                Enter Online Sanctuary
              </Button>

              <Button
                variant="outlineLight"
                size="lg"
                onClick={() => playLiveMixlr()}
              >
                <Volume2 size={15} />
                Listen on Mixlr Audio
              </Button>

              <a
                href={SOCIAL_LINKS.facebookLive}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-brand-300 hover:text-white"
              >
                Facebook Live
                <ExternalLink size={13} />
              </a>
            </div>
          </div>

          {/* Right: Visual Video Stage Preview */}
          <div className="border border-white/15 bg-black p-4 sm:p-5">
            <div className="relative aspect-video w-full overflow-hidden bg-ink-950">
              <Image
                src={featuredVideo.thumbnail}
                alt={featuredVideo.title}
                fill
                sizes="(min-width: 1024px) 500px, 100vw"
                className="object-cover object-top opacity-75 transition-transform duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/35 to-transparent" />

              <div className="absolute left-3.5 top-3.5 flex items-center gap-2">
                {mounted && isLive ? (
                  <span className="inline-flex items-center gap-1.5 bg-red-600 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-widest text-white">
                    <span className="live-dot !bg-white" />
                    Live Now
                  </span>
                ) : (
                  <span className="bg-brand-600 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-widest text-white">
                    Featured Ministration · {featuredVideo.duration}
                  </span>
                )}
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                {mounted && isLive ? (
                  <Link
                    href="/live"
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600 text-white shadow-2xl transition-transform hover:scale-110"
                    aria-label="Enter Live Sanctuary"
                  >
                    <Tv size={24} />
                  </Link>
                ) : (
                  <button
                    type="button"
                    onClick={() => playSermon(matchingSermon)}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-white shadow-2xl transition-transform hover:scale-110"
                    aria-label={`Play ${featuredVideo.title}`}
                  >
                    <Play size={24} className="ml-1 fill-current" />
                  </button>
                )}
              </div>

              <div className="absolute bottom-3.5 left-3.5 right-3.5">
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-[#d4af37]">
                  {featuredVideo.scripture}
                </p>
                <p className="mt-0.5 font-display text-xl uppercase leading-tight text-white">
                  {featuredVideo.title}
                </p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-white/75">
              <span>Sunday 8:00 AM · Tuesday &amp; Thursday 5:00 PM (WAT)</span>
              <Link
                href="/live#highlights"
                className="inline-flex items-center gap-1 font-bold uppercase tracking-wider text-brand-300 hover:underline"
              >
                All Video Highlights
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}


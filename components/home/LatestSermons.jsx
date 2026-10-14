'use client';

import { useState, useEffect } from 'react';
import { Play, ArrowRight, Download, RotateCcw } from 'lucide-react';
import {
  SERMONS,
  playSermon,
  downloadSermonAudio,
  getSavedPlaybackPosition,
  formatAudioTime,
} from '../../lib/sermons';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import Button from '../ui/Button';

const latest = SERMONS.slice(0, 4);

export default function LatestSermons() {
  const [activePlayingId, setActivePlayingId] = useState(null);
  const [resumePositions, setResumePositions] = useState({});

  useEffect(() => {
    const positions = {};
    for (const s of latest) {
      const pos = getSavedPlaybackPosition(s.id);
      if (pos && pos > 8) {
        positions[s.id] = pos;
      }
    }
    setResumePositions(positions);

    const onPlay = (e) => {
      if (e.detail?.id) {
        setActivePlayingId(e.detail.id);
      }
    };

    window.addEventListener('play-cpc-sermon', onPlay);
    return () => window.removeEventListener('play-cpc-sermon', onPlay);
  }, []);

  return (
    <section className="pb-20 lg:pb-28">
      <Container>
        <SectionHeader
          eyebrow="From the pulpit"
          title="Latest messages"
          aside="“Man shall not live by bread alone, but by every word that proceeds from the mouth of God.” Invest in your spirit man."
        />

        <ol className="border-b border-ink-950/10">
          {latest.map((sermon, i) => {
            const isPlaying = activePlayingId === sermon.id;
            const savedPos = resumePositions[sermon.id];

            return (
              <li
                key={sermon.id}
                className={`grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-4 border-t border-ink-950/10 py-6 md:grid-cols-[auto_1fr_auto_auto] md:gap-x-8 transition-colors ${
                  isPlaying ? 'bg-brand-50/20 px-3 -mx-3 border-t-2 border-brand-600' : ''
                }`}
              >
                <span className="font-display text-3xl text-brand-600 md:text-4xl">
                  {String(i + 1).padStart(2, '0')}
                </span>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-xl uppercase leading-tight text-ink-950 md:text-2xl">
                      {sermon.title}
                    </h3>
                    {isPlaying && (
                      <span className="inline-flex items-center gap-1 rounded bg-brand-600 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider text-white">
                        <span className="live-dot !bg-white" />
                        Playing
                      </span>
                    )}
                  </div>
                  <p className="mt-1.5 text-[0.64rem] font-bold uppercase tracking-[0.22em] text-ink-950/55">
                    {sermon.series} · {sermon.scripture}
                  </p>
                </div>

                <div className="col-start-2 flex items-center gap-2 text-sm text-ink-950/60 md:col-start-auto">
                  <span>{sermon.duration}</span>
                  {savedPos && !isPlaying && (
                    <span className="rounded bg-brand-50 px-2 py-0.5 text-[0.6rem] font-semibold text-brand-700">
                      Progress: {formatAudioTime(savedPos)}
                    </span>
                  )}
                </div>

                <div className="col-start-2 flex items-center gap-2 justify-self-start md:col-start-auto">
                  {savedPos ? (
                    <Button
                      variant="solid"
                      size="sm"
                      onClick={() => playSermon(sermon, { resumeTime: savedPos })}
                      aria-label={`Resume ${sermon.title}`}
                      title={`Resume from ${formatAudioTime(savedPos)}`}
                    >
                      <RotateCcw size={12} />
                      Resume
                    </Button>
                  ) : null}

                  <Button
                    variant="outlineDark"
                    size="sm"
                    onClick={() => playSermon(sermon)}
                    aria-label={`Play ${sermon.title}`}
                  >
                    <Play size={12} />
                    {isPlaying ? 'Active' : 'Play'}
                  </Button>

                  <button
                    type="button"
                    onClick={() => downloadSermonAudio(sermon)}
                    aria-label={`Download ${sermon.title} MP3`}
                    title="Download MP3"
                    className="flex h-9 w-9 items-center justify-center border border-ink-950/20 text-ink-950/70 hover:border-brand-600 hover:text-brand-600 transition-colors"
                  >
                    <Download size={13} />
                  </button>
                </div>
              </li>
            );
          })}
        </ol>

        <Button variant="outlineDark" href="/sermons" className="mt-10">
          Full sermon archive
          <ArrowRight size={14} />
        </Button>
      </Container>
    </section>
  );
}

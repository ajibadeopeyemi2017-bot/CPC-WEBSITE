'use client';

import { useState, useEffect } from 'react';
import clsx from 'clsx';
import {
  Play,
  Pause,
  Search,
  Share2,
  Check,
  Radio,
  Download,
  Bookmark,
  BookmarkCheck,
  Clock,
  RotateCcw,
  SlidersHorizontal,
  X,
  Volume2,
} from 'lucide-react';
import {
  SERMONS,
  SERMON_CATEGORIES,
  SERMON_SERIES,
  SERMON_MINISTERS,
  playSermon,
  playLiveMixlr,
  formatAudioTime,
  getSavedPlaybackPosition,
  getBookmarkedSermonIds,
  toggleBookmarkSermon,
  downloadSermonAudio,
} from '../../lib/sermons';
import { SOCIAL_LINKS } from '../../lib/site-config';
import { useLiveStatus } from '../../hooks/useLiveStatus';
import Container from '../ui/Container';
import Eyebrow from '../ui/Eyebrow';
import Button from '../ui/Button';

function ShareButton({ sermon }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = typeof window !== 'undefined' ? `${window.location.origin}/sermons#${sermon.id}` : '';
    try {
      if (navigator.share) {
        await navigator.share({
          title: sermon.title,
          text: `${sermon.title} — ${sermon.minister} | Christ The Potter Church`,
          url,
        });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // User dismissed share
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      aria-label={`Share ${sermon.title}`}
      title="Share sermon link"
      className="flex h-9 w-9 items-center justify-center border border-ink-950/20 text-ink-950/70 transition-colors hover:border-ink-950 hover:text-ink-950"
    >
      {copied ? <Check size={14} className="text-brand-600" /> : <Share2 size={14} />}
    </button>
  );
}

function DownloadButton({ sermon }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadSermonAudio(sermon);
    } finally {
      setTimeout(() => setDownloading(false), 2200);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={downloading}
      aria-label={`Download ${sermon.title} MP3`}
      title="Download MP3 for offline listening"
      className="flex h-9 w-9 items-center justify-center border border-ink-950/20 text-ink-950/70 transition-colors hover:border-brand-600 hover:text-brand-600 disabled:opacity-50"
    >
      <Download size={14} className={downloading ? 'animate-bounce text-brand-600' : ''} />
    </button>
  );
}

function BookmarkButton({ sermonId, bookmarkedIds, onToggle }) {
  const isBookmarked = bookmarkedIds.includes(sermonId);

  return (
    <button
      type="button"
      onClick={() => onToggle(sermonId)}
      aria-label={isBookmarked ? 'Remove from saved sermons' : 'Save sermon to my list'}
      title={isBookmarked ? 'Saved to your library' : 'Save for later study'}
      className={clsx(
        'flex h-9 w-9 items-center justify-center border transition-colors',
        isBookmarked
          ? 'border-brand-600 bg-brand-50 text-brand-700'
          : 'border-ink-950/20 text-ink-950/70 hover:border-ink-950 hover:text-ink-950'
      )}
    >
      {isBookmarked ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
    </button>
  );
}

export default function SermonLibrary() {
  const [category, setCategory] = useState('All');
  const [series, setSeries] = useState('All');
  const [minister, setMinister] = useState('All');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(SERMONS[0]);
  const [activePlayingId, setActivePlayingId] = useState(null);
  const [bookmarkedIds, setBookmarkedIds] = useState([]);
  const [resumePositions, setResumePositions] = useState({});
  const { isLive } = useLiveStatus();

  // Load bookmarks & resume points on client mount
  useEffect(() => {
    setBookmarkedIds(getBookmarkedSermonIds());

    const positions = {};
    for (const s of SERMONS) {
      const pos = getSavedPlaybackPosition(s.id);
      if (pos && pos > 8) {
        positions[s.id] = pos;
      }
    }
    setResumePositions(positions);

    const handleBookmarksChanged = () => {
      setBookmarkedIds(getBookmarkedSermonIds());
    };

    const handlePlayEvent = (e) => {
      if (e.detail?.id) {
        setActivePlayingId(e.detail.id);
      }
    };

    window.addEventListener('cpc:bookmarks-changed', handleBookmarksChanged);
    window.addEventListener('play-cpc-sermon', handlePlayEvent);

    return () => {
      window.removeEventListener('cpc:bookmarks-changed', handleBookmarksChanged);
      window.removeEventListener('play-cpc-sermon', handlePlayEvent);
    };
  }, []);

  const handleToggleBookmark = (id) => {
    toggleBookmarkSermon(id);
    setBookmarkedIds(getBookmarkedSermonIds());
  };

  const q = query.trim().toLowerCase();
  const filtered = SERMONS.filter((s) => {
    if (category !== 'All' && s.category !== category) return false;
    if (series !== 'All' && s.series !== series) return false;
    if (minister !== 'All' && s.minister !== minister) return false;
    if (onlyBookmarked && !bookmarkedIds.includes(s.id)) return false;

    if (q) {
      const haystack = [s.title, s.scripture, s.series, s.minister, s.occasion, s.description]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(q)) return false;
    }
    return true;
  });

  const play = (sermon, options = {}) => {
    setActive(sermon);
    setActivePlayingId(sermon.id);
    playSermon(sermon, options);
  };

  const hasActiveFilters = category !== 'All' || series !== 'All' || minister !== 'All' || onlyBookmarked || query !== '';

  const clearAllFilters = () => {
    setCategory('All');
    setSeries('All');
    setMinister('All');
    setOnlyBookmarked(false);
    setQuery('');
  };

  const featuredResumePos = resumePositions[active.id];

  return (
    <>
      {/* Featured Sermon Hero Banner */}
      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="grid gap-10 bg-ink-950 p-7 text-white sm:p-12 lg:grid-cols-[1.4fr_1fr] lg:items-end">
            <div>
              <div className="flex items-center gap-2">
                <Eyebrow tone="light">Featured message</Eyebrow>
                {activePlayingId === active.id && (
                  <span className="flex items-center gap-1.5 rounded-full border border-brand-400 bg-brand-900/60 px-2.5 py-0.5 text-[0.58rem] font-bold uppercase tracking-wider text-brand-300">
                    <span className="live-dot !bg-brand-400" />
                    Now Playing
                  </span>
                )}
              </div>

              <h2 className="mt-4 font-display text-[2rem] uppercase leading-[0.95] sm:text-4xl lg:text-5xl">
                {active.title}
              </h2>

              <p className="mt-3.5 text-[0.64rem] font-bold uppercase tracking-[0.22em] text-brand-300">
                {active.minister} · {active.scripture} · {active.duration}
              </p>

              <p className="mt-4 max-w-2xl leading-relaxed text-white/80 text-sm sm:text-base">
                {active.description}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 lg:justify-end">
              {featuredResumePos ? (
                <Button
                  variant="solid"
                  size="lg"
                  onClick={() => play(active, { resumeTime: featuredResumePos })}
                  title={`Resume from ${formatAudioTime(featuredResumePos)}`}
                >
                  <RotateCcw size={14} />
                  Resume ({formatAudioTime(featuredResumePos)})
                </Button>
              ) : null}

              <Button
                variant={featuredResumePos ? 'outlineLight' : 'solid'}
                size="lg"
                onClick={() => play(active)}
              >
                <Play size={14} />
                Listen Now
              </Button>

              <Button
                variant={isLive ? 'solid' : 'outlineLight'}
                size="lg"
                onClick={playLiveMixlr}
                className={isLive ? '!bg-red-600 hover:!bg-red-500 !border-red-500 shadow-lg shadow-red-950/70' : ''}
              >
                <span className="live-dot" />
                {isLive ? 'Service Live: Tune In' : 'Tune to Mixlr Live'}
              </Button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => downloadSermonAudio(active)}
                  aria-label="Download featured sermon MP3"
                  title="Download MP3"
                  className="flex h-11 w-11 items-center justify-center border border-white/20 text-white/80 transition-colors hover:border-white hover:text-white"
                >
                  <Download size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => handleToggleBookmark(active.id)}
                  aria-label="Bookmark featured sermon"
                  title="Bookmark for later"
                  className={clsx(
                    'flex h-11 w-11 items-center justify-center border transition-colors',
                    bookmarkedIds.includes(active.id)
                      ? 'border-brand-400 bg-brand-600 text-white'
                      : 'border-white/20 text-white/80 hover:border-white hover:text-white'
                  )}
                >
                  {bookmarkedIds.includes(active.id) ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
                </button>
                <ShareButton sermon={active} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Sermon Catalogue & Filters */}
      <section className="pb-20 lg:pb-28">
        <Container>
          {/* Section Header & Search Bar */}
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Sermon library</Eyebrow>
              <h2 className="mt-3 font-display text-[2.2rem] uppercase leading-[0.95] text-ink-950 sm:text-4xl lg:text-5xl">
                Apostolic teaching
              </h2>
              <p className="mt-2 text-sm text-ink-950/60" aria-live="polite">
                Showing {filtered.length} of {SERMONS.length} messages
                {onlyBookmarked ? ` · (${bookmarkedIds.length} bookmarked)` : ''}
              </p>
            </div>

            {/* Instant Search Bar */}
            <div className="relative w-full md:max-w-sm">
              <span className="sr-only">Search sermons</span>
              <Search
                size={16}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-950/40"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title, scripture, or series…"
                className="w-full border border-ink-950/20 bg-white py-2.5 pl-10 pr-9 text-base text-ink-950 placeholder:text-ink-950/40 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/15 sm:text-sm"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-950/40 hover:text-ink-950"
                >
                  <X size={15} />
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Pills & Bookmarks Toggle */}
          <div className="-mx-5 mt-6 flex items-center gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="group" aria-label="Filter by category">
            {SERMON_CATEGORIES.map((cat) => {
              const count =
                cat === 'All'
                  ? SERMONS.length
                  : SERMONS.filter((s) => s.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setCategory(cat);
                    setOnlyBookmarked(false);
                  }}
                  aria-pressed={category === cat && !onlyBookmarked}
                  className={clsx(
                    'shrink-0 flex items-center gap-1.5 border px-3.5 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] transition-colors',
                    category === cat && !onlyBookmarked
                      ? 'border-ink-950 bg-ink-950 text-white'
                      : 'border-ink-950/20 text-ink-950 hover:border-ink-950'
                  )}
                >
                  <span>{cat}</span>
                  <span
                    className={clsx(
                      'text-[0.55rem]',
                      category === cat && !onlyBookmarked ? 'text-brand-300' : 'text-ink-950/50'
                    )}
                  >
                    ({count})
                  </span>
                </button>
              );
            })}

            {/* Bookmarks Filter Pill */}
            <button
              type="button"
              onClick={() => {
                setOnlyBookmarked(!onlyBookmarked);
                if (!onlyBookmarked) setCategory('All');
              }}
              aria-pressed={onlyBookmarked}
              className={clsx(
                'shrink-0 flex items-center gap-1.5 border px-3.5 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.16em] transition-colors',
                onlyBookmarked
                  ? 'border-brand-600 bg-brand-600 text-white shadow-sm'
                  : 'border-brand-600/40 text-brand-700 bg-brand-50/60 hover:border-brand-600'
              )}
            >
              <BookmarkCheck size={12} />
              <span>Saved Messages</span>
              <span className="text-[0.55rem]">({bookmarkedIds.length})</span>
            </button>
          </div>

          {/* Advanced Dropdown Controls: Series & Preacher Filter */}
          <div className="mt-4 flex flex-wrap items-center gap-3 border-y border-ink-950/10 py-3 text-xs">
            <div className="flex items-center gap-1.5 text-ink-950/60 text-[0.68rem] font-bold uppercase tracking-wider">
              <SlidersHorizontal size={13} />
              <span>Filters:</span>
            </div>

            {/* Series Dropdown */}
            <label className="flex items-center gap-2">
              <span className="sr-only">Filter by Series</span>
              <select
                value={series}
                onChange={(e) => setSeries(e.target.value)}
                aria-label="Filter sermons by series"
                className="border border-ink-950/20 bg-white px-3 py-1.5 text-xs text-ink-950 focus:border-brand-600 focus:outline-none"
              >
                <option value="All">All Teaching Series</option>
                {SERMON_SERIES.filter((s) => s !== 'All').map((ser) => (
                  <option key={ser} value={ser}>
                    Series: {ser}
                  </option>
                ))}
              </select>
            </label>

            {/* Minister Dropdown */}
            <label className="flex items-center gap-2">
              <span className="sr-only">Filter by Preacher</span>
              <select
                value={minister}
                onChange={(e) => setMinister(e.target.value)}
                aria-label="Filter sermons by preacher"
                className="border border-ink-950/20 bg-white px-3 py-1.5 text-xs text-ink-950 focus:border-brand-600 focus:outline-none"
              >
                <option value="All">All Preachers</option>
                {SERMON_MINISTERS.filter((m) => m !== 'All').map((min) => (
                  <option key={min} value={min}>
                    {min}
                  </option>
                ))}
              </select>
            </label>

            {/* Reset Filters Shortcut */}
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearAllFilters}
                className="ml-auto text-[0.66rem] font-bold uppercase tracking-wider text-brand-700 hover:text-brand-900 underline underline-offset-2"
              >
                Reset All Filters
              </button>
            )}
          </div>

          {/* Sermon Listing */}
          {filtered.length === 0 ? (
            <div className="mt-12 border border-dashed border-ink-950/20 p-10 text-center">
              <p className="font-display text-xl uppercase text-ink-950">No messages match your criteria</p>
              <p className="mt-2 text-sm text-ink-950/60">
                {onlyBookmarked
                  ? 'You have not saved any messages to your library yet. Click the bookmark icon on any sermon to keep it handy.'
                  : `No messages match "${query || series || category}". Try adjusting your filters.`}
              </p>
              <Button variant="outlineDark" size="sm" onClick={clearAllFilters} className="mt-5">
                Clear all filters
              </Button>
            </div>
          ) : (
            <ul className="mt-8 border-b border-ink-950/10">
              {filtered.map((sermon) => {
                const isPlayingThis = activePlayingId === sermon.id;
                const savedPos = resumePositions[sermon.id];

                return (
                  <li
                    key={sermon.id}
                    id={sermon.id}
                    className={clsx(
                      'grid scroll-mt-24 gap-4 border-t py-6 transition-all md:grid-cols-[1fr_auto] md:items-center md:gap-8',
                      isPlayingThis
                        ? 'border-t-2 border-brand-600 bg-brand-50/20 px-3 -mx-3'
                        : active.id === sermon.id
                        ? 'border-t-2 border-brand-600/70'
                        : 'border-ink-950/10'
                    )}
                  >
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-[0.62rem] font-bold uppercase tracking-[0.22em] text-brand-600">
                          {sermon.category} · {sermon.occasion}
                        </p>
                        {isPlayingThis && (
                          <span className="inline-flex items-center gap-1 rounded bg-brand-600 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider text-white">
                            <span className="live-dot !bg-white" />
                            Playing
                          </span>
                        )}
                        {savedPos && !isPlayingThis && (
                          <span className="inline-flex items-center gap-1 rounded border border-brand-500/40 bg-brand-50 px-2 py-0.5 text-[0.55rem] font-bold uppercase tracking-wider text-brand-700">
                            <Clock size={10} />
                            Progress: {formatAudioTime(savedPos)}
                          </span>
                        )}
                      </div>

                      <h3 className="mt-2 font-display text-xl uppercase leading-tight text-ink-950 sm:text-2xl">
                        {sermon.title}
                      </h3>

                      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-ink-950/65">
                        {sermon.description}
                      </p>

                      <p className="mt-2 text-xs text-ink-950/50">
                        <strong>{sermon.minister}</strong> · {sermon.scripture} · Series: <em>{sermon.series}</em> · {sermon.duration}
                      </p>
                    </div>

                    {/* Action Buttons: Play, Resume, Download, Bookmark, Share */}
                    <div className="flex flex-wrap items-center gap-2">
                      {savedPos ? (
                        <Button
                          variant="solid"
                          size="sm"
                          onClick={() => play(sermon, { resumeTime: savedPos })}
                          aria-label={`Resume ${sermon.title} from ${formatAudioTime(savedPos)}`}
                          title={`Resume from ${formatAudioTime(savedPos)}`}
                        >
                          <RotateCcw size={12} />
                          Resume ({formatAudioTime(savedPos)})
                        </Button>
                      ) : null}

                      <Button
                        variant={savedPos ? 'outlineDark' : 'outlineDark'}
                        size="sm"
                        onClick={() => play(sermon)}
                        aria-label={`Play ${sermon.title}`}
                      >
                        <Play size={12} />
                        {isPlayingThis ? 'Active' : 'Play'}
                      </Button>

                      <DownloadButton sermon={sermon} />
                      <BookmarkButton
                        sermonId={sermon.id}
                        bookmarkedIds={bookmarkedIds}
                        onToggle={handleToggleBookmark}
                      />
                      <ShareButton sermon={sermon} />
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Container>
      </section>
    </>
  );
}

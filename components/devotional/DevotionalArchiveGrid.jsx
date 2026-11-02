'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, BookOpen, ArrowRight, Download } from 'lucide-react';
import { getAllDevotionals, DEVOTIONAL_PDF_URL, DEVOTIONAL_THEME } from '../../lib/devotional';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import Card from '../ui/Card';

export default function DevotionalArchiveGrid() {
  const allDays = getAllDevotionals();
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allDays;
    return allDays.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.anchorScripture.toLowerCase().includes(q) ||
        item.dayFormatted.toLowerCase().includes(q) ||
        item.prayer.toLowerCase().includes(q) ||
        item.body.some((p) => p.toLowerCase().includes(q))
    );
  }, [allDays, query]);

  return (
    <section id="archive" className="border-t border-ink-950/10 bg-sand-50 py-20 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow={`31-Day Blueprint · ${DEVOTIONAL_THEME}`}
          title="Complete Devotional Archive"
          aside="Search by topic, scripture reference, or apostolic decree across all 31 days of divine blueprint teachings."
        />

        {/* Search & Download Bar */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-lg">
            <Search
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-950/45"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search topic, scripture (e.g. Isaiah 66, Gideon, Daniel)..."
              className="w-full border border-ink-950/15 bg-white py-3.5 pl-11 pr-4 text-sm text-ink-950 placeholder:text-ink-950/45 focus:border-brand-600 focus:outline-none"
            />
          </div>

          <a
            href={DEVOTIONAL_PDF_URL}
            download="CPC_Daily_Devotional_31Days.pdf"
            className="inline-flex items-center justify-center gap-2 border border-brand-600 bg-brand-600 px-6 py-3.5 text-[0.72rem] font-bold uppercase tracking-[0.18em] text-white transition-colors hover:bg-brand-700"
          >
            <Download size={15} />
            Download All 31 Cards (PDF)
          </a>
        </div>

        {/* 31-Day Cards Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <Card
              key={item.day}
              className="group flex flex-col justify-between p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-600/40 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block bg-brand-50 px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-brand-700">
                    {item.dayFormatted}
                  </span>
                  <span className="text-[0.68rem] font-medium text-ink-950/55">
                    {item.date.replace(', 2026', '')}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl uppercase leading-[1.02] text-ink-950 group-hover:text-brand-600">
                  <Link href={`/devotional/${item.slug}`}>{item.title}</Link>
                </h3>

                <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-[#9a7b1c]">
                  <BookOpen size={13} />
                  <span>{item.anchorScripture}</span>
                </div>

                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-ink-950/70">
                  {item.body[0]}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-ink-950/10 pt-4">
                <Link
                  href={`/devotional/${item.slug}`}
                  className="inline-flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-brand-600 group-hover:text-brand-700"
                >
                  Read &amp; Share Decree
                  <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                </Link>

                <a
                  href={item.cardImage}
                  download={`CPC_${item.dayFormatted.replace(' ', '_')}.png`}
                  className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-ink-950/55 hover:text-ink-950"
                  title="Download Daily Graphic Card"
                >
                  Card PNG
                </a>
              </div>
            </Card>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="border border-ink-950/10 bg-white p-12 text-center">
            <p className="font-display text-2xl uppercase text-ink-950">No devotional matched your search</p>
            <p className="mt-2 text-sm text-ink-950/65">
              Try searching for another keyword or scripture reference.
            </p>
            <button
              type="button"
              onClick={() => setQuery('')}
              className="mt-5 border border-brand-600 bg-brand-600 px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-white"
            >
              Show All 31 Days
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}


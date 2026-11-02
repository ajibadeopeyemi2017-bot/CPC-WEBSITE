'use client';

import { useState, useEffect } from 'react';
import { Sparkles, Quote, ArrowRight, Flame } from 'lucide-react';
import clsx from 'clsx';
import Container from '../ui/Container';
import Eyebrow from '../ui/Eyebrow';
import Button from '../ui/Button';
import { toast } from '../ui/Toast';

const INITIAL_TESTIMONIES = [
  {
    id: 't-101',
    name: 'Sister Blessing A.',
    category: 'Fruit of the Womb & Safe Delivery',
    title: 'Blessed with Healthy Twin Boys after 4 Years of Waiting!',
    details:
      'After four years of medical delays, Apostle prayed with my husband and me at the School of Prayer altar and declared: “Before this season ends, your shame turns to double glory!” Glory to Jesus, the Lord blessed us with healthy twin boys!',
    praises: 76,
  },
  {
    id: 't-102',
    name: 'Brother Tolu O.',
    category: 'Academic & Job Breakthrough',
    title: 'Unexpected Job Appointment at Multi-National Firm',
    details:
      'I was unemployed for 11 months. During the Revelational Hour service on Thursday, Apostle taught on Divine Help from Hebrews 4:16. That same Friday afternoon, I received a call offering me a senior managerial position with full relocation benefits!',
    praises: 61,
  },
  {
    id: 't-103',
    name: 'Deaconess Folake M.',
    category: 'Healing & Divine Deliverance',
    title: 'Total Deliverance from Chronic 6-Year Migraine',
    details:
      'I suffered from debilitating migraines for over 6 years that defied medication. During Tuesday School of Prayer, as hands were laid and the fire of God fell, the pain vanished instantly. Follow-up hospital scan confirmed complete normalcy. Praise the Lord!',
    praises: 92,
  },
];

export default function TestimoniesSection() {
  const [testimonies, setTestimonies] = useState(INITIAL_TESTIMONIES);
  const [praised, setPraised] = useState({});

  useEffect(() => {
    fetch('/api/testimonies')
      .then((res) => res.json())
      .then((res) => {
        if (res.success && Array.isArray(res.testimonies) && res.testimonies.length > 0) {
          setTestimonies(res.testimonies.slice(0, 3));
        }
      })
      .catch(() => {});
  }, []);

  const handlePraise = (id) => {
    if (praised[id]) return;
    setPraised((prev) => ({ ...prev, [id]: true }));
    setTestimonies((prev) =>
      prev.map((item) => (item.id === id ? { ...item, praises: (item.praises || 0) + 1 } : item))
    );
    toast.success('Hallelujah! You have joined in thanking God for this miracle.', 'Praise Offered');
    fetch('/api/testimonies', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'praise', id }),
    }).catch(() => {});
  };

  return (
    <section id="testimonies" className="scroll-mt-20 border-t border-ink-950/10 bg-white py-20 lg:py-28">
      <Container>
        <div className="flex flex-col justify-between gap-6 border-b border-ink-950/10 pb-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <Eyebrow tone="brand">The Acts of the Potter · Revelation 12:11</Eyebrow>
            <h2 className="mt-4 font-display text-[2.4rem] uppercase leading-[0.95] text-ink-950 sm:text-5xl lg:text-[3.6rem]">
              Voices of <span className="text-brand-600">Thanksgiving.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-950/70">
              Jesus Christ is the same yesterday, today, and forever. Read verified praise reports of healing,
              supernatural turnaround, and answered prayers from the altar of Christ The Potter Church.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="solid" href="/salvation#testimony">
              <Flame size={14} className="text-amber-300" />
              Share Your Testimony
            </Button>
            <Button variant="outlineDark" href="/salvation#testimony">
              Overcomers&apos; Wall
              <ArrowRight size={14} />
            </Button>
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonies.map((item) => (
            <article
              key={item.id}
              className="flex flex-col justify-between border border-ink-950/15 bg-paper/50 p-7 transition-all hover:border-brand-600 hover:bg-white hover:shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-block border border-brand-600/25 bg-brand-50 px-3 py-1 text-[0.62rem] font-bold uppercase tracking-[0.18em] text-brand-700">
                    {item.category}
                  </span>
                  <Quote size={20} className="text-brand-600/30" />
                </div>

                <h3 className="mt-5 font-display text-2xl uppercase leading-tight text-ink-950">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-relaxed text-ink-950/75">
                  “{item.details || item.testimony}”
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between gap-3 border-t border-ink-950/10 pt-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-ink-950">{item.name}</p>
                  <p className="text-[0.68rem] text-ink-950/55">{item.praises || 0} brethren praising God</p>
                </div>

                <button
                  type="button"
                  onClick={() => handlePraise(item.id)}
                  aria-pressed={Boolean(praised[item.id])}
                  className={clsx(
                    'inline-flex items-center gap-1.5 border px-3.5 py-2 text-[0.62rem] font-bold uppercase tracking-[0.18em] transition-all',
                    praised[item.id]
                      ? 'border-brand-600 bg-brand-600 text-white shadow-sm'
                      : 'border-ink-950/20 bg-white text-ink-950 hover:border-brand-600 hover:bg-brand-50 hover:text-brand-800'
                  )}
                >
                  <Sparkles size={12} className={praised[item.id] ? 'text-amber-300' : 'text-brand-600'} />
                  {praised[item.id] ? 'Hallelujah!' : 'Glory to God!'}
                </button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}


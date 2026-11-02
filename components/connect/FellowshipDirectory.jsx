'use client';

import { useState, useMemo } from 'react';
import { Search, MapPin, Clock, Users, Phone } from 'lucide-react';
import { FELLOWSHIP_CENTERS } from '../../lib/fellowships';
import { CHURCH } from '../../lib/site-config';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import Card from '../ui/Card';

function WhatsAppIcon({ size = 14 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.002 3.2C8.932 3.2 3.2 8.929 3.2 15.995c0 2.256.59 4.458 1.71 6.4L3.09 28.8l6.564-1.721a12.798 12.798 0 0 0 6.348 1.696h.005c7.069 0 12.801-5.73 12.801-12.796 0-3.42-1.331-6.635-3.748-9.053A12.716 12.716 0 0 0 16.002 3.2Zm0 23.418h-.004a10.63 10.63 0 0 1-5.419-1.484l-.389-.23-4.03 1.057 1.076-3.928-.253-.403a10.597 10.597 0 0 1-1.628-5.635c0-5.869 4.777-10.644 10.651-10.644 2.844 0 5.518 1.108 7.529 3.12a10.576 10.576 0 0 1 3.118 7.526c0 5.87-4.778 10.621-10.651 10.621Zm5.842-7.973c-.32-.16-1.894-.934-2.187-1.041-.293-.107-.507-.16-.72.16-.214.32-.827 1.041-1.014 1.254-.187.214-.373.24-.693.08-.32-.16-1.351-.498-2.574-1.588-.951-.848-1.594-1.896-1.78-2.216-.187-.32-.02-.493.14-.653.144-.143.32-.373.48-.56.16-.187.213-.32.32-.533.107-.214.053-.4-.027-.56-.08-.16-.72-1.734-.987-2.375-.26-.624-.524-.539-.72-.549-.186-.009-.4-.011-.613-.011-.214 0-.56.08-.854.4-.293.32-1.12 1.094-1.12 2.668 0 1.574 1.147 3.095 1.307 3.309.16.213 2.257 3.446 5.468 4.832.764.33 1.36.527 1.825.674.767.244 1.465.209 2.017.127.615-.092 1.894-.774 2.161-1.521.267-.747.267-1.387.187-1.521-.08-.133-.294-.213-.614-.373Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function FellowshipDirectory() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FELLOWSHIP_CENTERS;
    return FELLOWSHIP_CENTERS.filter(
      (f) =>
        f.name.toLowerCase().includes(q) ||
        f.zone.toLowerCase().includes(q) ||
        f.focus.toLowerCase().includes(q) ||
        f.areasCovered.some((a) => a.toLowerCase().includes(q))
    );
  }, [query]);

  const getJoinWhatsAppHref = (center) => {
    const msg = `Hello Christ The Potter Church! I would love to connect with the *${center.name}* (${center.zone}). Please share the meeting details with me.`;
    return `https://wa.me/${CHURCH.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <section id="fellowships" className="scroll-mt-20 border-t border-ink-950/10 bg-sand-50 py-20 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow="Potter's Family Units · Ile-Ife & Diaspora"
          title="Find a Fellowship Near You"
          aside="Nobody walks alone at Christ The Potter Church. Search for your street, campus gate, or neighbourhood in Ile-Ife to connect with a warm family unit for prayer, care, and spiritual growth."
        />

        {/* Search Input */}
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="relative flex-1 max-w-lg">
            <Search
              size={17}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-950/45"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your area (e.g. Mayfair, OAU, Fajuyi, Lagere, Eleyele, Iloro)..."
              className="w-full border border-ink-950/15 bg-white py-3.5 pl-11 pr-4 text-sm text-ink-950 placeholder:text-ink-950/45 focus:border-brand-600 focus:outline-none"
            />
          </div>

          <a
            href={CHURCH.phoneHref}
            className="inline-flex items-center gap-2 border border-ink-950/15 bg-white px-5 py-3.5 text-[0.7rem] font-bold uppercase tracking-[0.18em] text-ink-950 hover:border-brand-600"
          >
            <Phone size={14} className="text-brand-600" />
            Fellowship Desk: {CHURCH.phone}
          </a>
        </div>

        {/* Fellowship Cards Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((center) => (
            <Card
              key={center.id}
              className="flex flex-col justify-between p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-600/40 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-block bg-brand-50 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-brand-700">
                    {center.zone}
                  </span>
                  <span className="flex items-center gap-1 text-[0.65rem] font-semibold text-ink-950/60">
                    <Clock size={11} className="text-brand-600" />
                    {center.meetingTime}
                  </span>
                </div>

                <h3 className="mt-4 font-display text-2xl uppercase leading-tight text-ink-950">
                  {center.name}
                </h3>

                <p className="mt-2 text-xs font-semibold text-[#9a7b1c]">
                  Focus: {center.focus}
                </p>

                {/* Areas Covered Pills */}
                <div className="mt-4">
                  <span className="text-[0.6rem] font-bold uppercase tracking-widest text-ink-950/50">
                    Neighbourhoods Covered:
                  </span>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {center.areasCovered.map((area) => (
                      <span
                        key={area}
                        className="border border-ink-950/10 bg-sand-50 px-2 py-0.5 text-[0.65rem] font-semibold text-ink-950/80"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-2 text-xs text-ink-950/70">
                  <MapPin size={13} className="mt-0.5 shrink-0 text-brand-600" />
                  <span>{center.venue}</span>
                </div>

                <div className="mt-1.5 flex items-start gap-2 text-xs text-ink-950/70">
                  <Users size={13} className="mt-0.5 shrink-0 text-brand-600" />
                  <span>Coordinator: {center.coordinator}</span>
                </div>
              </div>

              <div className="mt-6 border-t border-ink-950/10 pt-4">
                <a
                  href={getJoinWhatsAppHref(center)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 bg-[#25D366] px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white transition-transform hover:scale-[1.01]"
                >
                  <WhatsAppIcon size={14} />
                  Connect With This Zone
                </a>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}


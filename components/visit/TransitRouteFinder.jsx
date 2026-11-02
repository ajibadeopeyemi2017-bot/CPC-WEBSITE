'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { Navigation, Clock, Bus, MapPin, Phone, Info } from 'lucide-react';
import { ILE_IFE_TRANSIT_ROUTES } from '../../lib/fellowships';
import { CHURCH } from '../../lib/site-config';

function WhatsAppIcon({ size = 15 }) {
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

export default function TransitRouteFinder() {
  const [selectedId, setSelectedId] = useState(ILE_IFE_TRANSIT_ROUTES[0].id);
  const current =
    ILE_IFE_TRANSIT_ROUTES.find((r) => r.id === selectedId) || ILE_IFE_TRANSIT_ROUTES[0];

  const getWhatsAppDirectionHref = () => {
    const msg = `Hello Christ The Potter Church Protocol Desk! I am coming to church from *${current.origin}* and would appreciate live landmark or transit guidance to 76B PHCN Office, Fajuyi Road.`;
    return `https://wa.me/${CHURCH.whatsapp}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <div id="transit" className="mt-14 scroll-mt-24 border border-ink-950/15 bg-white p-6 shadow-sm sm:p-10">
      <div className="flex flex-col justify-between gap-4 border-b border-ink-950/10 pb-6 md:flex-row md:items-end">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-brand-600">
            <Navigation size={13} />
            Ile-Ife Campus &amp; City Transit Guide
          </span>
          <h3 className="mt-2 font-display text-3xl uppercase leading-none text-ink-950 sm:text-4xl">
            How to Get Here From Your Area
          </h3>
        </div>
        <p className="max-w-md text-xs leading-relaxed text-ink-950/65">
          Select your starting location in Ile-Ife below for step-by-step bus, cab, or driving landmarks to our auditorium at <strong>76B, PHCN Office (Upper Floor), Off Fajuyi Road</strong>.
        </p>
      </div>

      <div className="mt-7 grid gap-8 lg:grid-cols-[0.95fr_1.35fr]">
        {/* Left: Area Selector Buttons */}
        <div className="space-y-2">
          <p className="mb-2.5 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-ink-950/55">
            1. Select Your Starting Axis:
          </p>
          {ILE_IFE_TRANSIT_ROUTES.map((route) => {
            const active = route.id === current.id;
            return (
              <button
                key={route.id}
                type="button"
                onClick={() => setSelectedId(route.id)}
                className={clsx(
                  'flex w-full items-center justify-between border px-4 py-3.5 text-left transition-all',
                  active
                    ? 'border-brand-600 bg-brand-600 text-white shadow-sm'
                    : 'border-ink-950/10 bg-sand-50 text-ink-950 hover:border-brand-600/40 hover:bg-white'
                )}
              >
                <span className="text-xs font-bold uppercase tracking-wider">{route.origin}</span>
                <span
                  className={clsx(
                    'shrink-0 text-[0.65rem] font-semibold',
                    active ? 'text-brand-100' : 'text-ink-950/55'
                  )}
                >
                  {route.travelTime}
                </span>
              </button>
            );
          })}
        </div>

        {/* Right: Step-by-Step Landmark Instructions */}
        <div className="flex flex-col justify-between border border-ink-950/10 bg-sand-50/70 p-6 sm:p-8">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink-950/10 pb-4">
              <div>
                <span className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-brand-600">
                  Selected Route
                </span>
                <h4 className="font-display text-2xl uppercase text-ink-950">
                  From {current.origin}
                </h4>
              </div>

              <span className="inline-flex items-center gap-1.5 bg-brand-600 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-white">
                <Clock size={12} />
                {current.travelTime}
              </span>
            </div>

            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="border border-ink-950/10 bg-white p-3.5">
                <span className="flex items-center gap-1.5 text-[0.6rem] font-bold uppercase tracking-wider text-ink-950/55">
                  <Bus size={12} className="text-brand-600" />
                  Transport Mode
                </span>
                <p className="mt-1 text-xs font-bold text-ink-950">{current.transportMode}</p>
              </div>

              <div className="border border-ink-950/10 bg-white p-3.5">
                <span className="flex items-center gap-1.5 text-[0.6rem] font-bold uppercase tracking-wider text-ink-950/55">
                  <MapPin size={12} className="text-brand-600" />
                  Tell Driver / Drop-Off Stop
                </span>
                <p className="mt-1 text-xs font-bold text-ink-950">{current.dropOffStop}</p>
              </div>
            </div>

            {/* Numbered Steps */}
            <ol className="mt-6 space-y-3">
              {current.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3.5">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center bg-ink-950 text-[0.68rem] font-bold text-white">
                    {i + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-ink-950/85">{step}</p>
                </li>
              ))}
            </ol>

            {/* Helpful Tip */}
            <div className="mt-6 flex items-start gap-2.5 border-l-4 border-[#d4af37] bg-[#fbf8ef] p-3.5 text-xs text-ink-950/80">
              <Info size={15} className="mt-0.5 shrink-0 text-[#9a7b1c]" />
              <span>{current.tip}</span>
            </div>
          </div>

          {/* Protocol Helpline Actions */}
          <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-ink-950/10 pt-5">
            <a
              href={getWhatsAppDirectionHref()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white transition-transform hover:scale-[1.02]"
            >
              <WhatsAppIcon size={14} />
              Request Protocol Guidance on WhatsApp
            </a>

            <a
              href={CHURCH.phoneHref}
              className="inline-flex items-center gap-1.5 border border-ink-950/20 bg-white px-4 py-2.5 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-ink-950 hover:border-ink-950"
            >
              <Phone size={13} className="text-brand-600" />
              Call Protocol: {CHURCH.phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


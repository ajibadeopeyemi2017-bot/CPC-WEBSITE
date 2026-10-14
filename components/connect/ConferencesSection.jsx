'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Phone, ClipboardList, Calendar } from 'lucide-react';
import { CONFERENCES, PAST_CONFERENCES } from '../../lib/conferences';
import { CHURCH } from '../../lib/site-config';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import Card from '../ui/Card';
import Button from '../ui/Button';
import AddToCalendarButton from '../ui/AddToCalendarButton';
import ConferenceRegistrationModal from './ConferenceRegistrationModal';

export default function ConferencesSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedConfId, setSelectedConfId] = useState(null);

  const openRegistration = (confId) => {
    setSelectedConfId(confId);
    setModalOpen(true);
  };

  return (
    <>
      <section id="conferences" className="scroll-mt-20 py-20 lg:py-28">
        <Container>
          <SectionHeader
            eyebrow="National apostolic summits"
            title="Conferences & schools"
            aside="Ordained annual conferences convened by Apostle Oluwafunminiyi Olufisayo and OSOM Ministries to equip believers and ministers across Nigeria. Register online below — form submissions are delivered directly to all church WhatsApp lines."
          />

          <div className="space-y-5">
            {CONFERENCES.map((conf) => (
              <Card key={conf.id} id={conf.id} className="grid scroll-mt-24 md:grid-cols-[0.8fr_1.2fr]">
                <div className="relative aspect-[4/3] bg-ink-950 md:aspect-auto md:min-h-[320px]">
                  <Image
                    src={conf.image}
                    alt={`${conf.title} flyer`}
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-col p-6 sm:p-8 lg:p-10">
                  <p className="text-[0.64rem] font-bold uppercase tracking-[0.25em] text-brand-600">
                    {conf.badge} · {conf.date}
                  </p>
                  <h3 className="mt-3 font-display text-3xl uppercase leading-none text-ink-950 sm:text-4xl">
                    {conf.title}
                  </h3>
                  <p className="mt-3 font-semibold text-ink-950/85">{conf.theme}</p>
                  <p className="mt-3 text-sm leading-relaxed text-ink-950/70">{conf.details}</p>
                  <dl className="mt-6 grid gap-4 border-t border-ink-950/10 pt-5 text-sm sm:grid-cols-2">
                    <div>
                      <dt className="text-[0.62rem] font-bold uppercase tracking-[0.25em] text-ink-950/50">Time</dt>
                      <dd className="mt-1 text-ink-950">{conf.time}</dd>
                    </div>
                    <div>
                      <dt className="text-[0.62rem] font-bold uppercase tracking-[0.25em] text-ink-950/50">Venue</dt>
                      <dd className="mt-1 text-ink-950">{conf.venue}</dd>
                    </div>
                  </dl>
                  <div className="mt-auto flex flex-wrap items-center gap-3 pt-6">
                    <Button
                      variant="solid"
                      onClick={() => openRegistration(conf.id)}
                      className="w-full sm:w-auto"
                    >
                      <ClipboardList size={15} />
                      Register via Form
                    </Button>
                    <AddToCalendarButton
                      customEvent={{
                        id: `cpc-conf-${conf.id}`,
                        title: `${conf.title} (${conf.short})`,
                        description: `Theme: ${conf.theme}\nDate: ${conf.date}\nTime: ${conf.time}\nVenue: ${conf.venue}\nDetails: ${conf.details}`,
                        location: conf.venue,
                        date: conf.date,
                        time: conf.time,
                      }}
                      variant="outlineDark"
                      label="Add to Calendar"
                      className="w-full sm:w-auto"
                    />
                    <a
                      href={CHURCH.phoneHref}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-800 hover:text-brand-950 underline sm:ml-2"
                      title="Direct telephone desk"
                    >
                      <Phone size={13} />
                      Call line: {CHURCH.phone}
                    </a>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="mt-20">
            <SectionHeader eyebrow="Apostolic legacy" title="From the archive" />
            <div className="grid gap-5 sm:grid-cols-3">
              {PAST_CONFERENCES.map((item) => (
                <Card key={item.name}>
                  <div className="relative aspect-square bg-ink-950">
                    <Image
                      src={item.image}
                      alt={`${item.name} flyer`}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-contain"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-[0.62rem] font-bold uppercase tracking-[0.25em] text-brand-600">{item.year}</p>
                    <h3 className="mt-2 font-display text-xl uppercase leading-tight text-ink-950">{item.name}</h3>
                    <p className="mt-1 text-sm text-ink-950/65">{item.theme}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Interactive Modal */}
      <ConferenceRegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialConferenceId={selectedConfId}
      />
    </>
  );
}

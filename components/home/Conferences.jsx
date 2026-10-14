'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ClipboardList, ArrowRight } from 'lucide-react';
import { CONFERENCES } from '../../lib/conferences';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import Card from '../ui/Card';
import TextLink from '../ui/TextLink';
import Button from '../ui/Button';
import AddToCalendarButton from '../ui/AddToCalendarButton';
import ConferenceRegistrationModal from '../connect/ConferenceRegistrationModal';

export default function Conferences() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedConfId, setSelectedConfId] = useState(null);

  const handleRegister = (confId) => {
    setSelectedConfId(confId);
    setModalOpen(true);
  };

  return (
    <>
      <section className="pb-20 lg:pb-28">
        <Container>
          <SectionHeader
            eyebrow="Signature gatherings"
            title="Conferences & schools"
            aside="Ordained seasons convened by Apostle Oluwafunminiyi Olufisayo to impart grace, stir callings, and raise kingdom leaders."
          />

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {CONFERENCES.map((conf) => (
              <Card key={conf.id} className="flex flex-col">
                <div className="relative aspect-[4/3] bg-ink-950">
                  <Image
                    src={conf.image}
                    alt={`${conf.title} flyer`}
                    fill
                    sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
                    className="object-contain"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[0.64rem] font-bold uppercase tracking-[0.25em] text-brand-600">{conf.date}</p>
                  <h3 className="mt-3 font-display text-[1.6rem] uppercase leading-none text-ink-950">{conf.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-ink-950/85">{conf.theme}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-950/65">{conf.summary}</p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-ink-950/10">
                    <Button
                      variant="solid"
                      size="sm"
                      onClick={() => handleRegister(conf.id)}
                    >
                      <ClipboardList size={13} />
                      Register (Form)
                    </Button>
                    <div className="flex items-center gap-3">
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
                        size="sm"
                        label="Reminder"
                      />
                      <TextLink href={`/connect#${conf.id}`}>Details</TextLink>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <ConferenceRegistrationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialConferenceId={selectedConfId}
      />
    </>
  );
}

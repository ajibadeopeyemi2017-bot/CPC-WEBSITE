import Image from 'next/image';
import { CONFERENCES } from '../../lib/conferences';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import Card from '../ui/Card';
import TextLink from '../ui/TextLink';

export default function Conferences() {
  return (
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
                <div className="mt-6">
                  <TextLink href={`/connect#${conf.id}`}>Details &amp; registration</TextLink>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

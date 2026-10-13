import Image from 'next/image';
import { Phone, ArrowDown } from 'lucide-react';
import { CHURCH } from '../../lib/site-config';
import { CONFERENCES, PAST_CONFERENCES, MINISTRIES } from '../../lib/conferences';
import PageHeader from '../../components/ui/PageHeader';
import Container from '../../components/ui/Container';
import SectionHeader from '../../components/ui/SectionHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import AddToCalendarButton from '../../components/ui/AddToCalendarButton';
import VolunteerForm from '../../components/connect/VolunteerForm';

export const metadata = {
  title: 'Connect & Conferences | Christ The Potter Church',
  description: 'Conferences, schools, ministries and serving teams at Christ The Potter Church, Ile-Ife — KYMC, AGOTE, RDS, ROS and AMITES.',
};

export default function ConnectPage() {
  return (
    <>
      <PageHeader
        eyebrow="Connect · Serve · Grow"
        title="Find your place"
        highlight="in the family of God."
        intro="You aren't meant to walk this journey alone. Attend our convocations, join a ministry team, and release your God-given grace."
      >
        <Button variant="solid" size="lg" href="#conferences">
          Conferences
          <ArrowDown size={14} />
        </Button>
        <Button variant="outlineLight" size="lg" href="#serve">
          Join a team
        </Button>
      </PageHeader>

      <section id="conferences" className="scroll-mt-20 py-20 lg:py-28">
        <Container>
          <SectionHeader
            eyebrow="National apostolic summits"
            title="Conferences & schools"
            aside="Ordained annual convocations convened by Apostle Oluwafunminiyi Olufisayo and OSOM Ministries to equip believers and ministers across Nigeria."
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
                  <h3 className="mt-3 font-display text-3xl uppercase leading-none text-ink-950 sm:text-4xl">{conf.title}</h3>
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
                  <div className="mt-auto flex flex-wrap gap-3 pt-6">
                    <Button variant="solid" href={CHURCH.phoneHref} className="w-full sm:w-auto">
                      <Phone size={14} />
                      Register · {CHURCH.phone}
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
                    <Image src={item.image} alt={`${item.name} flyer`} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-contain" />
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

      <section className="bg-ink-950 py-28 text-white [clip-path:polygon(0_48px,100%_0,100%_calc(100%_-_48px),0_100%)] lg:py-36">
        <Container>
          <SectionHeader
            tone="light"
            eyebrow="Serve & connect"
            title="Departments & family units"
            aside="Discover where you can plug in your gifts and be a blessing to the body of Christ."
          />
          <div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {MINISTRIES.map((m) => (
              <div key={m.title} className="flex flex-col border-t border-white/15 py-7">
                <h3 className="font-display text-2xl uppercase leading-none">{m.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">{m.desc}</p>
                <p className="mt-4 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-brand-300">
                  {m.leader} · {m.meeting}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="serve" className="scroll-mt-20 py-20 lg:py-28">
        <Container narrow>
          <SectionHeader
            eyebrow="Join a ministry team"
            title="Volunteer your talents"
            aside="“Come labour on!” Fill in the form and our leadership team will connect with you."
          />
          <Card className="p-6 sm:p-10">
            <VolunteerForm />
          </Card>
        </Container>
      </section>
    </>
  );
}

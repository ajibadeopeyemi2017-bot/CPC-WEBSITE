import { Car, Smile, Users, Sparkles, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { CHURCH, SERVICE_SCHEDULE } from '../../lib/site-config';
import PageHeader from '../../components/ui/PageHeader';
import Container from '../../components/ui/Container';
import SectionHeader from '../../components/ui/SectionHeader';
import Eyebrow from '../../components/ui/Eyebrow';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Accordion from '../../components/ui/Accordion';
import VisitForm from '../../components/visit/VisitForm';
import MapCard from '../../components/ui/MapCard';
import AddToCalendarButton from '../../components/ui/AddToCalendarButton';

export const metadata = {
  title: "I'm Visiting — Plan a Visit | Christ The Potter Church",
  description: 'Plan your first visit to Christ The Potter Church in Ile-Ife: service times, directions, parking, kids church, and what to expect.',
};

const steps = [
  { title: 'Arrival & welcome', body: 'Arrive 10 – 15 minutes before 8:00 AM. Ushers welcome you at the gate and guide you inside.' },
  { title: 'Praise & worship', body: 'Heartfelt, Spirit-filled adoration leading into intimate communion with God.' },
  { title: 'The Word', body: 'Apostolic teaching from Apostle Oluwafunminiyi, designed for real spiritual transformation.' },
  { title: 'Guest reception', body: 'A relaxed 5-minute welcome after service, with refreshments and a gift for first-timers.' },
];

const expectations = [
  { icon: Car, title: 'Secure parking', body: 'Park within the PHCN office premises — marshals will direct you to a spot.' },
  { icon: Smile, title: 'A personal host', body: "Plan ahead and someone will greet you by name and walk you to your seat." },
  { icon: Users, title: "Potter's Kids Church", body: 'Bible lessons, worship, crafts and snacks for children, with vetted adult supervision.' },
  { icon: Sparkles, title: 'His presence', body: "From the opening prayer to the benediction, expect God's presence in song and word." },
];

const faqs = [
  {
    q: 'Where exactly is the church?',
    a: `We're at ${CHURCH.address.full}. Look out for the Christ The Potter Church banner at the gate. If you need help finding us, call the protocol desk on ${CHURCH.phone}.`,
  },
  {
    q: 'What time should I arrive?',
    a: 'Sunday service begins promptly at 8:00 AM. First-time guests should arrive 10 – 15 minutes early so our hospitality team can welcome you and help with children check-in.',
  },
  {
    q: 'What should I wear?',
    a: "Come as you are. You'll see traditional attire, smart-casual and formal suits — we value the posture of your heart above your clothing.",
  },
  {
    q: 'What happens with my kids during service?',
    a: "Potter's Kids Church runs alongside the main service with Bible lessons, worship, arts and crafts, and refreshments, under loving and vetted supervision.",
  },
  {
    q: 'Will I be singled out as a first-timer?',
    a: "Never. We won't make you stand up alone or put you on the spot. After service, first-timers are invited to a relaxed reception with our pastors.",
  },
];

export default function PlanAVisitPage() {
  return (
    <>
      <PageHeader
        eyebrow="I'm visiting"
        title="Plan your visit."
        highlight="Family coming home."
        intro="From the moment you step onto our grounds in Ile-Ife, you're not a guest — you're family. Let us prepare for your arrival."
        image="/images/pastor-oluwafunminiyi.jpg"
        imageAlt="Apostle Oluwafunminiyi Olufisayo"
      >
        <div className="flex flex-wrap gap-3">
          <Button variant="solid" size="lg" href="#register" className="w-full sm:w-auto">
            Reserve a seat
            <ArrowRight size={14} />
          </Button>
          <AddToCalendarButton variant="white" size="lg" label="Add to Calendar" className="w-full sm:w-auto" />
          <Button variant="outlineLight" size="lg" href={CHURCH.mapsUrl} external className="w-full sm:w-auto">
            Get directions
          </Button>
        </div>
      </PageHeader>

      <section className="py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Card id="register" className="scroll-mt-24 p-6 sm:p-10">
            <VisitForm />
          </Card>

          <div>
            <Eyebrow>Step by step</Eyebrow>
            <h2 className="mt-4 font-display text-[2.4rem] uppercase leading-[0.95] text-ink-950 sm:text-5xl">
              What your Sunday looks like
            </h2>
            <ol className="mt-8 border-b border-ink-950/10">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-5 border-t border-ink-950/10 py-5">
                  <span className="font-display text-3xl text-brand-600">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h3 className="font-display text-xl uppercase leading-tight text-ink-950">{step.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-950/70">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-8 flex gap-4 bg-brand-50 p-5">
              <ShieldCheck size={22} className="shrink-0 text-brand-600" />
              <p className="text-sm leading-relaxed text-brand-800">
                <strong>Zero-pressure policy:</strong> we will never embarrass you, ask you to stand alone, or solicit funds
                awkwardly. You are our honoured guest.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-ink-950 py-28 text-white [clip-path:polygon(0_48px,100%_0,100%_calc(100%_-_48px),0_100%)] lg:py-36">
        <Container>
          <SectionHeader tone="light" eyebrow="What to expect" title="Made ready for you" />
          <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {expectations.map(({ icon: Icon, title, body }) => (
              <div key={title} className="border-t border-white/15 pt-6">
                <Icon size={22} strokeWidth={1.75} className="text-brand-300" />
                <h3 className="mt-5 font-display text-2xl uppercase leading-none">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/70">{body}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 grid gap-10 border-t border-white/15 pt-10 lg:grid-cols-2">
            <div>
              <Eyebrow tone="light">Service times</Eyebrow>
              <ul className="mt-5 space-y-3">
                {SERVICE_SCHEDULE.map((service) => (
                  <li key={service.id} className="flex items-baseline justify-between gap-4 border-b border-white/10 pb-3">
                    <span className="font-display text-xl uppercase">{service.name}</span>
                    <span className="shrink-0 text-sm font-semibold text-brand-300">{service.time}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <Eyebrow tone="light">Main auditorium</Eyebrow>
              <p className="mt-5 font-display text-2xl uppercase leading-tight sm:text-3xl">{CHURCH.address.full}</p>
              <p className="mt-3 text-sm text-white/70">
                Central Ile-Ife, with easy access from the campus gates and city centre.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="outlineLight" href={CHURCH.mapsUrl} external>
                  Open in Google Maps
                </Button>
                <Button variant="outlineLight" href={CHURCH.phoneHref}>
                  Call {CHURCH.phone}
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Interactive Google Maps Section */}
      <section className="py-20 lg:py-28 bg-paper/60 border-b border-ink-950/10">
        <Container>
          <div className="mb-10 max-w-xl">
            <Eyebrow>Find your way</Eyebrow>
            <h2 className="mt-3 font-display text-[2.4rem] uppercase leading-[0.95] text-ink-950 sm:text-5xl">
              Directions &amp; Location
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-950/70">
              Easily navigate to our main auditorium in Ile-Ife. Tap the button below to start GPS navigation on your phone or tablet.
            </p>
          </div>
          <MapCard />
        </Container>
      </section>

      <section className="py-20 lg:py-28">
        <Container narrow>
          <SectionHeader eyebrow="Common questions" title="Before you come" className="md:grid-cols-1" />
          <Accordion items={faqs} />
        </Container>
      </section>
    </>
  );
}

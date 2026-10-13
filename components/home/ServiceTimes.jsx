import { ArrowRight, MapPin, Navigation } from 'lucide-react';
import { CHURCH, SERVICE_SCHEDULE } from '../../lib/site-config';
import Container from '../ui/Container';
import Eyebrow from '../ui/Eyebrow';
import Button from '../ui/Button';
import LiveCountdown from '../LiveCountdown';
import AddToCalendarButton from '../ui/AddToCalendarButton';

const compact = (time) => time.replace(' ', '');

export default function ServiceTimes() {
  const [sunday, tuesday] = SERVICE_SCHEDULE;

  return (
    <section className="bg-brand-600 pb-28 pt-16 text-white [clip-path:polygon(0_0,100%_0,100%_calc(100%_-_56px),0_100%)] lg:pb-36 lg:pt-20">
      <Container className="grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-0">
        <div className="lg:pr-12">
          <Eyebrow tone="light">Join us for church</Eyebrow>
          <h2 className="mt-4 font-display text-[2.5rem] uppercase leading-[0.95] sm:text-6xl">
            Sundays {compact(sunday.time)}
            <br />
            Tue &amp; Thu {compact(tuesday.time)} (WAT)
          </h2>
          <p className="mt-4 text-[0.64rem] font-bold uppercase tracking-[0.3em] text-white/85">
            Service times at our main auditorium, Ile-Ife
          </p>

          <ul className="mt-6 max-w-xl space-y-2 text-sm leading-relaxed text-white/90">
            {SERVICE_SCHEDULE.map((service) => (
              <li key={service.id}>
                <strong className="font-semibold text-white">
                  {service.name} — {service.time}.
                </strong>{' '}
                {service.description}.
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <LiveCountdown />
            <AddToCalendarButton variant="white" label="Add to Calendar" />
          </div>
        </div>

        <div className="lg:border-l lg:border-white/25 lg:pl-12">
          <Eyebrow tone="light">Find us</Eyebrow>
          <h3 className="mt-4 font-display text-3xl uppercase leading-none sm:text-4xl">
            Worship with us
            <br />
            in Ile-Ife
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/90">
            {CHURCH.address.full}. There&apos;s easy parking on-site, and our hospitality team waits at the entrance
            to welcome you.
          </p>
          <div className="mt-3 text-xs text-white/80 bg-white/10 p-3 border-l-2 border-brand-300">
            <strong className="text-white">Landmark:</strong> {CHURCH.address.landmark}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button variant="outlineLight" href={CHURCH.mapsUrl} external>
              <Navigation size={14} />
              Google Maps Directions
              <ArrowRight size={14} />
            </Button>
            <Button variant="outlineLight" href={CHURCH.phoneHref}>
              Call {CHURCH.phone}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

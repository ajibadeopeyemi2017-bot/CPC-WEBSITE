import { ArrowRight, Navigation } from 'lucide-react';
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
    <section className="bg-brand-600 pb-20 pt-12 text-white [clip-path:polygon(0_0,100%_0,100%_calc(100%_-_28px),0_100%)] sm:pb-28 sm:pt-16 sm:[clip-path:polygon(0_0,100%_0,100%_calc(100%_-_56px),0_100%)] lg:pb-36 lg:pt-20">
      <Container className="grid gap-10 lg:grid-cols-[1.6fr_1fr] lg:gap-0">
        <div className="lg:pr-12">
          <Eyebrow tone="light">Join us for church</Eyebrow>
          <h2 className="mt-3 font-display text-[2.1rem] uppercase leading-[0.96] sm:mt-4 sm:text-6xl sm:leading-[0.95]">
            Sundays {compact(sunday.time)}
            <br />
            Tue &amp; Thu {compact(tuesday.time)} (WAT)
          </h2>
          <p className="mt-3 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-white/85 sm:mt-4 sm:text-[0.64rem] sm:tracking-[0.3em]">
            Service times at our main auditorium, Ile-Ife
          </p>

          <ul className="mt-5 max-w-xl space-y-2.5 text-sm leading-relaxed text-white/90 sm:mt-6">
            {SERVICE_SCHEDULE.map((service) => (
              <li key={service.id}>
                <strong className="font-semibold text-white">
                  {service.name} — {service.time}.
                </strong>{' '}
                {service.description}.
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-4">
            <LiveCountdown />
            <AddToCalendarButton variant="white" label="Add to Calendar" />
          </div>
        </div>

        <div className="border-t border-white/20 pt-8 lg:border-l lg:border-t-0 lg:border-white/25 lg:pl-12 lg:pt-0">
          <Eyebrow tone="light">Find us</Eyebrow>
          <h3 className="mt-3 font-display text-2xl uppercase leading-none sm:mt-4 sm:text-4xl">
            Worship with us
            <br />
            in Ile-Ife
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-white/90 sm:mt-4">
            {CHURCH.address.full}. There&apos;s easy parking on-site, and our hospitality team waits at the entrance
            to welcome you.
          </p>
          <div className="mt-3 border-l-2 border-brand-300 bg-white/10 p-3 text-xs text-white/80">
            <strong className="text-white">Landmark:</strong> {CHURCH.address.landmark}
          </div>
          <div className="mt-5 flex flex-wrap gap-2.5 sm:mt-6 sm:gap-3">
            <Button variant="outlineLight" href={CHURCH.mapsUrl} external className="w-full sm:w-auto">
              <Navigation size={14} />
              Google Maps Directions
              <ArrowRight size={14} />
            </Button>
            <Button variant="outlineLight" href={CHURCH.phoneHref} className="w-full sm:w-auto">
              Call {CHURCH.phone}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}

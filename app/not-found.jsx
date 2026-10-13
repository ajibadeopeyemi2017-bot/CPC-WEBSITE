import Link from 'next/link';
import { Home, Compass, Headphones, HeartHandshake, CreditCard, ArrowRight, Phone } from 'lucide-react';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import Eyebrow from '../components/ui/Eyebrow';
import { CHURCH } from '../lib/site-config';

export const metadata = {
  title: 'Page Not Found | Christ The Potter Church',
  description: 'The page you requested could not be found. Let us guide you back to our services, sermons, and ministry programs.',
};

const POPULAR_DESTINATIONS = [
  {
    title: 'Gather With Us & Plan a Visit',
    desc: 'Sunday Worship (8:00 AM), Tuesday School of Prayer, and Thursday Revelational Hour at Fajuyi Road, Ile-Ife.',
    href: '/plan-a-visit',
    icon: Compass,
    action: 'Plan your visit',
  },
  {
    title: 'Apostolic Sermon Archive',
    desc: 'Stream audio messages, Bible study series, and conference teachings by Apostle Oluwafunminiyi Olufisayo.',
    href: '/sermons',
    icon: Headphones,
    action: 'Listen to sermons',
  },
  {
    title: 'Salvation & Prayer Request',
    desc: 'Submit a confidential prayer burden or make a life decision for Christ with our ministerial team.',
    href: '/salvation',
    icon: HeartHandshake,
    action: 'Request prayer',
  },
  {
    title: 'Kingdom Giving & Partnership',
    desc: 'Honor the Lord with tithes, offerings, and building seeds via Paystack or direct bank transfer.',
    href: '/give',
    icon: CreditCard,
    action: 'Online giving',
  },
];

export default function NotFound() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-ink-950 py-20 text-white [clip-path:polygon(0_0,100%_0,100%_calc(100%_-_40px),0_100%)] sm:py-28 lg:py-32">
        <Container className="text-center">
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-brand-500/30 bg-brand-950/60 px-4 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.22em] text-brand-300">
            <span>404 &bull; Page Not Found</span>
          </div>

          <h1 className="mt-6 font-display text-[2.75rem] uppercase leading-[0.95] tracking-tight sm:text-6xl md:text-7xl">
            Let Us Guide
            <br />
            <span className="text-brand-300">Your Steps.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            The link you clicked may have moved or no longer exists. But you are always welcome in the house of God.
          </p>

          <blockquote className="mx-auto mt-6 max-w-md border-y border-white/10 py-3 text-xs italic tracking-wide text-brand-200">
            “Your word is a lamp unto my feet, and a light unto my path.” &mdash; Psalm 119:105
          </blockquote>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button variant="solid" size="lg" href="/">
              <Home size={15} />
              Return to Homepage
            </Button>
            <Button variant="white" size="lg" href="/plan-a-visit">
              <Compass size={15} />
              Plan a Visit This Sunday
            </Button>
          </div>
        </Container>
      </section>

      {/* Recommended Pages Grid */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="text-center">
            <Eyebrow className="justify-center">Where would you like to go?</Eyebrow>
            <h2 className="mt-3 font-display text-3xl uppercase text-ink-950 sm:text-4xl">
              Popular Destinations
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-ink-950/70">
              Here are the most frequently visited areas of our ministry website to help you find what you need.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {POPULAR_DESTINATIONS.map((dest, i) => {
              const Icon = dest.icon;
              return (
                <div
                  key={i}
                  className="group flex flex-col justify-between border border-ink-950/15 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-brand-600 hover:shadow-lg"
                >
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-sm bg-brand-50 text-brand-700 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                      <Icon size={24} />
                    </div>
                    <h3 className="mt-5 font-display text-xl uppercase leading-tight text-ink-950">
                      {dest.title}
                    </h3>
                    <p className="mt-2.5 text-xs leading-relaxed text-ink-950/70">
                      {dest.desc}
                    </p>
                  </div>

                  <Link
                    href={dest.href}
                    className="mt-6 inline-flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.18em] text-brand-700 group-hover:text-brand-800"
                  >
                    <span>{dest.action}</span>
                    <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Need Direct Assistance Card */}
          <div className="mt-12 rounded-sm border border-brand-600/25 bg-brand-50/60 p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.25em] text-brand-800">
                Need immediate assistance?
              </p>
              <h3 className="mt-1 font-display text-2xl uppercase text-ink-950">
                Call the Church Protocol Desk
              </h3>
              <p className="mt-1 text-xs text-ink-950/75">
                Our church office is happy to guide you with service times, seat reservations, and counseling.
              </p>
            </div>
            <Button variant="solid" size="md" href={CHURCH.phoneHref}>
              <Phone size={14} />
              Call {CHURCH.phone}
            </Button>
          </div>
        </Container>
      </section>
    </div>
  );
}

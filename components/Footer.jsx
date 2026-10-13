import Link from 'next/link';
import { MapPin, Phone, Mail, Radio, Facebook, MessageCircle } from 'lucide-react';
import { CHURCH, SERVICE_SCHEDULE, SOCIAL_LINKS, NAV_LINKS } from '../lib/site-config';
import Logo from './Logo';
import Button from './ui/Button';
import LiveModeToggle from './LiveModeToggle';

const exploreLinks = [...NAV_LINKS, { name: 'Give', href: '/give' }];

const socials = [
  { label: 'Facebook', href: SOCIAL_LINKS.facebook, icon: Facebook },
  { label: 'Mixlr live audio', href: SOCIAL_LINKS.mixlr, icon: Radio },
  { label: 'WhatsApp', href: SOCIAL_LINKS.whatsapp, icon: MessageCircle },
];

function ColumnTitle({ children }) {
  return <h3 className="mb-5 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-brand-300">{children}</h3>;
}

export default function Footer() {
  return (
    <footer className="mt-auto bg-ink-950 text-white/75">
      <div className="mx-auto grid w-full max-w-[1240px] gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.3fr_0.8fr_1.1fr_1fr] lg:py-20">
        <div>
          <Logo size="lg" subtitle="Ile-Ife · Nigeria" />
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/65">
            {CHURCH.tagline} A house of divine training in life and destiny, under the ministry of{' '}
            {CHURCH.ministryArm}.
          </p>
          <Button variant="solid" href="/give" className="mt-6">
            Give
          </Button>
        </div>

        <div>
          <ColumnTitle>Explore</ColumnTitle>
          <ul className="space-y-3 text-sm">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <ColumnTitle>Gather With Us</ColumnTitle>
          <ul className="space-y-3 text-sm">
            {SERVICE_SCHEDULE.map((service) => (
              <li key={service.id}>
                {service.name} · {service.time}
              </li>
            ))}
          </ul>

          <h3 className="mb-4 mt-8 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-brand-300">
            Main Auditorium
          </h3>
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3">
              <MapPin size={15} className="mt-0.5 shrink-0 text-brand-300" />
              <a
                href={CHURCH.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
                title="Open location in Google Maps"
              >
                <span>{CHURCH.address.full}</span>
                <span className="mt-1 block text-xs font-semibold text-brand-300 hover:underline">
                  Open in Google Maps &rarr;
                </span>
              </a>
            </li>
            <li className="flex gap-3">
              <Phone size={15} className="mt-0.5 shrink-0 text-brand-300" />
              <a href={CHURCH.phoneHref} className="hover:text-white">
                {CHURCH.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail size={15} className="mt-0.5 shrink-0 text-brand-300" />
              <a href={`mailto:${CHURCH.email}`} className="break-all hover:text-white">
                {CHURCH.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <ColumnTitle>Stay Current</ColumnTitle>
          <p className="text-sm leading-relaxed text-white/65">
            Catch up on recent messages, conferences, and teaching series from the sermon archive.
          </p>
          <Button variant="outlineLight" href="/sermons" className="mt-5">
            Sermon Archive
          </Button>

          <h3 className="mb-4 mt-8 text-[0.65rem] font-bold uppercase tracking-[0.3em] text-brand-300">Follow</h3>
          <div className="flex gap-3">
            {socials.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:border-white hover:bg-white hover:text-ink-950"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-3 px-5 py-6 text-xs text-white/50 sm:px-8 md:flex-row md:items-center md:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {CHURCH.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <LiveModeToggle />
            <span className="hidden h-3 w-px bg-white/20 sm:inline-block" />
            <p className="font-semibold uppercase tracking-[0.3em] text-white/40">Walk in the reality of Christ</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

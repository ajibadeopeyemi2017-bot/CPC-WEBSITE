import { ArrowRight } from 'lucide-react';
import { CHURCH } from '../../lib/site-config';
import Container from '../ui/Container';
import Eyebrow from '../ui/Eyebrow';
import Button from '../ui/Button';

export default function PrayerCta() {
  return (
    <section className="py-20 lg:py-24">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <Eyebrow>We&apos;re here for you</Eyebrow>
          <h2 className="mt-4 font-display text-[2.4rem] uppercase leading-[0.95] text-ink-950 sm:text-5xl">
            Need salvation or urgent prayer?
          </h2>
          <p className="mt-4 leading-relaxed text-ink-950/70">
            Whether you want to give your life to Jesus today or you&apos;re facing a storm and need pastoral
            intercession, our prayer altar never sleeps.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="solid" size="lg" href="/salvation">
            Salvation &amp; prayer
            <ArrowRight size={14} />
          </Button>
          <Button variant="outlineDark" size="lg" href={CHURCH.phoneHref}>
            Call {CHURCH.phone}
          </Button>
        </div>
      </Container>
    </section>
  );
}

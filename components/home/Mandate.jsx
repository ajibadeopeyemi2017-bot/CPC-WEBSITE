import { ArrowRight } from 'lucide-react';
import Container from '../ui/Container';
import Eyebrow from '../ui/Eyebrow';
import Button from '../ui/Button';

export default function Mandate() {
  return (
    <section className="bg-ink-950 py-32 text-white [clip-path:polygon(0_56px,100%_0,100%_calc(100%_-_56px),0_100%)] lg:py-40">
      <Container narrow>
        <Eyebrow tone="light">Our mandate</Eyebrow>
        <h2 className="mt-5 font-display text-[2.6rem] uppercase leading-[0.95] sm:text-6xl lg:text-7xl">
          Teaching men to walk
          <span className="block text-brand-300">in the reality of Christ.</span>
        </h2>
        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/80">
          We are called to teach and preach with apostolic clarity — rooted in deep biblical revelation, fervent
          prayer, and the order of God — so that every believer is trained for life and destiny.
        </p>
        <Button variant="outlineLight" href="/about" className="mt-10">
          About us
          <ArrowRight size={14} />
        </Button>
      </Container>
    </section>
  );
}

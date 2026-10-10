import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import Container from '../ui/Container';
import Eyebrow from '../ui/Eyebrow';
import Button from '../ui/Button';

const gatherings = [
  'Kingdom Young Ministers Conference',
  'Annual Gathering of the Eagles',
  'Realised Destiny Summit',
  'Revelation of Our Salvation',
  "AMITES Ministers' School",
];

const excerpts = [
  {
    image: '/images/quote-purpose.jpg',
    title: 'Purpose vs. Calling',
    quote:
      "Purpose is the reason for your existence, the very backbone of what you're born to do, while Calling is how you're meant to do it.",
  },
  {
    image: '/images/quote-accountability.jpg',
    title: 'The Race of Life',
    quote: "Everyone will give account of his race in life at the end, whether you're aware of it or not.",
  },
  {
    image: '/images/quote-surrender.jpg',
    title: 'The Living Sacrifice',
    quote: 'The best sacrifice you can offer to God is your life. God wants us to remain a living sacrifice unto Him.',
  },
];

export default function SetMan() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden bg-ink-950">
            <Image
              src="/images/pastor-portrait.jpg"
              alt="Apostle Oluwafunminiyi Samson Olufisayo"
              fill
              sizes="(min-width: 1024px) 480px, 100vw"
              className="object-cover object-top"
            />
          </div>

          <div>
            <Eyebrow>Set man</Eyebrow>
            <h2 className="mt-4 font-display text-[2.4rem] uppercase leading-[0.95] text-ink-950 sm:text-5xl lg:text-[3.6rem]">
              Apostle Oluwafunminiyi
              <span className="block text-brand-600">Samson Olufisayo</span>
            </h2>
            <p className="mt-6 leading-relaxed text-ink-950/80">
              An ordained minister of the gospel, called and sent as a conference speaker and life trainer with an
              apostolic teaching mandate: to teach men to walk in the reality of who Christ is.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-950/65">
              He is passionate about seeing the order of God established in the Church. He serves alongside his wife,{' '}
              <strong className="font-semibold text-ink-950">Rev. Mrs. Olamide Olufisayo</strong>, and they live in
              Ile-Ife with their children, Aquila and Paul.
            </p>

            <p className="mt-8 text-[0.64rem] font-bold uppercase tracking-[0.3em] text-ink-950/60">Convener of</p>
            <ul className="mt-3 grid gap-x-6 gap-y-2 text-sm text-ink-950 sm:grid-cols-2">
              {gatherings.map((name) => (
                <li key={name} className="flex items-center gap-3">
                  <span className="h-px w-4 bg-brand-600" />
                  {name}
                </li>
              ))}
            </ul>

            <Button variant="solid" href="/about" className="mt-9">
              Read his story
              <ArrowRight size={14} />
            </Button>
          </div>
        </div>

        <div className="mt-20 lg:mt-28">
          <Eyebrow>Words of wisdom</Eyebrow>
          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            {excerpts.map((item) => (
              <figure key={item.title} className="border border-ink-950/10 bg-white">
                <div className="relative aspect-square bg-ink-950">
                  <Image
                    src={item.image}
                    alt={`${item.title} — quote graphic`}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-contain"
                  />
                </div>
                <figcaption className="p-5">
                  <span className="font-display text-xl uppercase text-ink-950">{item.title}</span>
                  <p className="mt-2 text-sm leading-relaxed text-ink-950/65">“{item.quote}”</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

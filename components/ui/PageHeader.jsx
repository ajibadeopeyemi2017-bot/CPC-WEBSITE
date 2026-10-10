import Image from 'next/image';
import clsx from 'clsx';
import Container from './Container';
import Eyebrow from './Eyebrow';

// Top band for inner pages: eyebrow, two-tone display title, intro, optional
// actions and a photo that fades in from the right on large screens.
export default function PageHeader({ eyebrow, title, highlight, intro, children, image, imageAlt = '', tone = 'ink' }) {
  return (
    <section
      className={clsx(
        'relative isolate overflow-hidden pb-24 pt-16 text-white [clip-path:polygon(0_0,100%_0,100%_calc(100%_-_48px),0_100%)] sm:pt-20 lg:pb-32 lg:pt-24',
        tone === 'green' ? 'bg-brand-600' : 'bg-ink-950'
      )}
    >
      {image && (
        <>
          <div className="absolute inset-y-0 right-0 -z-10 w-full lg:w-1/2">
            <Image src={image} alt={imageAlt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover object-[center_25%]" />
          </div>
          <div className="absolute inset-0 -z-10 bg-ink-950/75 lg:bg-gradient-to-r lg:from-ink-950 lg:via-ink-950/85 lg:to-transparent" />
        </>
      )}
      <Container>
        <Eyebrow tone="light">{eyebrow}</Eyebrow>
        <h1 className="mt-5 max-w-4xl font-display text-[2.6rem] uppercase leading-[0.92] sm:text-6xl lg:text-[4.75rem]">
          {title}
          {highlight && (
            <span className={clsx('block', tone === 'green' ? 'text-brand-100' : 'text-brand-300')}>{highlight}</span>
          )}
        </h1>
        {intro && <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">{intro}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </Container>
    </section>
  );
}

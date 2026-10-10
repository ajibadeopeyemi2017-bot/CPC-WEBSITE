import clsx from 'clsx';
import Eyebrow from './Eyebrow';

// Eyebrow + big display heading on the left, optional intro copy on the right.
export default function SectionHeader({ eyebrow, title, aside, tone = 'dark', className }) {
  const light = tone === 'light';
  return (
    <div className={clsx('mb-10 grid gap-6 md:mb-14 md:grid-cols-[1.4fr_1fr] md:items-end', className)}>
      <div>
        {eyebrow && <Eyebrow tone={light ? 'light' : 'brand'}>{eyebrow}</Eyebrow>}
        <h2
          className={clsx(
            'mt-4 font-display text-[2.4rem] uppercase leading-[0.95] sm:text-5xl lg:text-[3.6rem]',
            light ? 'text-white' : 'text-ink-950'
          )}
        >
          {title}
        </h2>
      </div>
      {aside && (
        <p className={clsx('max-w-md text-[0.95rem] leading-relaxed', light ? 'text-white/75' : 'text-ink-950/70')}>
          {aside}
        </p>
      )}
    </div>
  );
}

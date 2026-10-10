import clsx from 'clsx';

// Small "— LABEL" kicker that sits above section headings.
export default function Eyebrow({ tone = 'brand', className, children }) {
  return (
    <div
      className={clsx(
        'flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.3em]',
        tone === 'light' ? 'text-white/85' : 'text-brand-600',
        className
      )}
    >
      <span className={clsx('h-px w-7', tone === 'light' ? 'bg-white/70' : 'bg-brand-600')} />
      {children}
    </div>
  );
}

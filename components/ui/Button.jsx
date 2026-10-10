import Link from 'next/link';
import clsx from 'clsx';

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap border text-[0.72rem] font-bold uppercase tracking-[0.18em] transition-colors duration-200';

const variants = {
  solid: 'border-brand-600 bg-brand-600 text-white hover:border-brand-700 hover:bg-brand-700',
  white: 'border-white bg-white text-brand-700 hover:bg-brand-50',
  outlineLight: 'border-white/80 text-white hover:bg-white hover:text-ink-950',
  outlineDark: 'border-ink-950 text-ink-950 hover:bg-ink-950 hover:text-white',
};

const sizes = {
  sm: 'px-4 py-2.5',
  md: 'px-6 py-3.5',
  lg: 'px-7 py-4',
};

// Renders a Next.js <Link> for internal hrefs, an <a> for external/tel/mailto
// hrefs, and a <button> otherwise.
export default function Button({ variant = 'solid', size = 'md', href, external, className, children, ...props }) {
  const classes = clsx(base, variants[variant], sizes[size], className);

  if (href && (external || !href.startsWith('/'))) {
    const newTab = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
    return (
      <a href={href} className={classes} {...newTab} {...props}>
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}

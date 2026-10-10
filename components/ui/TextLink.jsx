import Link from 'next/link';
import clsx from 'clsx';
import { ArrowRight } from 'lucide-react';

// Green uppercase "READ MORE →" style link used at the foot of cards.
export default function TextLink({ href, onClick, className, children }) {
  const classes = clsx(
    'group inline-flex items-center gap-2 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-brand-600 hover:text-brand-800',
    className
  );
  const content = (
    <>
      {children}
      <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
    </>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={classes}>
        {content}
      </button>
    );
  }
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }
  return (
    <a href={href} className={classes}>
      {content}
    </a>
  );
}

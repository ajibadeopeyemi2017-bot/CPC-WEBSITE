import clsx from 'clsx';

export default function Card({ className, children, ...props }) {
  return (
    <div className={clsx('border border-ink-950/10 bg-white', className)} {...props}>
      {children}
    </div>
  );
}

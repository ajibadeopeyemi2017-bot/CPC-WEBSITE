import clsx from 'clsx';

const control =
  'w-full border border-ink-950/20 bg-white px-4 py-3 text-base text-ink-950 placeholder:text-ink-950/40 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/15 sm:text-sm';

// text-base on mobile keeps iOS Safari from zooming into focused inputs.
export function Label({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-[0.64rem] font-bold uppercase tracking-[0.22em] text-ink-950/70">
      {children}
    </label>
  );
}

export function Input({ className, ...props }) {
  return <input className={clsx(control, className)} {...props} />;
}

export function Select({ className, children, ...props }) {
  return (
    <select className={clsx(control, 'pr-10', className)} {...props}>
      {children}
    </select>
  );
}

export function Textarea({ className, ...props }) {
  return <textarea className={clsx(control, 'min-h-[120px] resize-y', className)} {...props} />;
}

export function Field({ label, id, children }) {
  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      {children}
    </div>
  );
}

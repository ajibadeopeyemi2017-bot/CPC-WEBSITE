import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

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
    <div className="group relative w-full">
      <select
        className={clsx(
          control,
          'appearance-none cursor-pointer pr-12 font-medium leading-relaxed',
          'transition-all duration-150',
          'hover:border-ink-950/45 hover:bg-paper/40',
          'focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20',
          className
        )}
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center border-l border-ink-950/15 bg-paper/60 px-3.5 text-ink-950/50 transition-colors group-hover:border-ink-950/30 group-hover:bg-paper group-hover:text-brand-700 group-focus-within:border-brand-600/40 group-focus-within:bg-brand-50 group-focus-within:text-brand-600">
        <ChevronDown size={15} strokeWidth={2.2} />
      </div>
    </div>
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

import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

// logo-icon is a green mark on a white JPEG background. The filter turns it
// into a white mark on black, and mix-blend-screen drops the black, so it
// sits cleanly on any dark or green surface. Replace with a transparent
// SVG/PNG of the mark when one is available.
export default function Logo({ size = 'md', subtitle = 'Church · Ile-Ife', className, onClick }) {
  const large = size === 'lg';
  return (
    <Link
      href="/"
      onClick={onClick}
      className={clsx('flex items-center gap-3', className)}
      aria-label="Christ The Potter Church home"
    >
      <span className={clsx('relative block shrink-0 overflow-hidden', large ? 'h-14 w-14' : 'h-10 w-10')}>
        <Image
          src="/images/logo-icon.png"
          alt=""
          fill
          sizes="56px"
          priority
          className="scale-[2.7] object-cover contrast-200 grayscale invert mix-blend-screen"
        />
      </span>
      <span className="leading-none text-white">
        <span className={clsx('block font-display uppercase', large ? 'text-[1.6rem]' : 'text-[1.15rem]')}>
          Christ The Potter
        </span>
        <span className="mt-1 block text-[0.55rem] font-semibold uppercase tracking-[0.3em] text-white/80">
          {subtitle}
        </span>
      </span>
    </Link>
  );
}

import clsx from 'clsx';

export default function Container({ narrow = false, className, children }) {
  return (
    <div className={clsx('mx-auto w-full px-5 sm:px-8', narrow ? 'max-w-[980px]' : 'max-w-[1240px]', className)}>
      {children}
    </div>
  );
}

import Container from './Container';
import Eyebrow from './Eyebrow';

// Green closing band with a diagonal top edge, used at the foot of inner pages.
export default function CtaBand({ eyebrow, title, highlight, body, children }) {
  return (
    <section className="bg-brand-600 pb-20 pt-28 text-white [clip-path:polygon(0_48px,100%_0,100%_100%,0_100%)] lg:pb-24 lg:pt-32">
      <Container className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          {eyebrow && <Eyebrow tone="light">{eyebrow}</Eyebrow>}
          <h2 className="mt-4 font-display text-[2.4rem] uppercase leading-[0.95] sm:text-5xl">
            {title}
            {highlight && <span className="block text-brand-100">{highlight}</span>}
          </h2>
          {body && <p className="mt-4 leading-relaxed text-white/90">{body}</p>}
        </div>
        {children && <div className="flex flex-wrap gap-3">{children}</div>}
      </Container>
    </section>
  );
}

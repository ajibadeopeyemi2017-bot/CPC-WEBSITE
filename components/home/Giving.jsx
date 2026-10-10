import { ArrowRight } from 'lucide-react';
import { BANK_ACCOUNTS } from '../../lib/site-config';
import Container from '../ui/Container';
import Eyebrow from '../ui/Eyebrow';
import Button from '../ui/Button';

export default function Giving() {
  return (
    <section className="bg-brand-600 pb-20 pt-32 text-white [clip-path:polygon(0_56px,100%_0,100%_100%,0_100%)] lg:pb-28 lg:pt-40">
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow tone="light">Honour the Lord</Eyebrow>
          <h2 className="mt-4 font-display text-[2.5rem] uppercase leading-[0.95] sm:text-6xl">
            Kingdom partnership
            <span className="block text-brand-300">&amp; online giving</span>
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-white/90">
            “Bring ye all the tithes into the storehouse, that there may be meat in mine house.” (Mal. 3:10). Your
            giving fuels the gospel, community outreaches, campus missions, and our permanent sanctuary.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button variant="white" size="lg" href="/give">
              Give online
              <ArrowRight size={14} />
            </Button>
            <Button variant="outlineLight" size="lg" href="/give#accounts">
              All giving options
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[0.64rem] font-bold uppercase tracking-[0.3em] text-white/80">Direct bank transfer</p>
          {BANK_ACCOUNTS.map((account) => (
            <div key={account.accountNumber} className="border border-white/30 p-6">
              <p className="text-[0.64rem] font-bold uppercase tracking-[0.22em] text-brand-100">{account.purpose}</p>
              <p className="mt-3 font-display text-4xl tracking-wider sm:text-5xl">{account.accountNumber}</p>
              <p className="mt-2 text-sm text-white/85">
                {account.accountName} · {account.bank}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

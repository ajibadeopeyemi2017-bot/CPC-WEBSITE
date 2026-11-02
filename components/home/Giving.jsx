import { ArrowRight } from 'lucide-react';
import { BANK_ACCOUNTS } from '../../lib/site-config';
import Container from '../ui/Container';
import Eyebrow from '../ui/Eyebrow';
import Button from '../ui/Button';

export default function Giving() {
  return (
    <section className="bg-brand-600 pb-16 pt-20 text-white [clip-path:polygon(0_28px,100%_0,100%_100%,0_100%)] sm:pb-20 sm:pt-32 sm:[clip-path:polygon(0_56px,100%_0,100%_100%,0_100%)] lg:pb-28 lg:pt-40">
      <Container className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <div>
          <Eyebrow tone="light">Honour the Lord</Eyebrow>
          <h2 className="mt-3 font-display text-[2.2rem] uppercase leading-[0.95] sm:mt-4 sm:text-6xl">
            Kingdom partnership
            <span className="block text-brand-300">&amp; online giving</span>
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/90 sm:mt-6 sm:text-base">
            “Bring ye all the tithes into the storehouse, that there may be meat in mine house.” (Mal. 3:10). Your
            giving fuels the gospel, community outreaches, campus missions, and our permanent sanctuary.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3">
            <Button variant="white" size="lg" href="/give" className="w-full sm:w-auto">
              Give online
              <ArrowRight size={14} />
            </Button>
            <Button variant="outlineLight" size="lg" href="/give#accounts" className="w-full sm:w-auto">
              Bank accounts
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <p className="text-[0.64rem] font-bold uppercase tracking-[0.3em] text-white/80">Direct bank transfer</p>
          {BANK_ACCOUNTS.map((account) => (
            <div key={account.accountNumber} className="border border-white/30 p-5 sm:p-6">
              <p className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-brand-100 sm:text-[0.64rem]">
                {account.purpose}
              </p>
              <p className="mt-2 font-display text-3xl tracking-wider sm:mt-3 sm:text-5xl">{account.accountNumber}</p>
              <p className="mt-1.5 text-xs text-white/85 sm:mt-2 sm:text-sm">
                {account.accountName} · {account.bank}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { ArrowDown } from 'lucide-react';
import { BANK_ACCOUNTS, CHURCH } from '../../lib/site-config';
import { GIVING_CATEGORIES } from '../../lib/giving';
import PageHeader from '../../components/ui/PageHeader';
import Container from '../../components/ui/Container';
import SectionHeader from '../../components/ui/SectionHeader';
import Eyebrow from '../../components/ui/Eyebrow';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import CopyButton from '../../components/give/CopyButton';
import GivingForm from '../../components/give/GivingForm';

export const metadata = {
  title: 'Give | Christ The Potter Church',
  description: 'Give tithes, offerings and partnership seeds to Christ The Potter Church and OSOM Ministries by direct bank transfer.',
};

export default function GivePage() {
  return (
    <>
      <PageHeader
        tone="green"
        eyebrow="Honour the Lord with your substance"
        title="Give."
        highlight="Kingdom partnership."
        intro="“Every man according as he purposeth in his heart, so let him give; not grudgingly, or of necessity: for God loveth a cheerful giver.” — 2 Cor. 9:7"
      >
        <Button variant="white" size="lg" href="#accounts">
          Bank transfer details
          <ArrowDown size={14} />
        </Button>
      </PageHeader>

      <section className="py-20 lg:py-28">
        <Container className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
          <div id="accounts" className="scroll-mt-24">
            <Eyebrow>Direct bank transfer</Eyebrow>
            <h2 className="mt-4 font-display text-[2.4rem] uppercase leading-[0.95] text-ink-950 sm:text-5xl">
              Official church accounts
            </h2>
            <p className="mt-4 text-ink-950/70">You can send your giving into either account below.</p>

            <div className="mt-8 space-y-4">
              {BANK_ACCOUNTS.map((account) => (
                <Card key={account.accountNumber} className="border-l-4 border-l-brand-600 p-6">
                  <p className="text-[0.64rem] font-bold uppercase tracking-[0.22em] text-brand-600">{account.purpose}</p>
                  <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <p className="text-[0.62rem] font-bold uppercase tracking-[0.25em] text-ink-950/50">Account number</p>
                      <p className="mt-1 font-display text-4xl tracking-wider text-ink-950 sm:text-5xl">{account.accountNumber}</p>
                    </div>
                    <CopyButton value={account.accountNumber} />
                  </div>
                  <p className="mt-4 text-sm text-ink-950/70">
                    <strong className="font-semibold text-ink-950">{account.accountName}</strong> · {account.bank}
                  </p>
                </Card>
              ))}
            </div>

            <blockquote className="mt-8 bg-ink-950 p-8 text-white">
              <p className="font-display text-2xl uppercase leading-tight text-brand-300">The covenant of the storehouse</p>
              <p className="mt-4 text-sm leading-relaxed text-white/80">
                “Bring ye all the tithes into the storehouse, that there may be meat in mine house, and prove me now
                herewith, saith the LORD of hosts, if I will not open you the windows of heaven, and pour you out a
                blessing, that there shall not be room enough to receive it.” — Malachi 3:10
              </p>
            </blockquote>
          </div>

          <Card className="self-start p-6 sm:p-10">
            <GivingForm />
          </Card>
        </Container>
      </section>

      <section className="mb-12 bg-ink-950 py-28 text-white [clip-path:polygon(0_48px,100%_0,100%_calc(100%_-_48px),0_100%)] lg:py-32">
        <Container>
          <SectionHeader
            tone="light"
            eyebrow="Where it goes"
            title="Ways to give"
            aside={`Questions about giving or receipts? Call ${CHURCH.phone}.`}
          />
          <div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {GIVING_CATEGORIES.map((cat) => (
              <div key={cat.id} className="border-t border-white/15 py-6">
                <h3 className="font-display text-2xl uppercase leading-none">{cat.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/70">{cat.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

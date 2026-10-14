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
import BankUssdQuickDial from '../../components/give/BankUssdQuickDial';
import { Globe, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'Give | Christ The Potter Church',
  description: 'Give tithes, offerings and partnership seeds to Christ The Potter Church and OSOM Ministries securely online via Paystack or direct bank transfer.',
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
        <div className="flex flex-wrap gap-3">
          <Button variant="solid" size="lg" href="#portal">
            Give Online (Paystack)
            <ArrowDown size={14} />
          </Button>
          <Button variant="white" size="lg" href="#accounts">
            Bank transfer details
            <ArrowDown size={14} />
          </Button>
        </div>
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
                    <CopyButton
                      value={account.accountNumber}
                      toastMessage={`Copied ${account.accountNumber} (${account.accountName}) to clipboard`}
                    />
                  </div>
                  <p className="mt-4 text-sm text-ink-950/70">
                    <strong className="font-semibold text-ink-950">{account.accountName}</strong> · {account.bank}
                  </p>
                </Card>
              ))}
            </div>

            {/* USSD Mobile Banking Quick Generator */}
            <div className="mt-8">
              <BankUssdQuickDial />
            </div>

            {/* International & Diaspora Wire Details */}
            <div className="mt-8 border border-ink-950/15 bg-white p-6">
              <div className="flex items-center gap-2">
                <Globe size={18} className="text-brand-700" />
                <h3 className="font-display text-lg uppercase tracking-tight text-ink-950">
                  International &amp; Diaspora Giving
                </h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-ink-950/70">
                Partners in the United States, United Kingdom, Canada, and Europe can give via Visa / Mastercard on our online Paystack portal (toggle currency to USD) or send direct international bank wire transfers.
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2 text-xs border-t border-ink-950/10 pt-3">
                <div>
                  <span className="block text-[0.6rem] font-bold uppercase text-ink-950/50">Bank Name</span>
                  <strong className="font-semibold text-ink-950">Zenith Bank Plc</strong>
                </div>
                <div>
                  <span className="block text-[0.6rem] font-bold uppercase text-ink-950/50">SWIFT / BIC Code</span>
                  <strong className="font-mono font-semibold text-ink-950">ZEIBNGLA</strong>
                </div>
                <div>
                  <span className="block text-[0.6rem] font-bold uppercase text-ink-950/50">Beneficiary Country</span>
                  <span className="text-ink-950 font-medium">Nigeria</span>
                </div>
                <div>
                  <span className="block text-[0.6rem] font-bold uppercase text-ink-950/50">Branch</span>
                  <span className="text-ink-950 font-medium">Fajuyi Road, Ile-Ife, Osun State</span>
                </div>
              </div>
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

          <Card id="portal" className="scroll-mt-24 self-start p-6 sm:p-10">
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

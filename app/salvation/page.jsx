import { Phone } from 'lucide-react';
import { CHURCH } from '../../lib/site-config';
import PageHeader from '../../components/ui/PageHeader';
import Container from '../../components/ui/Container';
import SectionHeader from '../../components/ui/SectionHeader';
import Eyebrow from '../../components/ui/Eyebrow';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ConfirmPrayer from '../../components/salvation/ConfirmPrayer';
import PrayerRequest from '../../components/salvation/PrayerRequest';

export const metadata = {
  title: 'Salvation, Prayer & Testimonies | Christ The Potter Church',
  description: 'Give your life to Jesus today, take your next steps in faith, share your praise reports, or send a prayer request to the intercessors of Christ The Potter Church.',
};

const nextSteps = [
  { title: 'Daily fellowship in prayer', body: 'Speak to God daily as your loving Heavenly Father. Prayer is intimacy before it is requests.' },
  { title: "Feed on God's Word", body: 'Begin with the Gospel of John. The Word of God is your spiritual milk and meat for strength.' },
  { title: 'Baptism of the Holy Spirit', body: 'Ask the Father for the infilling of the Holy Ghost, with the evidence of speaking in tongues.' },
  { title: "Foundational believers' class", body: 'Join our systematic training where we establish you in sound doctrine and kingdom order.' },
];

export default function SalvationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Life in Christ · Altar of grace"
        title="Salvation"
        highlight="& prayer."
        intro="There is no distance in the spirit. Whether you're taking your first step to receive Jesus, sharing a praise report, or need pastoral intercession, grace is available right now."
      >
        <div className="flex flex-wrap gap-3">
          <Button variant="solid" size="lg" href="#salvation">
            I gave my life to Christ
          </Button>
          <Button variant="white" size="lg" href="#prayer">
            Prayer &amp; Testimonies
          </Button>
        </div>
      </PageHeader>

      <section id="salvation" className="scroll-mt-20 py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Eyebrow>Eternal life</Eyebrow>
              <h2 className="mt-4 font-display text-[2.4rem] uppercase leading-[0.95] text-ink-950 sm:text-5xl lg:text-[3.6rem]">
                Welcome to the
                <span className="block text-brand-600">family of God.</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-950/75">
                If you decided today to surrender your will and accept Jesus Christ as your Lord and Saviour, you have just
                experienced the greatest miracle there is.
              </p>
            </div>

            <div className="bg-ink-950 p-8 text-white sm:p-10">
              <p className="text-[0.64rem] font-bold uppercase tracking-[0.3em] text-brand-300">Pray this from your heart</p>
              <p className="mt-5 text-lg italic leading-relaxed text-white/90">
                “Lord Jesus, I come to You today acknowledging that I am a sinner in need of Your mercy. I believe that You
                died on the cross for my sins and rose again for my justification. Today, I renounce every work of darkness
                and surrender the throne of my heart to You. Be my Lord, Saviour, and King. Wash me clean by Your blood and
                fill me with Your Holy Spirit. From this day forward, I belong to God. In Jesus&apos; mighty name, Amen!”
              </p>
              <div className="mt-8">
                <ConfirmPrayer />
              </div>
            </div>
          </div>

          <div className="mt-20">
            <SectionHeader eyebrow="What now?" title="Your next four steps" />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {nextSteps.map((step, i) => (
                <Card key={step.title} className="p-7">
                  <span className="font-display text-4xl text-brand-600">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="mt-5 font-display text-2xl uppercase leading-none text-ink-950">{step.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-950/70">{step.body}</p>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-5 border border-brand-600/30 bg-brand-50 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-display text-xl uppercase text-brand-800">Want a pastor to walk with you?</p>
                <p className="mt-1 text-sm text-brand-700">Call or WhatsApp the pastoral counselling desk on {CHURCH.phone}.</p>
              </div>
              <Button variant="solid" href={CHURCH.phoneHref}>
                <Phone size={14} />
                Call a pastor
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section id="prayer" className="scroll-mt-20 border-t border-ink-950/10 py-20 lg:py-28">
        <Container>
          <PrayerRequest />
        </Container>
      </section>
    </>
  );
}

import { ArrowDown } from 'lucide-react';
import { CHURCH } from '../../lib/site-config';
import { MINISTRIES } from '../../lib/conferences';
import PageHeader from '../../components/ui/PageHeader';
import Container from '../../components/ui/Container';
import SectionHeader from '../../components/ui/SectionHeader';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import ConferencesSection from '../../components/connect/ConferencesSection';
import VolunteerForm from '../../components/connect/VolunteerForm';

export const metadata = {
  title: 'Connect & Conferences | Christ The Potter Church',
  description: 'Conferences, schools, ministries and serving teams at Christ The Potter Church, Ile-Ife — KYMC, AGOTE, RDS, ROS and AMITES.',
};

export default function ConnectPage() {
  return (
    <>
      <PageHeader
        eyebrow="Connect · Serve · Grow"
        title="Find your place"
        highlight="in the family of God."
        intro="You aren't meant to walk this journey alone. Attend our conferences, join a ministry team, and release your God-given grace."
      >
        <Button variant="solid" size="lg" href="#conferences">
          Conferences
          <ArrowDown size={14} />
        </Button>
        <Button variant="outlineLight" size="lg" href="#serve">
          Join a team
        </Button>
      </PageHeader>

      <ConferencesSection />

      <section className="bg-ink-950 py-28 text-white [clip-path:polygon(0_48px,100%_0,100%_calc(100%_-_48px),0_100%)] lg:py-36">
        <Container>
          <SectionHeader
            tone="light"
            eyebrow="Serve & connect"
            title="Departments & family units"
            aside="Discover where you can plug in your gifts and be a blessing to the body of Christ."
          />
          <div className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
            {MINISTRIES.map((m) => (
              <div key={m.title} className="flex flex-col border-t border-white/15 py-7">
                <h3 className="font-display text-2xl uppercase leading-none">{m.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-white/70">{m.desc}</p>
                <p className="mt-4 text-[0.62rem] font-bold uppercase tracking-[0.22em] text-brand-300">
                  {m.leader} · {m.meeting}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section id="serve" className="scroll-mt-20 py-20 lg:py-28">
        <Container narrow>
          <SectionHeader
            eyebrow="Join a ministry team"
            title="Volunteer your talents"
            aside="“Come labour on!” Fill in the form and our leadership team will connect with you."
          />
          <Card className="p-6 sm:p-10">
            <VolunteerForm />
          </Card>
        </Container>
      </section>
    </>
  );
}

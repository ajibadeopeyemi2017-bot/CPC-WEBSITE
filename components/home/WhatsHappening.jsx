import { Church, CalendarDays, Headphones } from 'lucide-react';
import Container from '../ui/Container';
import SectionHeader from '../ui/SectionHeader';
import Card from '../ui/Card';
import TextLink from '../ui/TextLink';
import PlanVisitTrigger from '../PlanVisitTrigger';

const items = [
  {
    icon: Church,
    title: 'Weekly Services',
    body: 'Sunday Worship at 8:00 AM, School of Prayer on Tuesdays and Revelational Hour on Thursdays at 5:00 PM — all at the main auditorium in Ile-Ife.',
    action: <PlanVisitTrigger as="text">Plan a visit</PlanVisitTrigger>,
  },
  {
    icon: CalendarDays,
    title: 'Upcoming Events',
    body: 'KYMC 2026 runs September 24 – 26, alongside AGOTE, the Realised Destiny Summit, ROS and community outreaches through the year.',
    action: <TextLink href="/connect#conferences">See events</TextLink>,
  },
  {
    icon: Headphones,
    title: 'Sermons & Media',
    body: 'Catch up on recent ministrations from Apostle Oluwafunminiyi Olufisayo, or join the live audio broadcast during service.',
    action: <TextLink href="/sermons">Listen now</TextLink>,
  },
];

export default function WhatsHappening() {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <SectionHeader
          eyebrow="This season"
          title="What's happening at CPC"
          aside="Here's what's on at Christ The Potter Church — weekly services, conferences, and fresh teaching from the pulpit."
        />

        <div className="grid gap-5 md:grid-cols-3">
          {items.map(({ icon: Icon, title, body, action }) => (
            <Card key={title} className="flex flex-col p-7 lg:p-8">
              <Icon size={22} strokeWidth={1.75} className="text-brand-600" />
              <h3 className="mt-6 font-display text-2xl uppercase leading-none text-ink-950">{title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-950/70">{body}</p>
              <div className="mt-8">{action}</div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}

import { Tv, Radio } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import CtaBand from '../../components/ui/CtaBand';
import LiveCountdown from '../../components/LiveCountdown';
import LiveBroadcastCenter from '../../components/live/LiveBroadcastCenter';
import SchemaOrg from '../../components/seo/SchemaOrg';
import { SOCIAL_LINKS } from '../../lib/site-config';
import { getServiceEventsJsonLd } from '../../lib/seo';

export const metadata = {
  title: 'Live Broadcast & Online Sanctuary | Christ The Potter Church',
  description:
    'Join Christ The Potter Church live from Ile-Ife via Facebook Live video or Mixlr low-data audio stream. Take live service notes, submit prayer requests, and stream pulpit rebroadcasts.',
  openGraph: {
    title: 'Live Broadcast & Online Sanctuary | Christ The Potter Church',
    description:
      'Watch live video and stream Mixlr audio broadcasts from Apostle Oluwafunminiyi Olufisayo.',
    images: ['/images/pastor-action.jpg'],
  },
};

export default function LiveStreamPage() {
  const eventsSchema = getServiceEventsJsonLd();

  return (
    <>
      <SchemaOrg data={eventsSchema} />

      <PageHeader
        eyebrow="Online Church Sanctuary · Ile-Ife, Nigeria"
        title="Live Broadcast"
        highlight="& Video Stream"
        intro="Wherever you are in the world, connect live to the atmosphere of the Word, fervent intercession, and supernatural impartation at Christ The Potter Church."
        image="/images/pastor-action.jpg"
        imageAlt="Apostle Oluwafunminiyi Olufisayo ministering live"
      >
        <Button variant="solid" size="lg" href="#sanctuary">
          <Tv size={15} />
          Enter Online Sanctuary
        </Button>
        <Button variant="outlineLight" size="lg" href={SOCIAL_LINKS.mixlr} external>
          <Radio size={15} />
          Direct Mixlr Channel
        </Button>
        <div className="mt-6 w-full max-w-2xl">
          <LiveCountdown />
        </div>
      </PageHeader>

      <LiveBroadcastCenter />

      <CtaBand
        eyebrow="Gather With Us In Person"
        title="Worship at the Main Auditorium in Ile-Ife"
        body="Nothing compares to being physically present in the house of God. Join us this Sunday at 8:00 AM, Tuesday at 5:00 PM, or Thursday at 5:00 PM at 76B, PHCN Office (Upper Floor), Off Fajuyi Road, Ile-Ife."
        primary={{ label: 'Plan Your Visit', href: '/plan-a-visit' }}
        secondary={{ label: 'Browse Sermon Archive', href: '/sermons' }}
      />
    </>
  );
}


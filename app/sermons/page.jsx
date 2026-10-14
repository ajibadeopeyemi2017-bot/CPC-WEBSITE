import { Radio, Phone } from 'lucide-react';
import { CHURCH, SOCIAL_LINKS } from '../../lib/site-config';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import CtaBand from '../../components/ui/CtaBand';
import LiveCountdown from '../../components/LiveCountdown';
import SermonLibrary from '../../components/sermons/SermonLibrary';
import SchemaOrg from '../../components/seo/SchemaOrg';
import { getSermonsJsonLd } from '../../lib/seo';

export const metadata = {
  title: 'Sermons | Christ The Potter Church',
  description: 'Listen to apostolic teaching from Apostle Oluwafunminiyi Olufisayo and join the live broadcast of Christ The Potter Church services.',
};

export default function SermonsPage() {
  const sermonsSchema = getSermonsJsonLd();

  return (
    <>
      <SchemaOrg data={sermonsSchema} />
      <PageHeader
        eyebrow="Watch & listen"
        title="Food for"
        highlight="your spirit man."
        intro="“Man shall not live by bread alone, but by every word that proceeds from the mouth of God.” Join the live broadcast during every service, or listen back to deep apostolic series."
      >
        <Button variant="solid" size="lg" href={SOCIAL_LINKS.mixlr} external>
          <Radio size={14} />
          Join live on Mixlr
        </Button>
        <div className="mt-6 w-full max-w-2xl">
          <LiveCountdown />
        </div>
      </PageHeader>

      <SermonLibrary />

      <CtaBand
        eyebrow="CPC media stand"
        title="Take the word"
        highlight="home with you."
        body="Order complete conference packages, USB audio compilations, and sermon series through the media stand — available every Sunday."
      >
        <Button variant="white" size="lg" href={CHURCH.phoneHref}>
          <Phone size={14} />
          Order · {CHURCH.phone}
        </Button>
      </CtaBand>
    </>
  );
}

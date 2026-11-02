import { Download, BookOpen } from 'lucide-react';
import PageHeader from '../../components/ui/PageHeader';
import Button from '../../components/ui/Button';
import CtaBand from '../../components/ui/CtaBand';
import DevotionalReader from '../../components/devotional/DevotionalReader';
import DevotionalArchiveGrid from '../../components/devotional/DevotionalArchiveGrid';
import { DEVOTIONAL_THEME, DEVOTIONAL_PDF_URL } from '../../lib/devotional';

export const metadata = {
  title: `Daily Devotional & Apostolic Decree — ${DEVOTIONAL_THEME} | Christ The Potter Church`,
  description:
    'Read today\'s devotional and prophetic apostolic decree by Apostle Oluwafunminiyi Olufisayo. Complete 31-day blueprint with daily scripture diet, heart meditations, and shareable WhatsApp status cards.',
  openGraph: {
    title: `Daily Devotional: ${DEVOTIONAL_THEME} | Christ The Potter Church`,
    description:
      'Daily prophetic word, anchor scriptures, heart meditation, and apostolic decrees from Apostle Oluwafunminiyi Olufisayo.',
    images: ['/daily_cards/day_01_card.png'],
  },
};

export default function DevotionalPage() {
  return (
    <>
      <PageHeader
        eyebrow={`Daily Prophetic Word · ${DEVOTIONAL_THEME}`}
        title="Daily Devotional"
        highlight="& Apostolic Decree"
        intro="Start every morning with the undiluted Word of God, heart-searching meditation, and prophetic decrees from Apostle Oluwafunminiyi Olufisayo, Setman of Christ The Potter Church."
        image="/images/setman.jpg"
        imageAlt="Apostle Oluwafunminiyi Olufisayo"
      >
        <Button variant="solid" href="#reader">
          <BookOpen size={15} />
          Read Today&apos;s Devotional
        </Button>
        <Button variant="outlineLight" href={DEVOTIONAL_PDF_URL} external>
          <Download size={15} />
          Download 31-Day Booklet (PDF)
        </Button>
      </PageHeader>

      <DevotionalReader />

      <DevotionalArchiveGrid />

      <CtaBand
        eyebrow="Walk in the Reality of Christ"
        title="Need Prayer or Spiritual Counsel Today?"
        body="Our pastoral and intercessory team stands ready to agree with you in prayer as you step into your divine blueprint."
        primary={{ label: 'Send a Prayer Request', href: '/salvation#prayer' }}
        secondary={{ label: 'Listen to Audio Sermons', href: '/sermons' }}
      />
    </>
  );
}


import { ArrowLeft, Download } from 'lucide-react';
import PageHeader from '../../../components/ui/PageHeader';
import Button from '../../../components/ui/Button';
import CtaBand from '../../../components/ui/CtaBand';
import DevotionalReader from '../../../components/devotional/DevotionalReader';
import DevotionalArchiveGrid from '../../../components/devotional/DevotionalArchiveGrid';
import {
  getAllDevotionals,
  getDevotionalBySlug,
  DEVOTIONAL_THEME,
  DEVOTIONAL_AUTHOR,
  DEVOTIONAL_PDF_URL,
} from '../../../lib/devotional';

export function generateStaticParams() {
  return getAllDevotionals().map((item) => ({
    day: item.slug,
  }));
}

export function generateMetadata({ params }) {
  const devotional = getDevotionalBySlug(params.day);
  return {
    title: `${devotional.dayFormatted}: ${devotional.title} | CPC Daily Devotional`,
    description: `"${devotional.anchorVerse}" (${devotional.anchorScripture}) — Today's Apostolic Decree: ${devotional.prayer}`,
    openGraph: {
      title: `${devotional.dayFormatted}: ${devotional.title} — ${DEVOTIONAL_AUTHOR}`,
      description: `Anchor: ${devotional.anchorScripture} | Apostolic Decree: "${devotional.prayer}"`,
      images: [devotional.cardImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${devotional.dayFormatted}: ${devotional.title}`,
      description: devotional.prayer,
      images: [devotional.cardImage],
    },
  };
}

export default function SingleDayDevotionalPage({ params }) {
  const devotional = getDevotionalBySlug(params.day);

  return (
    <>
      <PageHeader
        eyebrow={`${DEVOTIONAL_THEME} · ${devotional.dayFormatted} (${devotional.date})`}
        title={devotional.title}
        intro={`Anchor Scripture: ${devotional.anchorScripture} — "${devotional.anchorVerse}"`}
        image="/images/setman.jpg"
        imageAlt={DEVOTIONAL_AUTHOR}
      >
        <Button variant="solid" href="/devotional">
          <ArrowLeft size={15} />
          All 31 Days Hub
        </Button>
        <Button variant="outlineLight" href={DEVOTIONAL_PDF_URL} external>
          <Download size={15} />
          Download Full 31-Day PDF
        </Button>
      </PageHeader>

      <DevotionalReader initialDay={devotional.day} />

      <DevotionalArchiveGrid />

      <CtaBand
        eyebrow="Christ The Potter Church"
        title="Share Your Testimony of What God Is Doing"
        body="Has today's prophetic word or apostolic decree blessed your life? Let the church rejoice with you or stand with you in prayer."
        primary={{ label: 'Share a Testimony', href: '/salvation#testimony' }}
        secondary={{ label: 'Plan a Visit to CPC', href: '/plan-a-visit' }}
      />
    </>
  );
}


import { ArrowLeft, Radio, Phone } from 'lucide-react';
import PageHeader from '../../../components/ui/PageHeader';
import Button from '../../../components/ui/Button';
import CtaBand from '../../../components/ui/CtaBand';
import SchemaOrg from '../../../components/seo/SchemaOrg';
import SermonDetailClient from '../../../components/sermons/SermonDetailClient';
import {
  getAllSermons,
  getSermonBySlug,
  getRelatedSermons,
} from '../../../lib/sermons';
import { CHURCH, SOCIAL_LINKS } from '../../../lib/site-config';
import { getSingleSermonJsonLd } from '../../../lib/seo';

export function generateStaticParams() {
  return getAllSermons().map((sermon) => ({
    slug: sermon.id,
  }));
}

export function generateMetadata({ params }) {
  const sermon = getSermonBySlug(params.slug);
  const takeaway = sermon.keyTakeaways?.[0] || sermon.description;

  return {
    title: `${sermon.title} — ${sermon.minister} | CPC Sermon & Study Notes`,
    description: `${sermon.description} Anchor Scripture: ${sermon.scripture} (${sermon.series} · ${sermon.duration}). Listen to MP3 audio and read full apostolic study notes.`,
    openGraph: {
      title: `${sermon.title} — ${sermon.minister}`,
      description: `Scripture: ${sermon.scripture} | "${takeaway}"`,
      images: ['/images/setman.jpg'],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${sermon.title} | Christ The Potter Church`,
      description: `${sermon.minister} · ${sermon.scripture} · ${sermon.duration}`,
      images: ['/images/setman.jpg'],
    },
  };
}

export default function SingleSermonPage({ params }) {
  const sermon = getSermonBySlug(params.slug);
  const relatedSermons = getRelatedSermons(sermon, 3);
  const schemaData = getSingleSermonJsonLd(sermon);

  return (
    <>
      <SchemaOrg data={schemaData} />

      <PageHeader
        eyebrow={`${sermon.category} · ${sermon.series} (${sermon.occasion})`}
        title={sermon.title}
        intro={`${sermon.description} — Anchor Scripture: ${sermon.scripture} (${sermon.duration}).`}
        image="/images/setman.jpg"
        imageAlt={sermon.minister}
      >
        <Button variant="solid" href="/sermons">
          <ArrowLeft size={15} />
          All Sermons Archive
        </Button>
        <Button variant="outlineLight" href={SOCIAL_LINKS.mixlr} external>
          <Radio size={15} />
          Live Mixlr Stream
        </Button>
      </PageHeader>

      <SermonDetailClient sermon={sermon} relatedSermons={relatedSermons} />

      <CtaBand
        eyebrow="CPC Media Stand & Discipleship"
        title="Has This Message Blessed Your Spirit?"
        body="Share your testimony, submit a prayer request, or order complete conference audio series from the Christ The Potter Church Media Stand."
        primary={{ label: 'Share Testimony / Prayer', href: '/salvation#prayer' }}
        secondary={{ label: `Call Media Desk · ${CHURCH.phone}`, href: CHURCH.phoneHref }}
      />
    </>
  );
}


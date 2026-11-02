import Hero from '../components/home/Hero';
import ServiceTimes from '../components/home/ServiceTimes';
import DailyDevotional from '../components/home/DailyDevotional';
import Mandate from '../components/home/Mandate';
import SetMan from '../components/home/SetMan';
import LiveBroadcastSection from '../components/home/LiveBroadcastSection';
import LatestSermons from '../components/home/LatestSermons';
import TestimoniesSection from '../components/home/TestimoniesSection';
import Giving from '../components/home/Giving';
import PrayerCta from '../components/home/PrayerCta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceTimes />
      <DailyDevotional />
      <Mandate />
      <SetMan />
      <LiveBroadcastSection />
      <LatestSermons />
      <TestimoniesSection />
      <Giving />
      <PrayerCta />
    </>
  );
}

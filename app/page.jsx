import Hero from '../components/home/Hero';
import ServiceTimes from '../components/home/ServiceTimes';
import WhatsHappening from '../components/home/WhatsHappening';
import Conferences from '../components/home/Conferences';
import Mandate from '../components/home/Mandate';
import SetMan from '../components/home/SetMan';
import LatestSermons from '../components/home/LatestSermons';
import Giving from '../components/home/Giving';
import PrayerCta from '../components/home/PrayerCta';

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServiceTimes />
      <WhatsHappening />
      <Conferences />
      <Mandate />
      <SetMan />
      <LatestSermons />
      <Giving />
      <PrayerCta />
    </>
  );
}

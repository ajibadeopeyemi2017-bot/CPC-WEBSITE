import { CHURCH, SERVICE_SCHEDULE, SOCIAL_LINKS, BANK_ACCOUNTS } from './site-config';
import { SERMONS } from './sermons';

/**
 * Schema.org JSON-LD structured data for Christ The Potter Church (CPC)
 * Compliant with Google Search Rich Results guidelines for Church & PlaceOfWorship
 */
export function getChurchJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Church',
    '@id': `${CHURCH.siteUrl}/#church`,
    name: CHURCH.name,
    alternateName: [
      CHURCH.shortName,
      'CPC Ile-Ife',
      'Christ The Potter Church Ile-Ife',
      'Oluwafunminiyi Samson Olufisayo Ministries',
      'OSOM Ministries',
    ],
    url: CHURCH.siteUrl,
    logo: `${CHURCH.siteUrl}/images/logo.png`,
    image: [
      `${CHURCH.siteUrl}/images/pastor-portrait.jpg`,
      `${CHURCH.siteUrl}/images/pastor-action.jpg`,
      `${CHURCH.siteUrl}/images/service-schedule-banner.jpg`,
    ],
    description: CHURCH.tagline,
    telephone: CHURCH.phone,
    email: CHURCH.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '76B, PHCN Office (Upper Floor), Off Fajuyi Road',
      addressLocality: 'Ile-Ife',
      addressRegion: 'Osun State',
      addressCountry: 'NG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 7.4816,
      longitude: 4.5458,
    },
    founder: {
      '@type': 'Person',
      name: 'Apostle Oluwafunminiyi Olufisayo',
      jobTitle: 'Lead Pastor & Apostolic Set-Man',
      image: `${CHURCH.siteUrl}/images/pastor-portrait.jpg`,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '08:00',
        closes: '11:30',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Tuesday',
        opens: '17:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Thursday',
        opens: '17:00',
        closes: '19:00',
      },
    ],
    sameAs: [
      SOCIAL_LINKS.facebook,
      SOCIAL_LINKS.mixlr,
      SOCIAL_LINKS.whatsapp,
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Church Ministries & Schools',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Kingdom Youths & Ministers Conference (KYMC)',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Apostolic Gathering of The Eagles (AGOTE)',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Realised Destiny Summit (RDS)',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Revelation of Our Salvation Summit (ROS)',
          },
        },
      ],
    },
  };
}

/**
 * Schema.org JSON-LD for Recurring Weekly Services
 */
export function getServiceEventsJsonLd() {
  return SERVICE_SCHEDULE.map((service) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: service.name,
    description: service.description,
    eventSchedule: {
      '@type': 'Schedule',
      byDay: service.day === 0 ? 'Sunday' : service.day === 2 ? 'Tuesday' : 'Thursday',
      startTime: `${String(service.hour).padStart(2, '0')}:${String(service.minute).padStart(2, '0')}:00`,
      endTime: `${String(service.liveEndHour).padStart(2, '0')}:${String(service.liveEndMinute).padStart(2, '0')}:00`,
      scheduleTimezone: 'Africa/Lagos',
    },
    location: {
      '@type': 'Place',
      name: 'Church Auditorium, Christ The Potter Church',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '76B, PHCN Office (Upper Floor), Off Fajuyi Road',
        addressLocality: 'Ile-Ife',
        addressRegion: 'Osun State',
        addressCountry: 'NG',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: CHURCH.name,
      url: CHURCH.siteUrl,
    },
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
  }));
}

/**
 * Schema.org JSON-LD for Audio Sermons
 * Allows Google Search & Google Podcasts to index apostolic teachings
 */
export function getSermonsJsonLd(sermonList = SERMONS) {
  return sermonList.slice(0, 10).map((sermon) => ({
    '@context': 'https://schema.org',
    '@type': 'AudioObject',
    name: sermon.title,
    description: sermon.description,
    author: {
      '@type': 'Person',
      name: sermon.minister,
    },
    publisher: {
      '@type': 'Organization',
      name: CHURCH.name,
      url: CHURCH.siteUrl,
    },
    inLanguage: 'en',
    contentUrl: sermon.audioUrl || `${CHURCH.siteUrl}/sermons#${sermon.id}`,
    encodingFormat: 'audio/mpeg',
    about: {
      '@type': 'Thing',
      name: sermon.series || sermon.category,
    },
  }));
}

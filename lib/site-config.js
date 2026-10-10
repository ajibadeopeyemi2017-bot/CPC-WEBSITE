// Central source of truth for facts that repeat across pages/components:
// phone number, address, service times, social links. Edit here once
// instead of hunting through every page when a detail changes.

export const CHURCH = {
  name: 'Christ The Potter Church',
  shortName: 'Christ The Potter',
  tagline: 'Teaching men to walk in the reality of who Christ is.',
  leadership: 'Apostle & Rev. (Mrs) Oluwafunminiyi Olufisayo',
  ministryArm: 'Oluwafunminiyi Samson Olufisayo Ministries (OSOM)',
  phone: '0814 863 7261',
  phoneHref: 'tel:08148637261',
  email: 'christthepotterchurch@gmail.com',
  address: {
    venue: 'Church Auditorium',
    full: '76B, PHCN Office (Upper Floor), Off Fajuyi Road, Ile-Ife, Osun State, Nigeria',
    short: '76B, PHCN Office (Upper Floor), Off Fajuyi Road, Ile-Ife',
  },
};

// day: 0 = Sunday, 2 = Tuesday, 4 = Thursday (matches Date#getDay()).
// liveEndHour/liveEndMinute mark when a service's live broadcast is
// considered over, for the "currently live" check in LiveCountdown.
export const SERVICE_SCHEDULE = [
  {
    id: 'sunday',
    day: 0,
    name: 'Sunday Worship Service',
    shortName: 'Sunday Service',
    time: '8:00 AM',
    hour: 8,
    minute: 0,
    liveEndHour: 11,
    liveEndMinute: 30,
    description: 'Celebration, Word, Praise & Supernatural Impartation',
    accentColor: '#d4af37',
  },
  {
    id: 'tuesday',
    day: 2,
    name: 'Tuesday: School of Prayer',
    shortName: 'School of Prayer',
    time: '5:00 PM',
    hour: 17,
    minute: 0,
    liveEndHour: 19,
    liveEndMinute: 0,
    description: 'Intercession, Spiritual Warfare, Deliverance',
    accentColor: '#159b56',
  },
  {
    id: 'thursday',
    day: 4,
    name: 'Thursday: Revelational Hour',
    shortName: 'Revelational Hour',
    time: '5:00 PM',
    hour: 17,
    minute: 0,
    liveEndHour: 19,
    liveEndMinute: 0,
    description: 'Deep Apostolic Doctrine & Systematic Exegesis',
    accentColor: '#60a5fa',
  },
];

export const BANK_ACCOUNTS = [
  {
    purpose: 'Church Tithes, General Offerings & Mission Offerings',
    bank: 'Zenith Bank',
    accountNumber: '1220867697',
    accountName: 'Christ the potter church',
  },
  {
    purpose: 'OSOM Partnership, Conferences & Ministry Mandate',
    bank: 'Zenith Bank',
    accountNumber: '1220867707',
    accountName: 'Oluwafunminiyi Samson Olufisayo ministries',
  },
];

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com/christthepotterchurch',
  mixlr: 'https://mixlr.com/christ-the-potter-church',
};

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Who We Are', href: '/about' },
  { name: "I'm New", href: '/plan-a-visit' },
  { name: 'Sermons', href: '/sermons' },
  { name: 'Connect', href: '/connect' },
  { name: 'Salvation & Prayer', href: '/salvation' },
];

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
  whatsappNumbers: [
    { number: '2347062709694', display: '0706 270 9694', raw: '07062709694' },
    { number: '2348163776464', display: '0816 377 6464', raw: '08163776464' },
  ],
  whatsapp: '2347062709694',
  whatsappAlt: '2348163776464',
  whatsappHref: 'https://wa.me/2347062709694',
  whatsappAltHref: 'https://wa.me/2348163776464',
  email: 'christthepotterchurch@gmail.com',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://christthepotterchurch.org',
  address: {
    venue: 'Church Auditorium',
    full: '76B, PHCN Office (Upper Floor), Off Fajuyi Road, Ile-Ife, Osun State, Nigeria',
    short: '76B, PHCN Office (Upper Floor), Off Fajuyi Road, Ile-Ife',
    landmark: 'Look for the PHCN Office gate along Fajuyi Road with the large CPC banner.',
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=PHCN+Office+Off+Fajuyi+Road+Ile-Ife+Osun+State+Nigeria',
  mapsEmbedUrl: 'https://maps.google.com/maps?q=PHCN+Office+Off+Fajuyi+Road+Ile-Ife+Nigeria&t=&z=16&ie=UTF8&iwloc=&output=embed',
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
  mixlrEmbed: 'https://mixlr.com/users/christ-the-potter-church/embed',
  mixlrChannel: 'christ-the-potter-church',
  whatsapp: 'https://wa.me/2347062709694',
  whatsappAlt: 'https://wa.me/2348163776464',
};

export const NAV_LINKS = [
  {
    name: 'Home',
    href: '/',
    caption: 'Welcome to Christ The Potter Church, Ile-Ife',
    sublinks: [
      { title: 'The Mandate', desc: 'Teaching Men to Walk in the Reality of Christ', href: '/#mandate' },
      { title: 'Our Set Man', desc: 'Apostle & Rev. (Mrs) Oluwafunminiyi Olufisayo', href: '/#setman' },
      { title: 'Conferences & Schools', desc: 'Flagship gatherings across the nation', href: '/#conferences' },
      { title: 'Latest Messages', desc: 'Pulpit audio archive and fresh spiritual food', href: '/#messages' },
      { title: 'Worship Schedule', desc: 'Sundays 8:00 AM & midweek revelation hours', href: '/#services' },
    ],
  },
  {
    name: 'About Us',
    href: '/about',
    caption: 'Our apostolic commission, leadership, and mandate',
    sublinks: [
      { title: 'The Calling', desc: 'The divine commission given to Apostle Olufisayo', href: '/about#calling' },
      { title: 'Our DNA & Values', desc: 'Prayer altar, consecration and sound doctrine', href: '/about#values' },
      { title: 'Pastoral Leadership', desc: 'Apostle Oluwafunminiyi & Rev. Mrs Olufisayo', href: '/about#leadership' },
      { title: 'OSOM Ministries', desc: 'Apostolic mission arm reaching nations', href: '/about#osom' },
      { title: 'What We Believe', desc: 'Scriptural foundation and statement of faith', href: '/about#faith' },
    ],
  },
  {
    name: "I'm Visiting",
    href: '/plan-a-visit',
    caption: 'Everything you need to know for your first visit',
    sublinks: [
      { title: 'What to Expect', desc: 'Arrival, worship, dynamic Word & warm reception', href: '/plan-a-visit#expectations' },
      { title: 'Service Times', desc: 'Sundays 8:00 AM, Tuesdays & Thursdays 5:00 PM', href: '/plan-a-visit#schedule' },
      { title: 'Potter’s Kids Church', desc: 'Safe, engaging Bible ministry for children', href: '/plan-a-visit#kids' },
      { title: 'Location & Map', desc: 'PHCN Office (Upper Floor), Off Fajuyi Rd, Ile-Ife', href: '/plan-a-visit#directions' },
      { title: 'Plan Your Visit', desc: 'Reserve a host and receive VIP guest reception', href: '/plan-a-visit#reserve' },
      { title: 'Guest FAQs', desc: 'Parking, dress code, and what to bring', href: '/plan-a-visit#faqs' },
    ],
  },
  {
    name: 'Sermons',
    href: '/sermons',
    caption: 'Pulpit audio archive & transformative messages',
    sublinks: [
      { title: 'Featured Message', desc: 'Stream recent sermons and deep apostolic doctrine', href: '/sermons#featured' },
      { title: 'Audio Library', desc: 'Search and filter messages by scripture and topic', href: '/sermons#library' },
      { title: 'Teaching Series', desc: 'Divine Help, Surrendered Life & Prayer School', href: '/sermons#series' },
      { title: 'Live Mixlr Stream', desc: 'Tune into live broadcasts during service hours', href: '/sermons#live' },
      { title: 'Saved & Bookmarks', desc: 'Track your listening progress and bookmarks', href: '/sermons#bookmarks' },
    ],
  },
  {
    name: 'Connect',
    href: '/connect',
    caption: 'Conferences, schools, ministries & serving teams',
    sublinks: [
      { title: 'National Conferences', desc: 'KYMC, ROS, AGOTE, RDS & City Outreaches', href: '/connect#conferences' },
      { title: 'AMITES Ministers’ School', desc: 'Intensive ministerial coaching & grooming', href: '/connect#amites' },
      { title: 'Register for Conferences', desc: 'Online form with direct WhatsApp delivery', href: '/connect#conferences' },
      { title: 'Ministry Departments', desc: 'Choir, Protocol, Media, Ushers & Intercessors', href: '/connect#ministries' },
      { title: 'Volunteer Application', desc: 'Offer your gifts and labour in God’s vineyard', href: '/connect#serve' },
    ],
  },
  {
    name: 'Salvation & Prayer',
    href: '/salvation',
    caption: 'Encounter Christ, receive prayer & share testimonies',
    sublinks: [
      { title: 'The Gift of Salvation', desc: 'Begin your journey of faith and new life in Christ', href: '/salvation#salvation' },
      { title: 'Next Steps in God', desc: 'Baptism, discipleship, prayer & church fellowship', href: '/salvation#steps' },
      { title: 'Submit Prayer Request', desc: 'Pastoral agreement & confidential intercession', href: '/salvation#prayer' },
      { title: 'Share a Testimony', desc: 'Give glory to God for answered prayers and miracles', href: '/salvation#testimony' },
      { title: 'Pastoral Helpdesk', desc: 'Call 0814 863 7261 or WhatsApp our ministers', href: '/salvation#counseling' },
    ],
  },
];

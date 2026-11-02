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
  phoneAlt: '0803 725 2124',
  phoneAltHref: 'tel:08037252124',
  whatsappNumbers: [
    { number: '2347062709694', display: '0706 270 9694', raw: '07062709694' },
    { number: '2348163776464', display: '0816 377 6464', raw: '08163776464' },
  ],
  whatsapp: '2347062709694',
  whatsappAlt: '2348163776464',
  whatsappHref: 'https://wa.me/2347062709694',
  whatsappAltHref: 'https://wa.me/2348163776464',
  email: 'christthepotterchurch@gmail.com',
  emailAlt: 'info@potterchurch.org',
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
  facebookLive: 'https://facebook.com/christthepotterchurch/live',
  facebookPagePlugin:
    'https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fchristthepotterchurch&tabs=timeline%2Cevents%2Cmessages&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true',
  youtube: 'https://www.youtube.com/@christthepotterchurch',
  mixlr: 'https://mixlr.com/christ-the-potter-church',
  mixlrEmbed: 'https://mixlr.com/users/christ-the-potter-church/embed',
  mixlrChannel: 'christ-the-potter-church',
  whatsapp: 'https://wa.me/2347062709694',
  whatsappAlt: 'https://wa.me/2348163776464',
};

export const FEATURED_VIDEOS = [
  {
    id: 'kymc-ministers-charge',
    title: 'The Man That God Can Work With 2.0 (KYMC Special)',
    minister: 'Apostle Oluwafunminiyi Olufisayo',
    category: 'KYMC Conference',
    duration: '1h 45m',
    scripture: '2 Timothy 2:20–21; Isaiah 66:2',
    thumbnail: '/images/pastor-action.jpg',
    sermonSlug: 'man-god-works-with',
    summary:
      'An apostolic charge on brokenness, purging, and trembling at God\'s Word as the non-negotiable qualification for kingdom vessels.',
  },
  {
    id: 'divine-help-session',
    title: 'Cultivating the Habit of Seeking & Receiving Divine Help',
    minister: 'Apostle Oluwafunminiyi Olufisayo',
    category: 'Sunday Service',
    duration: '1h 22m',
    scripture: 'Hebrews 4:16; 2 Chronicles 26:15',
    thumbnail: '/images/setman.jpg',
    sermonSlug: 'divine-help',
    summary:
      'Discover how to approach the Throne of Grace boldly to obtain mercy and find supernatural help in critical seasons of destiny.',
  },
  {
    id: 'rds-running-the-race',
    title: 'Running the Race That Is Set Before You (RDS Summit)',
    minister: 'Apostle Oluwafunminiyi Olufisayo',
    category: 'Realised Destiny Summit',
    duration: '1h 35m',
    scripture: 'Hebrews 12:1–2; 2 Timothy 2:5',
    thumbnail: '/images/pastor-portrait.jpg',
    sermonSlug: 'running-the-race',
    summary:
      'Why running fast in another man\'s lane leads to disqualification, and how to strip off every weight to finish your assigned course.',
  },
];

export const NAV_LINKS = [
  {
    name: 'Home',
    href: '/',
    caption: 'Welcome to Christ The Potter Church, Ile-Ife',
    sublinks: [
      { title: 'Live Broadcast', href: '/live' },
      { title: 'Today\'s Devotional', href: '/#devotional' },
      { title: 'The Mandate', href: '/#mandate' },
      { title: 'Our Set Man', href: '/#setman' },
      { title: 'Latest Messages', href: '/#messages' },
      { title: 'Testimonies', href: '/#testimonies' },
    ],
  },
  {
    name: 'About Us',
    href: '/about',
    caption: 'Our apostolic commission, leadership, and mandate',
    sublinks: [
      { title: 'The Calling', href: '/about#calling' },
      { title: 'Our DNA & Values', href: '/about#values' },
      { title: 'Pastoral Leadership', href: '/about#leadership' },
      { title: 'OSOM Ministries', href: '/about#osom' },
      { title: 'What We Believe', href: '/about#faith' },
    ],
  },
  {
    name: 'Devotional',
    href: '/devotional',
    caption: 'Daily prophetic word, scripture diet & apostolic decrees',
    sublinks: [
      { title: 'Today\'s Reading', href: '/devotional#reader' },
      { title: 'Apostolic Decree', href: '/devotional#reader' },
      { title: '31-Day Archive', href: '/devotional#archive' },
      { title: 'Download 31-Day PDF', href: '/CPC_Daily_Devotional.pdf' },
    ],
  },
  {
    name: 'Live Stream',
    href: '/live',
    caption: 'Join live video & Mixlr audio broadcasts from Ile-Ife',
    sublinks: [
      { title: 'Watch Live Video', href: '/live#sanctuary' },
      { title: 'Mixlr Audio Stream', href: '/live#sanctuary' },
      { title: 'Online Altar & Prayer', href: '/live#sanctuary' },
      { title: 'Video Highlights', href: '/live#highlights' },
    ],
  },
  {
    name: "I'm Visiting",
    href: '/plan-a-visit',
    caption: 'Everything you need to know for your first visit',
    sublinks: [
      { title: 'Plan Your Visit', href: '/plan-a-visit#reserve' },
      { title: 'Ile-Ife Transit Guide', href: '/plan-a-visit#transit' },
      { title: 'What to Expect', href: '/plan-a-visit#expectations' },
      { title: 'Service Times', href: '/plan-a-visit#schedule' },
      { title: 'Kids Church', href: '/plan-a-visit#kids' },
      { title: 'Guest FAQs', href: '/plan-a-visit#faqs' },
    ],
  },
  {
    name: 'Sermons',
    href: '/sermons',
    caption: 'Pulpit audio archive & transformative messages',
    sublinks: [
      { title: 'Featured Message', href: '/sermons#featured' },
      { title: 'Audio Library', href: '/sermons#library' },
      { title: 'Teaching Series', href: '/sermons#series' },
      { title: 'Online Sanctuary', href: '/live' },
      { title: 'Saved Messages', href: '/sermons#bookmarks' },
    ],
  },
  {
    name: 'Connect',
    href: '/connect',
    caption: 'Conferences, schools, ministries & serving teams',
    sublinks: [
      { title: 'Conferences & Summits', href: '/connect#conferences' },
      { title: "Potter's Family Units", href: '/connect#fellowships' },
      { title: 'AMITES School', href: '/connect#amites' },
      { title: 'Ministry Teams', href: '/connect#ministries' },
      { title: 'Volunteer Form', href: '/connect#serve' },
    ],
  },
  {
    name: 'Salvation & Prayer',
    href: '/salvation',
    caption: 'Encounter Christ, receive prayer & share testimonies',
    sublinks: [
      { title: 'Salvation in Christ', href: '/salvation#salvation' },
      { title: 'Next Steps of Faith', href: '/salvation#steps' },
      { title: 'Prayer Request', href: '/salvation#prayer' },
      { title: 'Share Testimony', href: '/salvation#testimony' },
      { title: 'Pastoral Desk', href: '/salvation#counseling' },
    ],
  },
];

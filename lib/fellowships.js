// ============================================================================
// Christ The Potter Church — Ile-Ife Transit Guide & Potter's Family Units
// Main Auditorium: 76B, PHCN Office (Upper Floor), Off Fajuyi Road, Ile-Ife
// ============================================================================

export const ILE_IFE_TRANSIT_ROUTES = [
  {
    id: 'oau-campus',
    origin: 'OAU Campus Gate / Ede Road / Asherifa',
    travelTime: '8 – 12 mins',
    transportMode: 'Korope (Mini-Bus), Taxi, or Personal Car',
    dropOffStop: 'PHCN Office Gate along Fajuyi Road',
    steps: [
      'Board a town bus (Korope) or cab from OAU Campus Gate heading toward Mayfair and Lagere.',
      'From Lagere junction, connect straight onto Fajuyi Road (towards Enuwa / Sabo axis).',
      'Alight at 76B, PHCN Office along Fajuyi Road — look out for the large Christ The Potter Church banner at the gate and proceed to the Upper Floor auditorium.',
    ],
    tip: 'Coming with fellow students? Message our Protocol Desk on WhatsApp 30 minutes before service for campus coordination.',
  },
  {
    id: 'mayfair-parakin',
    origin: 'Mayfair / Parakin / Damico / Hilton Axis',
    travelTime: '5 – 8 mins',
    transportMode: 'Bus, Bike (Okada), or 8-minute Drive',
    dropOffStop: 'PHCN Office, Off Fajuyi Road',
    steps: [
      'From Mayfair Roundabout or Parakin junction, head straight down toward Lagere.',
      'Turn onto Fajuyi Road from the Lagere intersection.',
      'Locate the PHCN Office compound (76B) — our protocol marshals in CPC badges will welcome you at the gate.',
    ],
    tip: 'Parking is available and secure inside the PHCN Office premises for those driving.',
  },
  {
    id: 'lagere-sabo-enuwa',
    origin: 'Lagere / Sabo / Enuwa / Ooni Palace Axis',
    travelTime: '3 – 5 mins',
    transportMode: 'Short Walk, Bike, or Taxi',
    dropOffStop: '76B, PHCN Office, Fajuyi Road',
    steps: [
      'From Lagere or Enuwa, take Fajuyi Road directly.',
      'The church auditorium is on the Upper Floor of the 76B PHCN Office building right off Fajuyi Road.',
      'Our ushers are stationed at the entrance gate from 7:30 AM on Sundays and 4:30 PM on Tuesdays & Thursdays.',
    ],
    tip: 'If you are within central Lagere or Fajuyi Road, you are less than 5 minutes away from the auditorium.',
  },
  {
    id: 'oauthc-eleyele-moore',
    origin: 'OAUTHC (Phase 1 & 2) / Eleyele / Moore / Kojumole',
    travelTime: '7 – 10 mins',
    transportMode: 'Taxi, Bus, or Bike',
    dropOffStop: 'PHCN Office along Fajuyi Road',
    steps: [
      'From OAUTHC Hospital Gate, Moore, or Eleyele, take a cab or bike heading toward Sabo / Fajuyi Road.',
      'Ask the driver or rider to stop at the PHCN Office (76B) along Fajuyi Road.',
      'Walk into the compound and take the stairs to the Upper Floor Main Auditorium.',
    ],
    tip: 'Medical students and hospital staff on shift can also tune in live via our low-data Mixlr stream when on call.',
  },
  {
    id: 'iloro-ondo-road',
    origin: 'Iloro / Esindale / Ondo Road / Modakeke Axis',
    travelTime: '8 – 12 mins',
    transportMode: 'Town Bus, Bike, or Personal Car',
    dropOffStop: 'PHCN Office, Off Fajuyi Road',
    steps: [
      'From Iloro, Esindale (venue of our city outreach), or Ondo Road, head toward Lagere / Fajuyi Road.',
      'Connect to Fajuyi Road and stop at 76B PHCN Office.',
      'Look for the Christ The Potter Church directional banners at the entrance.',
    ],
    tip: 'Call our morning protocol helpline on 0814 863 7261 if your driver needs live verbal landmarks.',
  },
  {
    id: 'intercity-ibadan-osogbo',
    origin: 'Inter-City Guests (Ibadan, Osogbo, Akure, Lagos)',
    travelTime: '10 mins from Ife Toll Gate',
    transportMode: 'Inter-State Bus or Private Vehicle',
    dropOffStop: 'Mayfair or Lagere -> Fajuyi Road (PHCN Office)',
    steps: [
      'Entering Ile-Ife via the Ibadan-Ife Expressway: pass OAU Campus Gate and drive straight through Mayfair to Lagere.',
      'From Lagere, turn onto Fajuyi Road to 76B PHCN Office (Upper Floor).',
      'Attending KYMC, AGOTE, RDS, or ROS conferences? Contact the Protocol Desk ahead of arrival for accommodation and guest logistics.',
    ],
    tip: 'We host ministers and conference delegates from across Nigeria — reach out on WhatsApp before travelling.',
  },
];

export const FELLOWSHIP_CENTERS = [
  {
    id: 'fajuyi-central',
    name: 'Fajuyi & Enuwa Central Family Unit',
    zone: 'Central Ile-Ife',
    areasCovered: ['Fajuyi Road', 'Lagere', 'Sabo', 'Enuwa', 'Akarabata'],
    meetingTime: 'Alternate Fridays · 5:00 PM',
    venue: 'Main Auditorium & Designated Central Homes along Fajuyi / Lagere',
    coordinator: 'Central Pastoral Team',
    focus: 'Word Review, Prayer Watches & Member Care',
  },
  {
    id: 'mayfair-parakin',
    name: 'Mayfair, Parakin & Damico Family Unit',
    zone: 'Mayfair / Parakin Axis',
    areasCovered: ['Mayfair', 'Parakin', 'Damico', 'Hilton', 'AP Junction'],
    meetingTime: 'Alternate Fridays · 5:00 PM',
    venue: 'Mayfair / Parakin Fellowship Center',
    coordinator: 'Zone Fellowship Leader',
    focus: 'Discipleship, Career/Business Prayer & Brotherhood',
  },
  {
    id: 'oau-campus-ede-rd',
    name: 'Kingdom Youths & Campus Fellowship (OAU / Ede Road)',
    zone: 'Campus & Ede Road Axis',
    areasCovered: ['OAU Campus', 'Asherifa', 'Ede Road', 'Oduduwa Estate', 'Maintenance'],
    meetingTime: 'Weekends & Campus Prayer Cells',
    venue: 'Campus & Ede Road Fellowship Hub',
    coordinator: 'Youth & Campus Directorate',
    focus: 'Revival Fire, Academic Excellence & Purpose Alignment',
  },
  {
    id: 'oauthc-eleyele-moore',
    name: 'Eleyele, Moore & OAUTHC Family Unit',
    zone: 'Eleyele / Hospital Axis',
    areasCovered: ['Eleyele', 'OAUTHC Phase 1 & 2', 'Moore', 'Fajuyi Ext.', 'Ilare'],
    meetingTime: 'Alternate Fridays · 5:00 PM',
    venue: 'Eleyele / OAUTHC Zone Home Cell',
    coordinator: 'Zone Pastoral Representative',
    focus: 'Scripture Exegesis, Family Intercession & Fellowship',
  },
  {
    id: 'iloro-esindale-ondo',
    name: 'Iloro, Esindale & Ondo Road Family Unit',
    zone: 'Iloro / Ondo Road Axis',
    areasCovered: ['Iloro', 'Esindale Line 1 & 2', 'Ondo Road', 'Opa', 'Arubidi'],
    meetingTime: 'Alternate Fridays · 5:00 PM',
    venue: 'Iloro / Esindale Fellowship Center',
    coordinator: 'Outreach & Zone Coordinator',
    focus: 'Evangelism Follow-up, New Believer Foundation & Prayer',
  },
  {
    id: 'online-diaspora',
    name: 'OSOM Online & Diaspora Family Unit',
    zone: 'Global / Outside Ile-Ife',
    areasCovered: ['Lagos', 'Abuja', 'Ibadan', 'Port Harcourt', 'UK / USA / Diaspora'],
    meetingTime: 'Weekly Online Prayer & Word Sync',
    venue: 'WhatsApp Community, Mixlr & Online Sanctuary',
    coordinator: 'OSOM Partnership & Online Pastorate',
    focus: 'Apostolic Covering, Daily Devotional Accountability & Intercession',
  },
];


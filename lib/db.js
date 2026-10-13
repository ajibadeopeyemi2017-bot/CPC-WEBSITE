import fs from 'fs';
import path from 'path';

/**
 * Church Database & Persistence Layer for Christ The Potter Church
 * Provides storage for visitors, prayer requests, testimonies, volunteers, and donations.
 */

const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'store.json');

// Initial seed data for a rich, out-of-the-box experience
const DEFAULT_STORE = {
  visitors: [
    {
      id: 'v-101',
      name: 'Adewale Adeleke',
      phone: '0803 456 7890',
      email: 'adewale.a@gmail.com',
      serviceDate: 'Upcoming Sunday (8:00 AM)',
      attendeeCount: '2 people',
      hasKids: 'Yes',
      kidAges: '5 and 8',
      specialAssistance: 'First time in Ile-Ife, needs parking guidance',
      status: 'confirmed',
      createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    },
    {
      id: 'v-102',
      name: 'Dr. (Mrs) Folashade Balogun',
      phone: '0814 112 3344',
      email: 'folashade.b@yahoo.com',
      serviceDate: 'Tuesday School of Prayer (5:00 PM)',
      attendeeCount: '1 person (just me)',
      hasKids: 'No',
      kidAges: '',
      specialAssistance: 'Looking for pastoral counseling after service',
      status: 'pending',
      createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString(),
    },
  ],
  prayers: [
    {
      id: 'p-1',
      name: 'Sister Mary O.',
      phone: '0802 334 5566',
      email: 'mary.o@outlook.com',
      category: 'Family & Marriage Peace',
      isConfidential: false,
      details: 'Please stand in agreement with me for divine peace, godly restoration, and wisdom in my marriage.',
      amens: 36,
      status: 'prayed',
      createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    },
    {
      id: 'p-2',
      name: 'Brother Emmanuel K.',
      phone: '0816 778 9900',
      email: 'emmanuel.k@gmail.com',
      category: 'Academic & Career Breakthrough',
      isConfidential: false,
      details: 'Praying for divine favour and open doors in my final examinations and post-graduate fellowship.',
      amens: 29,
      status: 'new',
      createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    },
    {
      id: 'p-3',
      name: 'Anonymous Believer',
      phone: '',
      email: '',
      category: 'Spiritual Growth & Fire',
      isConfidential: false,
      details: 'Desiring a fresh baptism of the Holy Ghost fire and consistency in my secret prayer altar.',
      amens: 52,
      status: 'new',
      createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    },
  ],
  testimonies: [
    {
      id: 't-101',
      name: 'Sister Blessing A.',
      category: 'Fruit of the Womb & Safe Delivery',
      title: 'Blessed with Healthy Twin Boys after 4 Years of Waiting!',
      details:
        'After four years of medical delays, Apostle prayed with my husband and me at the School of Prayer altar and declared: “Before this season ends, your shame turns to double glory!” Glory to Jesus, the Lord blessed us with healthy twin boys!',
      phone: '0805 123 4567',
      email: 'blessing.a@gmail.com',
      allowShare: true,
      approved: true,
      praises: 76,
      createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000).toISOString(),
    },
    {
      id: 't-102',
      name: 'Brother Tolu O.',
      category: 'Academic & Job Breakthrough',
      title: 'Unexpected Job Appointment at Multi-National Firm',
      details:
        'I was unemployed for 11 months. During the Revelational Hour service on Thursday, Apostle taught on Divine Help from Hebrews 4:16. That same Friday afternoon, I received a call offering me a senior managerial position with full relocation benefits!',
      phone: '0818 998 7766',
      email: 'tolu.o@yahoo.com',
      allowShare: true,
      approved: true,
      praises: 61,
      createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    },
  ],
  volunteers: [
    {
      id: 'vol-1',
      name: 'Chidiebere Okafor',
      phone: '0809 555 4321',
      email: 'chidi.okafor@gmail.com',
      department: "Potter's Media & Sound Tech",
      experience: '3 years of experience operating digital sound mixers and livestream cameras.',
      status: 'contacted',
      createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    },
  ],
  donations: [
    {
      id: 'don-1',
      reference: 'CPC-1728829102-48291',
      amount: 25000,
      currency: 'NGN',
      donorName: 'Brother David O.',
      email: 'david.o@gmail.com',
      category: 'Tithe & First Fruits',
      channel: 'paystack_inline',
      verified: true,
      status: 'success',
      paidAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString(),
    },
    {
      id: 'don-2',
      reference: 'CPC-1728834910-19283',
      amount: 50000,
      currency: 'NGN',
      donorName: 'Elder Sunday & Family',
      email: 'sunday.fam@yahoo.com',
      category: 'Building Project',
      channel: 'paystack_inline',
      verified: true,
      status: 'success',
      paidAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
      createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    },
  ],
};

// In-memory runtime cache for serverless resiliency
let memoryStore = JSON.parse(JSON.stringify(DEFAULT_STORE));

function loadStore() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      memoryStore = { ...DEFAULT_STORE, ...parsed };
    }
  } catch (e) {
    // Graceful fallback to memory store if running in read-only environment
  }
  return memoryStore;
}

function persistStore() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(memoryStore, null, 2), 'utf-8');
  } catch (e) {
    // If running in readonly lambda, in-memory store remains active
  }
}

// -------------------------------------------------------------
// VISITORS
// -------------------------------------------------------------
export function saveVisitor(data) {
  loadStore();
  const visitor = {
    id: `v-${Date.now()}`,
    name: data.name || 'Anonymous Visitor',
    phone: data.phone || '',
    email: data.email || '',
    serviceDate: data.serviceDate || 'Upcoming Sunday (8:00 AM)',
    attendeeCount: data.attendeeCount || '1 person',
    hasKids: data.hasKids || 'No',
    kidAges: data.kidAges || '',
    specialAssistance: data.specialAssistance || '',
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  memoryStore.visitors.unshift(visitor);
  persistStore();
  return visitor;
}

export function getVisitors() {
  loadStore();
  return memoryStore.visitors;
}

export function updateVisitorStatus(id, status) {
  loadStore();
  const v = memoryStore.visitors.find((item) => item.id === id);
  if (v) {
    v.status = status;
    persistStore();
    return v;
  }
  return null;
}

// -------------------------------------------------------------
// PRAYERS
// -------------------------------------------------------------
export function savePrayer(data) {
  loadStore();
  const prayer = {
    id: `p-${Date.now()}`,
    name: data.name || 'Anonymous Believer',
    phone: data.phone || '',
    email: data.email || '',
    category: data.category || 'General Intercession',
    isConfidential: Boolean(data.isConfidential),
    details: data.details || '',
    amens: 0,
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  memoryStore.prayers.unshift(prayer);
  persistStore();
  return prayer;
}

export function getPrayers() {
  loadStore();
  return memoryStore.prayers;
}

export function togglePrayerAmen(id) {
  loadStore();
  const p = memoryStore.prayers.find((item) => String(item.id) === String(id));
  if (p) {
    p.amens = (p.amens || 0) + 1;
    persistStore();
    return p;
  }
  return null;
}

// -------------------------------------------------------------
// TESTIMONIES
// -------------------------------------------------------------
export function saveTestimony(data) {
  loadStore();
  const testimony = {
    id: `t-${Date.now()}`,
    name: data.name || 'A Believer',
    category: data.category || 'Divine Encounter',
    title: data.title || 'Praise the Lord!',
    details: data.details || '',
    phone: data.phone || '',
    email: data.email || '',
    allowShare: data.allowShare !== false,
    approved: false, // Requires admin moderation before public display
    praises: 0,
    createdAt: new Date().toISOString(),
  };
  memoryStore.testimonies.unshift(testimony);
  persistStore();
  return testimony;
}

export function getTestimonies({ approvedOnly = false } = {}) {
  loadStore();
  if (approvedOnly) {
    return memoryStore.testimonies.filter((t) => t.approved && t.allowShare);
  }
  return memoryStore.testimonies;
}

export function approveTestimony(id, approved = true) {
  loadStore();
  const t = memoryStore.testimonies.find((item) => String(item.id) === String(id));
  if (t) {
    t.approved = approved;
    persistStore();
    return t;
  }
  return null;
}

export function toggleTestimonyPraise(id) {
  loadStore();
  const t = memoryStore.testimonies.find((item) => String(item.id) === String(id));
  if (t) {
    t.praises = (t.praises || 0) + 1;
    persistStore();
    return t;
  }
  return null;
}

// -------------------------------------------------------------
// VOLUNTEERS
// -------------------------------------------------------------
export function saveVolunteer(data) {
  loadStore();
  const volunteer = {
    id: `vol-${Date.now()}`,
    name: data.name || 'Applicant',
    phone: data.phone || '',
    email: data.email || '',
    department: data.department || 'Ministry Directorate',
    experience: data.experience || '',
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  memoryStore.volunteers.unshift(volunteer);
  persistStore();
  return volunteer;
}

export function getVolunteers() {
  loadStore();
  return memoryStore.volunteers;
}

// -------------------------------------------------------------
// DONATIONS / GIVING
// -------------------------------------------------------------
export function saveDonation(data) {
  loadStore();
  // Check if reference already exists to prevent duplicates
  const existing = memoryStore.donations.find((d) => d.reference === data.reference);
  if (existing) {
    return existing;
  }

  const donation = {
    id: `don-${Date.now()}`,
    reference: data.reference,
    amount: Number(data.amount) || 0,
    currency: data.currency || 'NGN',
    donorName: data.donorName || data.name || 'Anonymous Giver',
    email: data.email || '',
    category: data.category || 'General Offering',
    channel: data.channel || 'paystack',
    verified: Boolean(data.verified),
    status: data.status || 'success',
    paidAt: data.paidAt || new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };
  memoryStore.donations.unshift(donation);
  persistStore();
  return donation;
}

export function getDonations() {
  loadStore();
  return memoryStore.donations;
}

export function getDonationStats() {
  loadStore();
  const totalNgn = memoryStore.donations
    .filter((d) => d.currency === 'NGN')
    .reduce((sum, d) => sum + (d.amount || 0), 0);

  const totalUsd = memoryStore.donations
    .filter((d) => d.currency === 'USD')
    .reduce((sum, d) => sum + (d.amount || 0), 0);

  return {
    totalNgn,
    totalUsd,
    count: memoryStore.donations.length,
  };
}

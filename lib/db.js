import fs from 'fs';
import path from 'path';
import { sanitizeText, sanitizeEmail, sanitizePhone } from './sanitize.js';

/**
 * Church Database & Multi-Driver Persistence Layer
 * Christ The Potter Church (CPC) & OSOM Ministries
 *
 * Pluggable architecture supporting:
 * 1. Upstash Redis / Vercel KV (Zero-dependency Serverless REST API)
 * 2. Supabase PostgREST (PostgreSQL REST API)
 * 3. Local/Serverless File Store (.data/store.json or /tmp/cpc-store.json)
 * 4. High-performance In-Memory runtime cache
 */

// Initial seed data for rich, out-of-the-box experience
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
  registrations: [
    {
      id: 'reg-seed-1',
      name: 'Pastor Samuel Adeyemi',
      phone: '0802 334 1122',
      email: 'samuel.adeyemi@gmail.com',
      eventTitle: 'Kingdom Young Ministers Conference (KYMC 2026)',
      eventId: 'kymc',
      location: 'Ibadan, Oyo State',
      church: 'Grace Life Fellowship',
      notes: 'Attending with 2 delegates',
      status: 'confirmed',
      createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    },
  ],
};

// In-memory runtime cache for serverless resiliency & ultra-fast response
let memoryStore = JSON.parse(JSON.stringify(DEFAULT_STORE));
let lastLoadedTime = 0;
const CACHE_TTL_MS = 15000; // 15-second memory cache TTL before re-checking remote store

/**
 * Detect the active database driver based on environment variables
 */
function getActiveDriverConfig() {
  const kvUrl = (process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL)?.trim();
  const kvToken = (process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN)?.trim();
  if (kvUrl && kvToken) {
    return { type: 'upstash_kv', url: kvUrl.replace(/\/$/, ''), token: kvToken, label: 'Upstash / Vercel KV' };
  }

  const supabaseUrl = process.env.SUPABASE_URL?.trim();
  const supabaseKey = (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY)?.trim();
  if (supabaseUrl && supabaseKey) {
    return { type: 'supabase', url: supabaseUrl.replace(/\/$/, ''), key: supabaseKey, label: 'Supabase PostgreSQL' };
  }

  return { type: 'local', label: 'Local Serverless File' };
}

/**
 * Determine a safe file path for local/serverless fallback
 */
function getStoreFilePath() {
  if (process.env.VERCEL || process.env.AWS_LAMBDA_FUNCTION_NAME) {
    return path.join('/tmp', 'cpc-store.json');
  }
  return path.join(process.cwd(), '.data', 'store.json');
}

/**
 * Synchronize store from active remote cloud or local persistence
 */
async function loadStore(force = false) {
  const now = Date.now();
  if (!force && lastLoadedTime > 0 && now - lastLoadedTime < CACHE_TTL_MS) {
    return memoryStore;
  }

  const config = getActiveDriverConfig();

  // 1. Upstash Redis / Vercel KV REST
  if (config.type === 'upstash_kv') {
    try {
      const res = await fetch(`${config.url}/get/cpc_store_v1`, {
        headers: { Authorization: `Bearer ${config.token}` },
        cache: 'no-store',
      });
      if (res.ok) {
        const json = await res.json();
        if (json.result) {
          const remote = typeof json.result === 'string' ? JSON.parse(json.result) : json.result;
          memoryStore = { ...DEFAULT_STORE, ...remote };
          lastLoadedTime = now;
          return memoryStore;
        }
      }
    } catch (err) {
      console.warn('[DB/UPSTASH] Failed to fetch remote store, using cache:', err.message);
    }
  }

  // 2. Supabase PostgREST
  if (config.type === 'supabase') {
    try {
      const res = await fetch(`${config.url}/rest/v1/cpc_store?id=eq.main&select=data`, {
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${config.key}`,
        },
        cache: 'no-store',
      });
      if (res.ok) {
        const rows = await res.json();
        if (Array.isArray(rows) && rows[0]?.data) {
          memoryStore = { ...DEFAULT_STORE, ...rows[0].data };
          lastLoadedTime = now;
          return memoryStore;
        }
      }
    } catch (err) {
      console.warn('[DB/SUPABASE] Failed to fetch remote store, using cache:', err.message);
    }
  }

  // 3. Local / Serverless Disk Fallback
  try {
    const filePath = getStoreFilePath();
    if (fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, 'utf-8');
      const parsed = JSON.parse(raw);
      memoryStore = { ...DEFAULT_STORE, ...parsed };
      lastLoadedTime = now;
      return memoryStore;
    }
  } catch (e) {
    // Graceful fallback to memory store if running in strict read-only environment
  }

  lastLoadedTime = now;
  return memoryStore;
}

/**
 * Persist store state to active remote cloud or local disk
 */
async function persistStore() {
  const config = getActiveDriverConfig();

  // 1. Upstash Redis / Vercel KV
  if (config.type === 'upstash_kv') {
    try {
      await fetch(`${config.url}/set/cpc_store_v1`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${config.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(memoryStore),
      });
      return;
    } catch (err) {
      console.warn('[DB/UPSTASH] Failed to persist remote store:', err.message);
    }
  }

  // 2. Supabase PostgREST
  if (config.type === 'supabase') {
    try {
      await fetch(`${config.url}/rest/v1/cpc_store`, {
        method: 'POST',
        headers: {
          apikey: config.key,
          Authorization: `Bearer ${config.key}`,
          'Content-Type': 'application/json',
          Prefer: 'resolution=merge-duplicates',
        },
        body: JSON.stringify({
          id: 'main',
          data: memoryStore,
          updated_at: new Date().toISOString(),
        }),
      });
      return;
    } catch (err) {
      console.warn('[DB/SUPABASE] Failed to persist remote store:', err.message);
    }
  }

  // 3. Local / Serverless Disk Fallback
  try {
    const filePath = getStoreFilePath();
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(filePath, JSON.stringify(memoryStore, null, 2), 'utf-8');
  } catch (e) {
    // If local write fails (e.g. read-only container), attempt /tmp
    try {
      fs.writeFileSync('/tmp/cpc-store.json', JSON.stringify(memoryStore, null, 2), 'utf-8');
    } catch {}
  }
}

/**
 * Returns current database connection and diagnostic status
 */
export async function getDatabaseStatus() {
  await loadStore();
  const config = getActiveDriverConfig();
  return {
    provider: config.type,
    label: config.label,
    isCloud: config.type !== 'local',
    lastSynced: new Date(lastLoadedTime || Date.now()).toISOString(),
    counts: {
      visitors: memoryStore.visitors?.length || 0,
      prayers: memoryStore.prayers?.length || 0,
      testimonies: memoryStore.testimonies?.length || 0,
      volunteers: memoryStore.volunteers?.length || 0,
      donations: memoryStore.donations?.length || 0,
    },
  };
}

// -------------------------------------------------------------
// VISITORS
// -------------------------------------------------------------
export async function saveVisitor(data) {
  await loadStore();
  const visitor = {
    id: `v-${Date.now()}`,
    name: sanitizeText(data.name, 100) || 'Anonymous Visitor',
    phone: sanitizePhone(data.phone),
    email: sanitizeEmail(data.email),
    serviceDate: sanitizeText(data.serviceDate, 80) || 'Upcoming Sunday (8:00 AM)',
    attendeeCount: sanitizeText(data.attendeeCount, 40) || '1 person',
    hasKids: sanitizeText(data.hasKids, 10) || 'No',
    kidAges: sanitizeText(data.kidAges, 100),
    specialAssistance: sanitizeText(data.specialAssistance, 500),
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  memoryStore.visitors.unshift(visitor);
  await persistStore();
  return visitor;
}

export async function getVisitors() {
  await loadStore();
  return memoryStore.visitors;
}

export async function updateVisitorStatus(id, status) {
  await loadStore();
  const cleanId = sanitizeText(id, 64);
  const v = memoryStore.visitors.find((item) => String(item.id) === String(cleanId));
  if (v) {
    v.status = sanitizeText(status, 32) || 'confirmed';
    await persistStore();
    return v;
  }
  return null;
}

// -------------------------------------------------------------
// PRAYERS
// -------------------------------------------------------------
export async function savePrayer(data) {
  await loadStore();
  const prayer = {
    id: `p-${Date.now()}`,
    name: sanitizeText(data.name, 100) || 'Anonymous Believer',
    phone: sanitizePhone(data.phone),
    email: sanitizeEmail(data.email),
    category: sanitizeText(data.category, 80) || 'General Intercession',
    isConfidential: Boolean(data.isConfidential),
    details: sanitizeText(data.details, 3000),
    amens: 0,
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  memoryStore.prayers.unshift(prayer);
  await persistStore();
  return prayer;
}

export async function getPrayers() {
  await loadStore();
  return memoryStore.prayers;
}

export async function togglePrayerAmen(id) {
  await loadStore();
  const cleanId = sanitizeText(id, 64);
  const p = memoryStore.prayers.find((item) => String(item.id) === String(cleanId));
  if (p) {
    p.amens = (p.amens || 0) + 1;
    await persistStore();
    return p;
  }
  return null;
}

// -------------------------------------------------------------
// TESTIMONIES
// -------------------------------------------------------------
export async function saveTestimony(data) {
  await loadStore();
  const testimony = {
    id: `t-${Date.now()}`,
    name: sanitizeText(data.name, 100) || 'A Believer',
    category: sanitizeText(data.category, 80) || 'Divine Encounter',
    title: sanitizeText(data.title, 150) || 'Praise the Lord!',
    details: sanitizeText(data.details, 4000),
    phone: sanitizePhone(data.phone),
    email: sanitizeEmail(data.email),
    allowShare: data.allowShare !== false,
    approved: false, // Requires admin moderation before public display
    praises: 0,
    createdAt: new Date().toISOString(),
  };
  memoryStore.testimonies.unshift(testimony);
  await persistStore();
  return testimony;
}

export async function getTestimonies({ approvedOnly = false } = {}) {
  await loadStore();
  if (approvedOnly) {
    return memoryStore.testimonies.filter((t) => t.approved && t.allowShare);
  }
  return memoryStore.testimonies;
}

export async function approveTestimony(id, approved = true) {
  await loadStore();
  const cleanId = sanitizeText(id, 64);
  const t = memoryStore.testimonies.find((item) => String(item.id) === String(cleanId));
  if (t) {
    t.approved = Boolean(approved);
    await persistStore();
    return t;
  }
  return null;
}

export async function toggleTestimonyPraise(id) {
  await loadStore();
  const cleanId = sanitizeText(id, 64);
  const t = memoryStore.testimonies.find((item) => String(item.id) === String(cleanId));
  if (t) {
    t.praises = (t.praises || 0) + 1;
    await persistStore();
    return t;
  }
  return null;
}

// -------------------------------------------------------------
// VOLUNTEERS
// -------------------------------------------------------------
export async function saveVolunteer(data) {
  await loadStore();
  const volunteer = {
    id: `vol-${Date.now()}`,
    name: sanitizeText(data.name, 100) || 'Applicant',
    phone: sanitizePhone(data.phone),
    email: sanitizeEmail(data.email),
    department: sanitizeText(data.department, 100) || 'Ministry Directorate',
    experience: sanitizeText(data.experience, 2000),
    status: 'new',
    createdAt: new Date().toISOString(),
  };
  memoryStore.volunteers.unshift(volunteer);
  await persistStore();
  return volunteer;
}

export async function getVolunteers() {
  await loadStore();
  return memoryStore.volunteers;
}

// -------------------------------------------------------------
// DONATIONS / GIVING
// -------------------------------------------------------------
export async function saveDonation(data) {
  await loadStore();
  const cleanRef = sanitizeText(data.reference, 100);
  if (!cleanRef) return null;

  // Check if reference already exists to prevent duplicates
  const existing = memoryStore.donations.find((d) => d.reference === cleanRef);
  if (existing) {
    return existing;
  }

  const donation = {
    id: `don-${Date.now()}`,
    reference: cleanRef,
    amount: Math.max(0, Number(data.amount) || 0),
    currency: data.currency === 'USD' ? 'USD' : 'NGN',
    donorName: sanitizeText(data.donorName || data.name, 100) || 'Anonymous Giver',
    email: sanitizeEmail(data.email),
    category: sanitizeText(data.category, 80) || 'General Offering',
    channel: sanitizeText(data.channel, 50) || 'paystack',
    verified: Boolean(data.verified),
    status: sanitizeText(data.status, 30) || 'success',
    paidAt: data.paidAt || new Date().toISOString(),
    createdAt: new Date().toISOString(),
  };
  memoryStore.donations.unshift(donation);
  await persistStore();
  return donation;
}

export async function getDonations() {
  await loadStore();
  return memoryStore.donations;
}

export async function getDonationStats() {
  await loadStore();
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

// -------------------------------------------------------------
// CONFERENCES & SCHOOLS REGISTRATIONS
// -------------------------------------------------------------
export async function saveRegistration(data) {
  await loadStore();
  const registration = {
    id: `reg-${Date.now()}`,
    name: sanitizeText(data.name, 100),
    phone: sanitizePhone(data.phone),
    email: sanitizeEmail(data.email),
    eventTitle: sanitizeText(data.eventTitle || data.eventName, 150) || 'General Conference',
    eventId: sanitizeText(data.eventId, 50) || 'conference',
    location: sanitizeText(data.location, 100),
    church: sanitizeText(data.church, 150),
    role: sanitizeText(data.role, 80),
    accommodation: sanitizeText(data.accommodation, 50),
    notes: sanitizeText(data.notes, 2000),
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };

  memoryStore.registrations = memoryStore.registrations || [];
  memoryStore.registrations.unshift(registration);
  await persistStore();
  return registration;
}

export async function getRegistrations() {
  await loadStore();
  return memoryStore.registrations || [];
}


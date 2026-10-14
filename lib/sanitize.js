/**
 * Input Sanitization and XSS Prevention Utility
 * Christ The Potter Church (CPC) Web Platform
 */

/**
 * Escapes unsafe HTML characters to their corresponding HTML entities.
 * Use whenever user input is rendered into HTML templates or emails.
 *
 * @param {any} input
 * @returns {string}
 */
export function escapeHtml(input) {
  if (input === null || input === undefined) return '';
  const str = String(input);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Strips dangerous ASCII control characters and enforces length bounds.
 * Preserves safe whitespace (\n, \r, \t).
 *
 * @param {string} str
 * @param {number} maxLength
 * @returns {string}
 */
export function sanitizeText(str, maxLength = 2000) {
  if (typeof str !== 'string') return '';
  return str
    .trim()
    // Strip non-printable ASCII control characters except \t, \n, \r
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // Normalize unicode control characters
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .slice(0, maxLength);
}

/**
 * Validates and sanitizes email address.
 *
 * @param {string} email
 * @returns {string} Clean, lowercase email or empty string if invalid
 */
export function sanitizeEmail(email) {
  if (typeof email !== 'string') return '';
  const clean = email.trim().toLowerCase().slice(0, 254);
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(clean) ? clean : '';
}

/**
 * Validates and formats a phone number string.
 * Allows digits, +, -, (, ), spaces, and dots.
 *
 * @param {string} phone
 * @returns {string}
 */
export function sanitizePhone(phone) {
  if (typeof phone !== 'string') return '';
  const clean = phone.trim().replace(/[^\d+\-()\s.]/g, '').slice(0, 30);
  return clean;
}

/**
 * Deep-escapes all string values in an object for safe HTML rendering.
 *
 * @param {Object} data
 * @returns {Object}
 */
export function escapeEmailData(data) {
  if (!data || typeof data !== 'object') return {};
  const escaped = {};
  for (const [key, value] of Object.entries(data)) {
    if (typeof value === 'string') {
      escaped[key] = escapeHtml(value);
    } else if (typeof value === 'object' && value !== null) {
      escaped[key] = escapeEmailData(value);
    } else {
      escaped[key] = value;
    }
  }
  return escaped;
}

/**
 * Sanitizes form payload based on submission type.
 *
 * @param {string} type - 'visit' | 'prayer' | 'testimony' | 'volunteer' | 'giving'
 * @param {Object} raw - Untrusted input from request body
 * @returns {Object} Cleaned, type-safe data
 */
export function sanitizeFormData(type, raw = {}) {
  if (!raw || typeof raw !== 'object') return {};

  const base = {
    name: sanitizeText(raw.name, 100),
    phone: sanitizePhone(raw.phone),
    email: sanitizeEmail(raw.email),
  };

  switch (type) {
    case 'visit':
      return {
        ...base,
        serviceDate: sanitizeText(raw.serviceDate || 'Upcoming Sunday (8:00 AM)', 80),
        attendeeCount: sanitizeText(raw.attendeeCount || '1 person', 40),
        hasKids: sanitizeText(raw.hasKids || 'No', 10),
        kidAges: sanitizeText(raw.kidAges, 100),
        specialAssistance: sanitizeText(raw.specialAssistance, 500),
      };

    case 'prayer':
      return {
        ...base,
        category: sanitizeText(raw.category || 'General Intercession', 80),
        isConfidential: Boolean(raw.isConfidential),
        details: sanitizeText(raw.details, 3000),
      };

    case 'testimony':
      return {
        ...base,
        category: sanitizeText(raw.category || 'Divine Encounter', 80),
        title: sanitizeText(raw.title || 'Answered Prayer', 150),
        details: sanitizeText(raw.details, 4000),
        allowShare: raw.allowShare !== false,
      };

    case 'volunteer':
      return {
        ...base,
        department: sanitizeText(raw.department || 'Ministry Directorate', 100),
        experience: sanitizeText(raw.experience, 2000),
      };

    case 'giving':
      return {
        ...base,
        reference: sanitizeText(raw.reference, 100),
        amount: Math.max(0, Number(raw.amount) || 0),
        currency: raw.currency === 'USD' ? 'USD' : 'NGN',
        category: sanitizeText(raw.category || 'General Offering', 80),
      };

    case 'registration':
      return {
        ...base,
        eventId: sanitizeText(raw.eventId, 50),
        eventTitle: sanitizeText(raw.eventTitle || raw.eventName, 150),
        location: sanitizeText(raw.location, 100),
        church: sanitizeText(raw.church, 150),
        role: sanitizeText(raw.role, 80),
        accommodation: sanitizeText(raw.accommodation, 50),
        notes: sanitizeText(raw.notes, 2000),
      };

    default:
      return base;
  }
}

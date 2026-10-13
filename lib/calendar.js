/**
 * Calendar Utilities for Christ The Potter Church
 *
 * Generates Google Calendar URLs and downloadable RFC-5545 .ics iCalendar
 * files for Apple Calendar, Outlook, and mobile devices.
 */

import { CHURCH } from './site-config';

/**
 * Calculates the next upcoming date for a given day of week
 * @param {number} targetDay - 0 = Sunday, 2 = Tuesday, 4 = Thursday
 * @param {number} hour - 24-hr format (WAT)
 * @param {number} minute - minutes
 */
function getNextOccurrenceDate(targetDay, hour, minute) {
  const now = new Date();
  const result = new Date(now);
  const currentDay = now.getDay();
  let daysUntil = (targetDay - currentDay + 7) % 7;

  // If today is the target day but the time has passed, jump to next week
  if (daysUntil === 0) {
    const currentHour = now.getHours();
    const currentMin = now.getMinutes();
    if (currentHour > hour || (currentHour === hour && currentMin >= minute)) {
      daysUntil = 7;
    }
  }

  result.setDate(now.getDate() + daysUntil);
  result.setHours(hour, minute, 0, 0);
  return result;
}

/**
 * Formats a Date object into UTC iCalendar format: YYYYMMDDTHHmmssZ
 */
function formatDateToIcsUTC(date) {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

/**
 * Pre-configured recurring service events
 */
export const SERVICE_EVENTS = {
  sunday: {
    id: 'cpc-sunday-service',
    title: 'Sunday Worship Service — Christ The Potter Church',
    description: `Celebration, Word, Praise & Supernatural Impartation at Christ The Potter Church.\n\nMinistering: Apostle & Rev. (Mrs) Oluwafunminiyi Olufisayo.\nVenue: ${CHURCH.address.full}\nMixlr Live Audio: https://mixlr.com/christ-the-potter-church\nPhone: ${CHURCH.phone}`,
    location: CHURCH.address.full,
    startHour: 8,
    startMinute: 0,
    durationHours: 3.5,
    dayOfWeek: 0, // Sunday
    recurrenceByDay: 'SU',
    label: 'Sunday Service (8:00 AM)',
  },
  tuesday: {
    id: 'cpc-tuesday-prayer',
    title: 'School of Prayer — Christ The Potter Church',
    description: `Weekly Intercession, Spiritual Warfare & Deliverance at Christ The Potter Church.\n\nMinistering: Apostle Oluwafunminiyi Olufisayo.\nVenue: ${CHURCH.address.full}\nMixlr Live Audio: https://mixlr.com/christ-the-potter-church\nPhone: ${CHURCH.phone}`,
    location: CHURCH.address.full,
    startHour: 17,
    startMinute: 0,
    durationHours: 2,
    dayOfWeek: 2, // Tuesday
    recurrenceByDay: 'TU',
    label: 'School of Prayer (Tue 5:00 PM)',
  },
  thursday: {
    id: 'cpc-thursday-doctrine',
    title: 'Revelational Hour — Christ The Potter Church',
    description: `Deep Apostolic Doctrine & Systematic Exegesis at Christ The Potter Church.\n\nMinistering: Apostle Oluwafunminiyi Olufisayo.\nVenue: ${CHURCH.address.full}\nMixlr Live Audio: https://mixlr.com/christ-the-potter-church\nPhone: ${CHURCH.phone}`,
    location: CHURCH.address.full,
    startHour: 17,
    startMinute: 0,
    durationHours: 2,
    dayOfWeek: 4, // Thursday
    recurrenceByDay: 'TH',
    label: 'Revelational Hour (Thu 5:00 PM)',
  },
};

/**
 * Safely computes start and end dates for both recurring service events and one-off/dated conferences
 */
export function getEventDates(eventConfig) {
  let startDate = null;

  if (eventConfig.startDate) {
    startDate = new Date(eventConfig.startDate);
  } else if (eventConfig.startIso) {
    startDate = new Date(eventConfig.startIso);
  } else if (eventConfig.date && !isNaN(new Date(eventConfig.date).getTime())) {
    startDate = new Date(eventConfig.date);
  } else {
    startDate = getNextOccurrenceDate(
      eventConfig.dayOfWeek ?? 0,
      eventConfig.startHour ?? 8,
      eventConfig.startMinute ?? 0
    );
  }

  // Safety fallback if date parsing failed
  if (!startDate || isNaN(startDate.getTime())) {
    startDate = getNextOccurrenceDate(
      eventConfig.dayOfWeek ?? 0,
      eventConfig.startHour ?? 8,
      eventConfig.startMinute ?? 0
    );
  }

  let endDate = null;
  if (eventConfig.endDate) {
    endDate = new Date(eventConfig.endDate);
  } else if (eventConfig.endIso) {
    endDate = new Date(eventConfig.endIso);
  } else {
    const durationMs = (eventConfig.durationHours ?? 2) * 60 * 60 * 1000;
    endDate = new Date(startDate.getTime() + durationMs);
  }

  if (!endDate || isNaN(endDate.getTime())) {
    endDate = new Date(startDate.getTime() + 2 * 60 * 60 * 1000);
  }

  return { startDate, endDate };
}

/**
 * Generate Google Calendar URL
 */
export function getGoogleCalendarUrl(eventConfig) {
  const { startDate, endDate } = getEventDates(eventConfig);

  const startUtc = formatDateToIcsUTC(startDate);
  const endUtc = formatDateToIcsUTC(endDate);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: eventConfig.title || 'Christ The Potter Church Service',
    dates: `${startUtc}/${endUtc}`,
    details: eventConfig.description || '',
    location: eventConfig.location || CHURCH.address.full,
  });

  if (eventConfig.recurrenceByDay) {
    params.set('recur', `RRULE:FREQ=WEEKLY;BYDAY=${eventConfig.recurrenceByDay}`);
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/**
 * Generate RFC-5545 compliant iCalendar string (.ics)
 */
export function generateIcsContent(eventConfig) {
  const { startDate, endDate } = getEventDates(eventConfig);

  const startUtc = formatDateToIcsUTC(startDate);
  const endUtc = formatDateToIcsUTC(endDate);
  const nowUtc = formatDateToIcsUTC(new Date());

  const cleanDescription = (eventConfig.description || '').replace(/\n/g, '\\n');
  const cleanLocation = (eventConfig.location || CHURCH.address.full).replace(/,/g, '\\,');

  let rrule = '';
  if (eventConfig.recurrenceByDay) {
    rrule = `RRULE:FREQ=WEEKLY;BYDAY=${eventConfig.recurrenceByDay}\r\n`;
  }

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Christ The Potter Church//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${eventConfig.id}-${Date.now()}@christthepotterchurch.org`,
    `DTSTAMP:${nowUtc}`,
    `DTSTART:${startUtc}`,
    `DTEND:${endUtc}`,
    rrule ? rrule.trim() : null,
    `SUMMARY:${eventConfig.title}`,
    `DESCRIPTION:${cleanDescription}`,
    `LOCATION:${cleanLocation}`,
    'STATUS:CONFIRMED',
    'BEGIN:VALARM',
    'TRIGGER:-PT1H',
    'ACTION:DISPLAY',
    `DESCRIPTION:Reminder: ${eventConfig.title} begins in 1 hour`,
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n');
}

/**
 * Trigger download of .ics file for Apple Calendar, Outlook, and mobile devices
 */
export function downloadIcsCalendar(eventConfig) {
  if (typeof window === 'undefined') return;

  const icsData = generateIcsContent(eventConfig);
  const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
  const filename = `${eventConfig.id || 'cpc-event'}.ics`;

  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

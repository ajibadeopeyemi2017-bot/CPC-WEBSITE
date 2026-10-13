import { SERVICE_SCHEDULE, SOCIAL_LINKS } from './site-config';

/**
 * Returns the current date and time converted to West Africa Time (WAT / Africa/Lagos, UTC+1).
 * Nigeria does not observe daylight saving time, so it is strictly UTC+1 all year round.
 */
export function getNigeriaDate() {
  const now = new Date();
  // UTC time in ms
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  // Nigeria is UTC+1 (3,600,000 ms)
  return new Date(utcMs + 3600000);
}

/**
 * Checks whether simulation is active via localStorage or URL query string.
 */
export function isLiveSimulated() {
  if (typeof window === 'undefined') return false;
  try {
    const params = new URLSearchParams(window.location.search);
    if (params.get('live') === 'true' || params.get('live') === '1') {
      return true;
    }
    return window.localStorage.getItem('cpc_simulate_live') === 'true';
  } catch (e) {
    return false;
  }
}

/**
 * Toggles or sets live simulation state for previewing the live broadcast UX.
 */
export function toggleLiveSimulation(forcedState) {
  if (typeof window === 'undefined') return false;
  try {
    const current = window.localStorage.getItem('cpc_simulate_live') === 'true';
    const next = typeof forcedState === 'boolean' ? forcedState : !current;
    if (next) {
      window.localStorage.setItem('cpc_simulate_live', 'true');
    } else {
      window.localStorage.removeItem('cpc_simulate_live');
    }
    window.dispatchEvent(new CustomEvent('cpc:live-status-changed', { detail: { isSimulated: next } }));
    return next;
  } catch (e) {
    return false;
  }
}

/**
 * Calculates current live status, active service, or countdown to the next gathering.
 */
export function getLiveServiceStatus() {
  const simulated = isLiveSimulated();
  const watNow = getNigeriaDate();
  const day = watNow.getDay(); // 0 = Sunday, 2 = Tuesday, 4 = Thursday
  const hours = watNow.getHours();
  const minutes = watNow.getMinutes();

  // If simulated mode is turned ON, mock an active Sunday celebration service
  if (simulated) {
    const mockService = SERVICE_SCHEDULE[0]; // Sunday Service
    return {
      isLive: true,
      isSimulated: true,
      activeService: {
        ...mockService,
        currentSegment: 'Worship & Word Impartation',
        timeRemainingText: 'Live broadcast in progress',
      },
      nextService: null,
      countdown: null,
      watTime: watNow.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    };
  }

  // Check if any scheduled service is currently in session
  const active = SERVICE_SCHEDULE.find((s) => {
    if (s.day !== day) return false;
    // Before start time
    if (hours < s.hour || (hours === s.hour && minutes < s.minute)) return false;
    // After end time
    if (hours > s.liveEndHour) return false;
    if (hours === s.liveEndHour && minutes > s.liveEndMinute) return false;
    return true;
  });

  if (active) {
    // Calculate total duration in minutes
    const startMins = active.hour * 60 + active.minute;
    const endMins = active.liveEndHour * 60 + active.liveEndMinute;
    const currentMins = hours * 60 + minutes;
    const duration = Math.max(1, endMins - startMins);
    const elapsed = Math.max(0, currentMins - startMins);
    const progress = Math.min(100, Math.round((elapsed / duration) * 100));

    return {
      isLive: true,
      isSimulated: false,
      activeService: {
        ...active,
        progress,
        minsRemaining: Math.max(0, endMins - currentMins),
      },
      nextService: null,
      countdown: null,
      watTime: watNow.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    };
  }

  // Not live: find next upcoming service
  let nearestDiff = Infinity;
  let nextServiceMatch = null;
  let nextServiceDate = null;

  for (const s of SERVICE_SCHEDULE) {
    const candidate = new Date(watNow);
    candidate.setHours(s.hour, s.minute, 0, 0);

    let dayDiff = s.day - day;
    if (dayDiff < 0 || (dayDiff === 0 && watNow >= candidate)) {
      dayDiff += 7;
    }
    candidate.setDate(watNow.getDate() + dayDiff);

    const diff = candidate.getTime() - watNow.getTime();
    if (diff > 0 && diff < nearestDiff) {
      nearestDiff = diff;
      nextServiceMatch = s;
      nextServiceDate = candidate;
    }
  }

  const totalSeconds = Math.max(0, Math.floor(nearestDiff / 1000));
  const days = Math.floor(totalSeconds / 86400);
  const hoursRemaining = Math.floor((totalSeconds % 86400) / 3600);
  const minsRemaining = Math.floor((totalSeconds % 3600) / 60);
  const secsRemaining = totalSeconds % 60;

  return {
    isLive: false,
    isSimulated: false,
    activeService: null,
    nextService: nextServiceMatch
      ? {
          ...nextServiceMatch,
          date: nextServiceDate,
        }
      : null,
    countdown: {
      days,
      hours: hoursRemaining,
      minutes: minsRemaining,
      seconds: secsRemaining,
      totalSeconds,
      formatted: `${days > 0 ? `${days}d ` : ''}${hoursRemaining}h ${minsRemaining}m ${secsRemaining}s`,
    },
    watTime: watNow.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
  };
}

/**
 * Lightweight in-memory rate limiter for serverless Next.js API routes
 * Protects public forms from automated spam bots and flood attacks.
 */

const ipRequests = new Map();

// Automatically clean up expired records every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, record] of ipRequests.entries()) {
      if (now > record.resetTime) {
        ipRequests.delete(ip);
      }
    }
  }, 5 * 60 * 1000);
}

/**
 * Checks if a given identifier (e.g. IP address) exceeds the limit.
 * @param {string} identifier - Unique client identifier (IP or user-agent fingerprint)
 * @param {number} limit - Maximum requests allowed in window (default 10)
 * @param {number} windowSeconds - Sliding window duration in seconds (default 60s)
 * @returns {{ allowed: boolean, remaining: number, resetInSeconds: number }}
 */
export function checkRateLimit(identifier, limit = 10, windowSeconds = 60) {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;
  const clientKey = identifier || 'anonymous-client';

  const record = ipRequests.get(clientKey);

  if (!record || now > record.resetTime) {
    ipRequests.set(clientKey, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      allowed: true,
      remaining: limit - 1,
      resetInSeconds: windowSeconds,
    };
  }

  if (record.count >= limit) {
    const resetInSeconds = Math.max(1, Math.ceil((record.resetTime - now) / 1000));
    return {
      allowed: false,
      remaining: 0,
      resetInSeconds,
    };
  }

  record.count += 1;
  const resetInSeconds = Math.max(1, Math.ceil((record.resetTime - now) / 1000));

  return {
    allowed: true,
    remaining: limit - record.count,
    resetInSeconds,
  };
}

/**
 * Extracts client IP from standard Next.js request headers
 */
export function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || '127.0.0.1';
}

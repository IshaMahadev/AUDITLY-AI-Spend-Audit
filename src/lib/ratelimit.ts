/**
 * Simple in-memory sliding-window rate limiter.
 * Suitable for single-process deployments. For multi-instance,
 * swap this for a Redis-backed solution.
 */

const store = new Map<string, { count: number; resetAt: number }>();

/**
 * Check whether a request identified by `key` is within the rate limit.
 * @returns `true` if the request is allowed, `false` if rate-limited.
 */
export function checkRateLimit(
  key: string,
  maxHits: number,
  windowMs: number
): boolean {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (entry.count >= maxHits) {
    return false;
  }

  entry.count++;
  return true;
}

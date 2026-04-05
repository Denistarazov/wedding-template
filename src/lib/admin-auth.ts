/**
 * Admin authentication helpers.
 *
 * Password is read from ADMIN_PASSWORD env variable.
 * Default: "wedding2027"  (change via Vercel → Settings → Environment Variables)
 */

const COOKIE_NAME = 'admin_token';
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

function getPassword(): string {
  return process.env.ADMIN_PASSWORD ?? 'wedding2027';
}

/** Hash password using Web Crypto API (available in Node 18+ / Edge runtime). */
async function hashPassword(password: string): Promise<string> {
  const secret = process.env.ADMIN_SECRET ?? 'wedding-secret-key';
  const data   = new TextEncoder().encode(password + secret);
  const buf    = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/** Verify submitted password and return signed token if correct. */
export async function verifyPassword(submitted: string): Promise<string | null> {
  if (submitted !== getPassword()) return null;
  return hashPassword(submitted);
}

/** Check if a cookie token is valid. */
export async function isValidToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const expected = await hashPassword(getPassword());
  return token === expected;
}

export { COOKIE_NAME, COOKIE_MAX_AGE };

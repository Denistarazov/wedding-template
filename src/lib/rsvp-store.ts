/**
 * In-memory RSVP store.
 *
 * Works within a single Node.js process (warm Vercel function instance).
 * ⚠️  Data resets on cold start / new deploy.
 *
 * For production: swap this module for Vercel KV, Supabase, or any DB.
 * The rsvpStore API stays the same — only this file changes.
 */

export interface RSVPEntry {
  id:          string;
  fullName:    string;
  attending:   'yes' | 'no';
  guestCount:  number;
  message:     string;
  submittedAt: string;   // ISO timestamp
}

// Module-level singleton — shared across requests in one warm instance
const store: RSVPEntry[] = [];

export const rsvpStore = {
  /** Persist a new RSVP and return the saved entry. */
  add(data: Omit<RSVPEntry, 'id' | 'submittedAt'>): RSVPEntry {
    const entry: RSVPEntry = {
      ...data,
      id:          Math.random().toString(36).slice(2, 10),
      submittedAt: new Date().toISOString(),
    };
    store.push(entry);
    return entry;
  },

  /** Return all saved RSVPs, newest first. */
  getAll(): RSVPEntry[] {
    return [...store].reverse();
  },

  /** Aggregate stats for the dashboard. */
  getStats() {
    const attending = store.filter((r) => r.attending === 'yes');
    const declining = store.filter((r) => r.attending === 'no');
    return {
      total:       store.length,
      attending:   attending.length,
      declining:   declining.length,
      totalGuests: attending.reduce((s, r) => s + r.guestCount, 0),
    };
  },
};

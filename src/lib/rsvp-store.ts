import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { list, put } from '@vercel/blob';
import type { RSVPStorageInfo } from '@/types';

export interface RSVPEntry {
  id:          string;
  fullName:    string;
  attending:   'yes' | 'no';
  guestCount:  number;
  message:     string;
  submittedAt: string;   // ISO timestamp
}

const store: RSVPEntry[] = [];
const DATA_DIR = path.join(process.cwd(), 'data');
const DATA_FILE = path.join(DATA_DIR, 'rsvps.json');
const BLOB_PATH = 'rsvp-store/rsvps.json';

async function readFileStore(): Promise<RSVPEntry[]> {
  try {
    const raw = await readFile(DATA_FILE, 'utf8');
    return JSON.parse(raw) as RSVPEntry[];
  } catch {
    return [];
  }
}

async function writeFileStore(entries: RSVPEntry[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(DATA_FILE, JSON.stringify(entries, null, 2), 'utf8');
}

async function readBlobStore(): Promise<RSVPEntry[]> {
  const { blobs } = await list({ prefix: BLOB_PATH, limit: 1 });
  const blob = blobs.find((item) => item.pathname === BLOB_PATH) ?? blobs[0];

  if (!blob) {
    return [];
  }

  const response = await fetch(blob.url, { cache: 'no-store' });
  if (!response.ok) {
    throw new Error(`Failed to fetch RSVP blob: ${response.status}`);
  }

  return (await response.json()) as RSVPEntry[];
}

async function writeBlobStore(entries: RSVPEntry[]): Promise<void> {
  await put(BLOB_PATH, JSON.stringify(entries, null, 2), {
    access: 'public',
    addRandomSuffix: false,
    contentType: 'application/json',
  });
}

function getStorageInfo(): RSVPStorageInfo {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return {
      mode: 'blob',
      label: 'Vercel Blob',
      persistent: true,
    };
  }

  if (process.env.NODE_ENV !== 'production') {
    return {
      mode: 'file',
      label: 'Local JSON file',
      persistent: true,
    };
  }

  return {
    mode: 'memory',
    label: 'In-memory fallback',
    persistent: false,
  };
}

async function loadEntries(): Promise<RSVPEntry[]> {
  const storage = getStorageInfo();

  if (storage.mode === 'blob') {
    return readBlobStore();
  }

  if (storage.mode === 'file') {
    return readFileStore();
  }

  return [...store];
}

async function saveEntries(entries: RSVPEntry[]): Promise<void> {
  const storage = getStorageInfo();

  if (storage.mode === 'blob') {
    await writeBlobStore(entries);
    return;
  }

  if (storage.mode === 'file') {
    await writeFileStore(entries);
    return;
  }

  store.splice(0, store.length, ...entries);
}

export const rsvpStore = {
  /** Persist a new RSVP and return the saved entry. */
  async add(data: Omit<RSVPEntry, 'id' | 'submittedAt'>): Promise<RSVPEntry> {
    const entries = await loadEntries();
    const entry: RSVPEntry = {
      ...data,
      id:          Math.random().toString(36).slice(2, 10),
      submittedAt: new Date().toISOString(),
    };
    entries.push(entry);
    await saveEntries(entries);
    return entry;
  },

  /** Return all saved RSVPs, newest first. */
  async getAll(): Promise<RSVPEntry[]> {
    const entries = await loadEntries();
    return [...entries].reverse();
  },

  /** Aggregate stats for the dashboard. */
  async getStats() {
    const entries = await loadEntries();
    const attending = entries.filter((r) => r.attending === 'yes');
    const declining = entries.filter((r) => r.attending === 'no');
    return {
      total:       entries.length,
      attending:   attending.length,
      declining:   declining.length,
      totalGuests: attending.reduce((s, r) => s + r.guestCount, 0),
    };
  },

  getStorageInfo,
};

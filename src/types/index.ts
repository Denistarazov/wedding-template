// ─── Wedding Config Types ────────────────────────────────────────────────────

export interface PersonInfo {
  name: string;
  fullName: string;
  photo: string;      // URL to photo (Unsplash or local /public)
  shortBio: string;
}

export interface StoryEntry {
  year: string;
  title: string;
  description: string;
}

export interface CoupleConfig {
  bride: PersonInfo;
  groom: PersonInfo;
  story: StoryEntry[];
}

// ─── Event Types ─────────────────────────────────────────────────────────────

export interface VenueInfo {
  name: string;
  address: string;
  time: string;
  mapUrl: string;
  description: string;
}

export interface EventConfig {
  /** ISO date string: "YYYY-MM-DD" */
  date: string;
  ceremony: VenueInfo;
  reception: VenueInfo;
}

// ─── Dress Code Types ─────────────────────────────────────────────────────────

export interface DressColor {
  name: string;
  hex: string;
}

export interface DressCodeConfig {
  style: string;
  description: string;
  colors: DressColor[];
  notes: string;
}

// ─── Gallery Types ────────────────────────────────────────────────────────────

export type GalleryCategory = 'couple' | 'ceremony' | 'venue' | 'detail';

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
  /** Optional: used for masonry layout (portrait images need more rows) */
  tall?: boolean;
}

export interface GalleryConfig {
  images: GalleryImage[];
}

// ─── RSVP Types ───────────────────────────────────────────────────────────────

export interface RSVPConfig {
  /** ISO date: deadline for RSVP ("YYYY-MM-DD") */
  deadline: string;
  maxGuestsPerRsvp: number;
  emailTo: string;
}

export interface RSVPFormData {
  fullName: string;
  attending: 'yes' | 'no';
  guestCount: number;
  message: string;
}

// ─── Theme Types ──────────────────────────────────────────────────────────────

export interface ThemeConfig {
  /** Primary accent color (hex) */
  primaryColor: string;
  /** Secondary accent color (hex) */
  accentColor: string;
}

// ─── Meta Types ───────────────────────────────────────────────────────────────

export interface MetaConfig {
  title: string;
  description: string;
  ogImage: string;
}

// ─── Root Config ─────────────────────────────────────────────────────────────

export interface WeddingConfig {
  couple: CoupleConfig;
  event: EventConfig;
  dressCode: DressCodeConfig;
  gallery: GalleryConfig;
  rsvp: RSVPConfig;
  theme: ThemeConfig;
  meta: MetaConfig;
}

// ─── Countdown Types ──────────────────────────────────────────────────────────

export interface CountdownValues {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

// ─── RSVP API Response ────────────────────────────────────────────────────────

export interface RSVPApiResponse {
  success: boolean;
  message: string;
}

export interface RSVPStorageInfo {
  mode: 'blob' | 'file' | 'memory';
  label: string;
  persistent: boolean;
}

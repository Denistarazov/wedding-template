import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind CSS classes safely, resolving conflicts.
 * Usage: cn('px-4 py-2', condition && 'bg-rose-500', className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Formats an ISO date string into a human-readable date.
 * e.g. "2027-06-15" → "June 15, 2027"
 */
export function formatDate(isoDate: string, options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(isoDate + 'T00:00:00'); // Force local timezone
  return date.toLocaleDateString('ru-RU', options ?? {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Formats an ISO date string into a short form.
 * e.g. "2027-06-15" → "06.15.2027"
 */
export function formatDateShort(isoDate: string): string {
  const date = new Date(isoDate + 'T00:00:00');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${mm}.${dd}.${yyyy}`;
}

/**
 * Pads a number with a leading zero if below 10.
 * e.g. 5 → "05", 12 → "12"
 */
export function pad(n: number): string {
  return String(n).padStart(2, '0');
}

'use client';

import { useState, useEffect } from 'react';
import type { CountdownValues } from '@/types';

/**
 * Computes the time remaining until a target date.
 * Returns zero values if the date has passed.
 */
function computeCountdown(targetDate: Date): CountdownValues {
  const now = Date.now();
  const diff = targetDate.getTime() - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }

  const totalSeconds = Math.floor(diff / 1000);
  const days    = Math.floor(totalSeconds / 86400);
  const hours   = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return { days, hours, minutes, seconds, isPast: false };
}

/**
 * Hook that counts down to a given ISO date string (e.g. "2027-06-15").
 * Returns days, hours, minutes, seconds — updated every second.
 * Safe to use with SSR: returns zeros on first render to avoid hydration mismatch.
 */
export function useCountdown(isoDate: string): CountdownValues {
  const [values, setValues] = useState<CountdownValues>({
    days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false,
  });

  useEffect(() => {
    // Parse target date once (add time so local midnight is used)
    const target = new Date(isoDate + 'T00:00:00');

    // Set immediately so the first paint is correct
    setValues(computeCountdown(target));

    const timer = setInterval(() => {
      setValues(computeCountdown(target));
    }, 1000);

    return () => clearInterval(timer);
  }, [isoDate]);

  return values;
}

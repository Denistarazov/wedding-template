'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { weddingConfig } from '@/config/wedding';
import { formatDate } from '@/lib/utils';
import en from '@/locales/en.json';
import type { VenueInfo } from '@/types';

// ── Icons ─────────────────────────────────────────────────────────────────────

function ClockIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z" />
    </svg>
  );
}

function MapPinIcon() {
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  );
}

// ── Venue Card ────────────────────────────────────────────────────────────────

function VenueCard({
  venue,
  type,
  index,
}: {
  venue: VenueInfo;
  type: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  // Encode the address for a Google Maps link
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(venue.address)}`;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="bg-cream dark:bg-[#201810] rounded-3xl overflow-hidden shadow-md
                 border border-champagne-200 dark:border-champagne-700/30
                 hover:shadow-lg transition-shadow duration-300"
    >
      {/* Card Header */}
      <div className="h-1 w-full bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)]" />
      <div className="px-6 py-5">
        <span className="section-label">{type}</span>
        <h3 className="font-serif text-2xl font-bold text-[var(--color-text)] mt-1">
          {venue.name}
        </h3>
      </div>

      {/* Card Body */}
      <div className="px-6 pb-6">
        <p className="text-[var(--color-text)]/70 font-sans text-sm leading-relaxed mb-5">
          {venue.description}
        </p>

        {/* Details */}
        <div className="space-y-3 mb-6">
          <div className="flex items-start gap-3 text-[var(--color-text)]">
            <ClockIcon />
            <span className="font-medium">{venue.time}</span>
          </div>
          <div className="flex items-start gap-3 text-[var(--color-text)]">
            <MapPinIcon />
            <span className="text-sm leading-snug">{venue.address}</span>
          </div>
        </div>

        {/* Directions link */}
        <a
          href={mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-medium
                     text-[var(--color-primary)] hover:text-[var(--color-accent)]
                     transition-colors duration-200 group"
        >
          {en.events.getDirections}
          <span className="transition-transform duration-200 group-hover:translate-x-1">
            <ArrowRightIcon />
          </span>
        </a>
      </div>

      {/* Embedded Google Map */}
      <div className="h-48 sm:h-56 w-full overflow-hidden">
        <iframe
          src={venue.mapUrl}
          title={`Map — ${venue.name}`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale hover:grayscale-0 transition-all duration-500"
        />
      </div>
    </motion.div>
  );
}

// ── Event Details Section ─────────────────────────────────────────────────────

/**
 * Shows ceremony and reception venue cards with:
 * - Address, time, description
 * - Embedded Google Map per venue
 * - External Google Maps link for directions
 */
export default function EventDetails() {
  const { event } = weddingConfig;

  return (
    <SectionWrapper id="events" bg="default">
      <div className="container-custom">

        {/* ── Section Header ── */}
        <div className="text-center mb-14">
          <p className="section-label mb-3">{en.events.sectionLabel}</p>
          <h2 className="section-heading">{en.events.heading}</h2>
          <p className="text-[var(--color-text)]/60 font-sans mt-3">
            {formatDate(event.date, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
          <div className="w-16 h-px bg-gold mx-auto mt-4" />
        </div>

        {/* ── Venue Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <VenueCard
            venue={event.ceremony}
            type={en.events.ceremony}
            index={0}
          />
          <VenueCard
            venue={event.reception}
            type={en.events.reception}
            index={1}
          />
        </div>

      </div>
    </SectionWrapper>
  );
}

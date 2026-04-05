'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { weddingConfig } from '@/config/wedding';
import en from '@/locales/en.json';

// ── Person Card ───────────────────────────────────────────────────────────────

function PersonCard({
  name, fullName, photo, shortBio, role, delay = 0,
}: {
  name: string;
  fullName: string;
  photo: string;
  shortBio: string;
  role: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center text-center group"
    >
      {/* Photo */}
      <div className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full overflow-hidden mb-6
                      ring-4 ring-champagne-200 dark:ring-champagne-700
                      group-hover:ring-gold-DEFAULT transition-all duration-500 shadow-xl">
        <Image
          src={photo}
          alt={fullName}
          fill
          sizes="(max-width: 768px) 200px, 256px"
          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Role badge */}
      <span className="section-label mb-1">{role}</span>

      {/* Name */}
      <h3 className="font-serif text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-3">
        {fullName}
      </h3>

      {/* Bio */}
      <p className="text-[var(--color-text)]/70 font-sans text-sm sm:text-base leading-relaxed max-w-xs">
        {shortBio}
      </p>
    </motion.div>
  );
}

// ── Timeline Entry ────────────────────────────────────────────────────────────

function TimelineEntry({
  year, title, description, index,
}: {
  year: string;
  title: string;
  description: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex md:items-center md:justify-between gap-6 md:gap-0 ${
        isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* Content card */}
      <div className={`flex-1 md:max-w-[43%] ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
        <div className="bg-champagne-50 dark:bg-champagne-900/20 rounded-2xl p-5 md:p-6
                        border border-champagne-200 dark:border-champagne-700/30
                        hover:border-gold-DEFAULT/50 transition-colors duration-300 shadow-sm">
          <span className="section-label block mb-1">{year}</span>
          <h4 className="font-serif text-xl font-bold text-[var(--color-text)] mb-2">{title}</h4>
          <p className="text-[var(--color-text)]/70 font-sans text-sm leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Center dot (desktop) */}
      <div className="hidden md:flex flex-col items-center flex-shrink-0 w-10">
        <div
          className="w-4 h-4 rounded-full border-2 border-gold-DEFAULT bg-cream dark:bg-[#1A1410] z-10"
          style={{ boxShadow: '0 0 0 4px var(--color-primary)20' }}
        />
      </div>

      {/* Empty space on the other side */}
      <div className="hidden md:block flex-1 md:max-w-[43%]" />
    </motion.div>
  );
}

// ── About Section ─────────────────────────────────────────────────────────────

/**
 * "Our Story" section with:
 * - Bride & groom portrait cards
 * - Vertical timeline of their relationship milestones
 */
export default function AboutUs() {
  const { couple } = weddingConfig;

  return (
    <SectionWrapper id="about" bg="muted">
      <div className="container-custom">

        {/* ── Section Header ── */}
        <div className="text-center mb-16">
          <p className="section-label mb-3">{en.about.sectionLabel}</p>
          <h2 className="section-heading">{en.about.heading}</h2>
          <div className="w-16 h-px bg-gold-DEFAULT mx-auto mt-4" />
        </div>

        {/* ── Couple Photos ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12 mb-20 max-w-3xl mx-auto">
          <PersonCard
            {...couple.bride}
            role={en.about.brideLabel}
            delay={0}
          />
          <PersonCard
            {...couple.groom}
            role={en.about.groomLabel}
            delay={0.15}
          />
        </div>

        {/* ── Story Timeline ── */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical center line (desktop) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-2 bottom-2
                           w-px bg-gradient-to-b from-transparent via-gold-DEFAULT/40 to-transparent" />

          <div className="flex flex-col gap-8 md:gap-10">
            {couple.story.map((entry, i) => (
              <TimelineEntry key={entry.year} {...entry} index={i} />
            ))}
          </div>
        </div>

      </div>
    </SectionWrapper>
  );
}

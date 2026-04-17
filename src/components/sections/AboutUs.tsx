'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'framer-motion';
import Image from 'next/image';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { weddingConfig } from '@/config/wedding';
import en from '@/locales/en.json';
import type { PersonInfo } from '@/types';

// ── Portrait Card ─────────────────────────────────────────────────────────────

function PortraitCard({ person, delay = 0 }: { person: PersonInfo; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex gap-5 items-start p-6 rounded-2xl
                 bg-champagne-50 dark:bg-champagne-900/20
                 border border-champagne-200 dark:border-champagne-700/30"
    >
      <div className="relative w-20 h-20 flex-shrink-0 rounded-full overflow-hidden
                      ring-2 ring-[var(--color-primary)]/40">
        <Image
          src={person.photo}
          alt={person.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>
      <div>
        <h4 className="font-serif text-xl font-bold text-[var(--color-text)]">{person.name}</h4>
        <p className="text-sm text-[var(--color-text)]/60 font-sans leading-relaxed mt-1.5">
          {person.shortBio}
        </p>
      </div>
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
                        hover:border-gold/50 transition-colors duration-300 shadow-sm">
          <span className="section-label block mb-1">{year}</span>
          <h4 className="font-serif text-xl font-bold text-[var(--color-text)] mb-2">{title}</h4>
          <p className="text-[var(--color-text)]/70 font-sans text-sm leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Center dot (desktop) */}
      <div className="hidden md:flex flex-col items-center flex-shrink-0 w-10">
        <div
          className="w-4 h-4 rounded-full border-2 border-gold bg-cream dark:bg-[#1A1410] z-10"
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
          <div className="w-16 h-px bg-gold mx-auto mt-4" />
        </div>

        {/* ── Portrait Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-16 max-w-3xl mx-auto">
          <PortraitCard person={couple.bride} delay={0} />
          <PortraitCard person={couple.groom} delay={0.12} />
        </div>

        {/* ── Story Timeline ── */}
        <div className="relative max-w-3xl mx-auto">
          {/* Vertical center line (desktop) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-2 bottom-2
                           w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />

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

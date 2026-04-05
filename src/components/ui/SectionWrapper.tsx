'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

// ── Types ─────────────────────────────────────────────────────────────────────

type BgVariant = 'default' | 'muted' | 'dark' | 'transparent';

interface SectionWrapperProps {
  id?:           string;
  bg?:           BgVariant;
  className?:    string;
  children:      React.ReactNode;
  /** If false, disables the scroll-triggered fade-in */
  animate?:      boolean;
}

// ── Background Variants ───────────────────────────────────────────────────────

const bgClasses: Record<BgVariant, string> = {
  default:     'bg-cream dark:bg-[#1A1410]',
  muted:       'bg-champagne-50/60 dark:bg-[#201810]',
  dark:        'bg-[#2D2014] dark:bg-[#120D08] text-cream',
  transparent: 'bg-transparent',
};

// ── Animation Variants ────────────────────────────────────────────────────────

const sectionVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

// ── Component ─────────────────────────────────────────────────────────────────

/**
 * Consistent section wrapper with:
 * - Background color variant
 * - Scroll-triggered fade-in animation (Framer Motion)
 * - Standard padding via section-padding CSS class
 */
export default function SectionWrapper({
  id,
  bg = 'default',
  className,
  children,
  animate = true,
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);

  // Trigger animation when 15% of the section enters the viewport
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  if (!animate) {
    return (
      <section
        id={id}
        ref={ref}
        className={cn('section-padding', bgClasses[bg], className)}
      >
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      ref={ref}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className={cn('section-padding', bgClasses[bg], className)}
    >
      {children}
    </motion.section>
  );
}

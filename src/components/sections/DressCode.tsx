'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { weddingConfig } from '@/config/wedding';
import en from '@/locales/en.json';
import type { DressColor } from '@/types';

// ── Color Swatch ──────────────────────────────────────────────────────────────

function ColorSwatch({ color, delay = 0 }: { color: DressColor; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: 'backOut' }}
      className="flex flex-col items-center gap-2 group"
    >
      {/* Circle swatch */}
      <div
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-md
                   ring-2 ring-transparent group-hover:ring-[var(--color-primary)]
                   transition-all duration-300 group-hover:scale-110"
        style={{ backgroundColor: color.hex }}
        title={color.name}
      />
      {/* Color name */}
      <span className="text-xs text-center text-[var(--color-text)]/60 font-sans">
        {color.name}
      </span>
      {/* Hex */}
      <span className="text-xs text-center text-[var(--color-text)]/40 font-mono">
        {color.hex}
      </span>
    </motion.div>
  );
}

// ── Attire Suggestion Row ─────────────────────────────────────────────────────

function AttireSuggestion({
  icon, gender, items, delay,
}: {
  icon: React.ReactNode;
  gender: string;
  items: string[];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-start gap-4 p-5 rounded-2xl
                 bg-champagne-50 dark:bg-champagne-900/20
                 border border-champagne-200 dark:border-champagne-700/30"
    >
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="font-serif font-bold text-[var(--color-text)] mb-1">{gender}</p>
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item} className="text-sm text-[var(--color-text)]/70 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-[var(--color-primary)] flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ── Dress Code Section ────────────────────────────────────────────────────────

/**
 * Dress code section with:
 * - Style description
 * - Attire suggestions for men and women
 * - Color palette swatches
 * - Important note callout
 */
export default function DressCode() {
  const { dressCode } = weddingConfig;

  return (
    <SectionWrapper id="dresscode" bg="muted">
      <div className="container-custom">

        {/* ── Section Header ── */}
        <div className="text-center mb-12">
          <p className="section-label mb-3">{en.dressCode.sectionLabel}</p>
          <h2 className="section-heading">{en.dressCode.heading}</h2>
          <div className="w-16 h-px bg-gold mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* ── Left column: description + attire ── */}
          <div>
            {/* Style badge */}
            <div className="inline-block bg-[var(--color-primary)] text-white
                            font-sans text-sm font-semibold tracking-wide
                            px-5 py-2 rounded-full mb-5 shadow-sm">
              {dressCode.style}
            </div>

            {/* Description */}
            <p className="text-[var(--color-text)]/80 font-sans text-base leading-relaxed mb-8">
              {dressCode.description}
            </p>

            {/* Attire suggestions */}
            <div className="space-y-4">
              <AttireSuggestion
                icon="👗"
                gender="Для неё"
                delay={0.1}
                items={[
                  'Вечернее платье в пол',
                  'Элегантное коктейльное платье',
                  'Платье миди в торжественном стиле',
                  'Стильный брючный костюм или комбинезон',
                ]}
              />
              <AttireSuggestion
                icon="🤵"
                gender="Для него"
                delay={0.2}
                items={[
                  'Чёрный смокинг или торжественный костюм',
                  'Тёмно-синий или антрацитовый костюм',
                  'Белая классическая рубашка с галстуком',
                  'Оксфорды или классические лоферы',
                ]}
              />
            </div>
          </div>

          {/* ── Right column: color palette + note ── */}
          <div>
            <h3 className="font-serif text-xl font-bold text-[var(--color-text)] mb-6">
              {en.dressCode.colorPalette}
            </h3>

            {/* Color swatches */}
            <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-10">
              {dressCode.colors.map((color, i) => (
                <ColorSwatch key={color.hex} color={color} delay={i * 0.07} />
              ))}
            </div>

            {/* Visual swatch strip */}
            <div className="flex rounded-full overflow-hidden h-4 mb-10 shadow-sm">
              {dressCode.colors.map((color) => (
                <div
                  key={color.hex}
                  className="flex-1"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>

            {/* Important note */}
            <div className="rounded-2xl border-l-4 bg-champagne-50 dark:bg-champagne-900/20
                            border-l-[var(--color-primary)] p-5">
              <p className="section-label mb-2">{en.dressCode.pleaseNote}</p>
              <p className="text-[var(--color-text)]/70 font-sans text-sm leading-relaxed">
                {dressCode.notes}
              </p>
            </div>
          </div>

        </div>
      </div>
    </SectionWrapper>
  );
}

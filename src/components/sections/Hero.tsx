'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useCountdown } from '@/hooks/useCountdown';
import { weddingConfig } from '@/config/wedding';
import { formatDate, pad } from '@/lib/utils';
import Button from '@/components/ui/Button';
import en from '@/locales/en.json';

// ── Countdown Unit ────────────────────────────────────────────────────────────

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="glass rounded-xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mb-1">
        <span className="font-serif text-2xl sm:text-3xl font-bold text-white">
          {pad(value)}
        </span>
      </div>
      <span className="text-xs tracking-[0.15em] uppercase text-white/70 font-sans">
        {label}
      </span>
    </div>
  );
}

// ── Hero Section ─────────────────────────────────────────────────────────────

/**
 * Full-screen hero with:
 * - Background image with dark overlay
 * - Animated couple names
 * - Live countdown timer
 * - RSVP CTA button
 */
export default function Hero() {
  const { couple, event } = weddingConfig;
  const countdown = useCountdown(event.date);
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToRsvp = () => {
    document.querySelector('#rsvp')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Stagger container for children
  const containerVariants = {
    hidden:  {},
    visible: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden:  { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* ── Background Image ── */}
      <Image
        src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=85"
        alt="Wedding background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* ── Gradient Overlay ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

      {/* ── Decorative corner ornaments ── */}
      <div className="absolute top-8 left-8 w-16 h-16 border-t border-l border-white/20 hidden sm:block" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t border-r border-white/20 hidden sm:block" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b border-l border-white/20 hidden sm:block" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b border-r border-white/20 hidden sm:block" />

      {/* ── Content ── */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center text-white px-4 sm:px-6 max-w-4xl mx-auto"
      >
        {/* Event date */}
        <motion.p
          variants={itemVariants}
          className="section-label text-white/80 mb-4"
        >
          {formatDate(event.date)}
        </motion.p>

        {/* Decorative divider */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 mb-6">
          <div className="h-px w-12 bg-white/40" />
          <span className="text-white/60 text-xl">✦</span>
          <div className="h-px w-12 bg-white/40" />
        </motion.div>

        {/* Couple names */}
        <motion.h1
          variants={itemVariants}
          className="font-serif font-bold text-5xl sm:text-7xl md:text-8xl leading-none mb-3"
          style={{ textShadow: '0 2px 20px rgba(0,0,0,0.3)' }}
        >
          {couple.bride.name}
          <span className="block sm:inline text-gold"> &amp; </span>
          {couple.groom.name}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-white/80 font-sans font-light tracking-widest uppercase mb-10"
        >
          {en.hero.subtitle}
        </motion.p>

        {/* ── Countdown Timer ── */}
        {!countdown.isPast && (
          <motion.div variants={itemVariants} className="mb-10">
            <p className="section-label text-white/60 mb-4">
              {en.hero.countdownLabel}
            </p>
            <div className="flex items-start justify-center gap-3 sm:gap-5">
              <CountdownUnit value={countdown.days}    label={en.countdown.days}    />
              <span className="text-white/60 text-2xl font-serif mt-3">:</span>
              <CountdownUnit value={countdown.hours}   label={en.countdown.hours}   />
              <span className="text-white/60 text-2xl font-serif mt-3">:</span>
              <CountdownUnit value={countdown.minutes} label={en.countdown.minutes} />
              <span className="text-white/60 text-2xl font-serif mt-3">:</span>
              <CountdownUnit value={countdown.seconds} label={en.countdown.seconds} />
            </div>
          </motion.div>
        )}

        {/* CTA Button */}
        <motion.div variants={itemVariants}>
          <Button
            onClick={scrollToRsvp}
            size="lg"
            className="bg-white/10 hover:bg-white/20 border border-white/60 text-white backdrop-blur-sm tracking-widest"
          >
            {en.hero.rsvpButton}
          </Button>
        </motion.div>
      </motion.div>

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs tracking-widest uppercase font-sans">
          {en.hero.scrollHint}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-10 bg-gradient-to-b from-white/50 to-transparent"
        />
      </motion.div>
    </section>
  );
}

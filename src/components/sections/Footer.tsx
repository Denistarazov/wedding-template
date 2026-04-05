'use client';

import { motion } from 'framer-motion';
import { weddingConfig } from '@/config/wedding';
import { formatDate } from '@/lib/utils';
import en from '@/locales/en.json';

// ── Nav links for footer ──────────────────────────────────────────────────────

const footerLinks = [
  { label: en.nav.about,     href: '#about'     },
  { label: en.nav.events,    href: '#events'    },
  { label: en.nav.dressCode, href: '#dresscode' },
  { label: en.nav.gallery,   href: '#gallery'   },
  { label: en.nav.rsvp,      href: '#rsvp'      },
];

// ── Heart Divider ─────────────────────────────────────────────────────────────

function HeartDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-8">
      <div className="h-px w-20 bg-white/20" />
      <svg
        className="w-5 h-5 text-[var(--color-primary)]"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
      </svg>
      <div className="h-px w-20 bg-white/20" />
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

/**
 * Full-width footer with:
 * - Couple names and wedding date
 * - Navigation links
 * - Copyright notice
 */
export default function Footer() {
  const { couple, event } = weddingConfig;

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2D2014] dark:bg-[#120D08] text-cream">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          {/* Couple names */}
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-3">
            {couple.bride.name}
            <span className="text-[var(--color-primary)]"> &amp; </span>
            {couple.groom.name}
          </h2>

          {/* Date */}
          <p className="text-white/60 font-sans tracking-widest text-sm uppercase">
            {formatDate(event.date, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <HeartDivider />

          {/* Tagline */}
          <p className="text-white/50 font-serif italic text-lg mb-8">
            {en.footer.tagline}
          </p>

          {/* Navigation */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-10">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                    className="text-sm text-white/50 hover:text-white transition-colors duration-200 font-sans"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Divider */}
          <div className="h-px w-full bg-white/10 mb-8" />

          {/* Copyright */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-white/30 text-xs font-sans">
            <span>
              &copy; {new Date().getFullYear()} {couple.bride.fullName} &amp; {couple.groom.fullName}
            </span>
            <span>{en.footer.copyright}</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

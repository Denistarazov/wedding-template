'use client';

import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { weddingConfig } from '@/config/wedding';
import en from '@/locales/en.json';

// ── Nav Links ─────────────────────────────────────────────────────────────────

const navLinks = [
  { label: en.nav.about,    href: '#about'     },
  { label: en.nav.events,   href: '#events'    },
  { label: en.nav.dressCode,href: '#dresscode' },
  { label: en.nav.gallery,  href: '#gallery'   },
  { label: en.nav.rsvp,     href: '#rsvp'      },
];

// ── Sun / Moon Icons ──────────────────────────────────────────────────────────

function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707M17.657 17.657l.707.707M6.343 6.343l.707-.707M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false);
  const [mobileOpen,  setMobileOpen]  = useState(false);
  const [mounted,     setMounted]     = useState(false);
  const { theme, setTheme } = useTheme();

  const { bride, groom } = weddingConfig.couple;

  // Track scroll to add background on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Avoid hydration mismatch for theme icon
  useEffect(() => setMounted(true), []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-cream/95 dark:bg-[#1A1410]/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent',
        )}
      >
        <nav className="container-custom flex items-center justify-between h-16 md:h-20">
          {/* Logo — couple names */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleLinkClick('#hero'); }}
            className="font-serif text-xl font-bold tracking-tight"
            style={{ color: 'var(--color-primary)' }}
          >
            {bride.name} &amp; {groom.name}
          </a>

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                  className={cn(
                    'text-sm font-medium tracking-wide transition-colors duration-200',
                    'text-[var(--color-text)] hover:text-[var(--color-primary)]',
                    link.href === '#rsvp' &&
                      'px-4 py-1.5 rounded-full border border-[var(--color-primary)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white',
                  )}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right side — theme toggle + mobile burger */}
          <div className="flex items-center gap-3">
            {/* Dark mode toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
                className={cn(
                  'p-2 rounded-full transition-colors duration-200',
                  'text-[var(--color-text)] hover:text-[var(--color-primary)]',
                  'hover:bg-champagne-100 dark:hover:bg-champagne-900/20',
                )}
              >
                {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
              </button>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle mobile menu"
              className="md:hidden p-2 rounded-full hover:bg-champagne-100 dark:hover:bg-champagne-900/20 transition-colors"
            >
              <span className="block w-5 h-px bg-current mb-1 transition-all" />
              <span className="block w-5 h-px bg-current mb-1 transition-all" />
              <span className="block w-5 h-px bg-current transition-all" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className={cn(
              'fixed top-16 left-0 right-0 z-40',
              'bg-cream/97 dark:bg-[#1A1410]/97 backdrop-blur-md',
              'shadow-lg border-t border-champagne-200 dark:border-champagne-900/30',
            )}
          >
            <ul className="flex flex-col py-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                    className={cn(
                      'block px-6 py-3 text-base font-medium',
                      'text-[var(--color-text)] hover:text-[var(--color-primary)]',
                      'hover:bg-champagne-50 dark:hover:bg-champagne-900/20',
                      'transition-colors duration-150',
                    )}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

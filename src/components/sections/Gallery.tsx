'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';
import { weddingConfig } from '@/config/wedding';
import en from '@/locales/en.json';
import type { GalleryImage } from '@/types';

// ── Gallery Thumbnail ─────────────────────────────────────────────────────────

function GalleryThumb({
  image,
  index,
  onClick,
}: {
  image: GalleryImage;
  index: number;
  onClick: (index: number) => void;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: 'easeOut' }}
      onClick={() => onClick(index)}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary)]
                  ${image.tall ? 'row-span-2' : ''}`}
      style={{ aspectRatio: image.tall ? '3/4' : '4/3' }}
      aria-label={`Open photo: ${image.alt}`}
    >
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25
                      transition-all duration-300 flex items-center justify-center">
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300
                        w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm
                        flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
          </svg>
        </div>
      </div>
    </motion.button>
  );
}

// ── Lightbox ──────────────────────────────────────────────────────────────────

function Lightbox({
  images,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: {
  images: GalleryImage[];
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const image = images[activeIndex];

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft')  onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      {/* Image container */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.92 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-w-5xl max-h-[85vh] w-full h-full"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 80vw"
          className="object-contain rounded-xl"
          priority
        />
      </motion.div>

      {/* Close */}
      <button
        onClick={onClose}
        aria-label={en.gallery.close}
        className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10
                   hover:bg-white/20 text-white flex items-center justify-center
                   transition-colors duration-200"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        aria-label={en.gallery.prev}
        disabled={activeIndex === 0}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                   bg-white/10 hover:bg-white/20 text-white flex items-center justify-center
                   transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        aria-label={en.gallery.next}
        disabled={activeIndex === images.length - 1}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                   bg-white/10 hover:bg-white/20 text-white flex items-center justify-center
                   transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-sans">
        {activeIndex + 1} / {images.length}
      </div>
    </motion.div>
  );
}

// ── Gallery Section ───────────────────────────────────────────────────────────

/**
 * Masonry-style photo gallery with:
 * - Animated thumbnails on scroll
 * - Click to open lightbox
 * - Keyboard navigation (← → Esc)
 */
export default function Gallery() {
  const { gallery } = weddingConfig;
  const images = gallery.images;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const openAt  = useCallback((i: number) => setActiveIndex(i), []);
  const close   = useCallback(() => setActiveIndex(null), []);
  const prev    = useCallback(() => setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const next    = useCallback(() => setActiveIndex((i) => (i !== null && i < images.length - 1 ? i + 1 : i)), [images.length]);

  return (
    <>
      <SectionWrapper id="gallery" bg="muted" animate={false}>
        <div className="container-custom">

          {/* ── Section Header ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="section-label mb-3">{en.gallery.sectionLabel}</p>
            <h2 className="section-heading">{en.gallery.heading}</h2>
            <div className="w-16 h-px bg-gold-DEFAULT mx-auto mt-4" />
          </motion.div>

          {/* ── Masonry Grid ── */}
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
            {images.map((image, i) => (
              <div key={image.id} className="break-inside-avoid">
                <GalleryThumb image={image} index={i} onClick={openAt} />
              </div>
            ))}
          </div>

        </div>
      </SectionWrapper>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {activeIndex !== null && (
          <Lightbox
            images={images}
            activeIndex={activeIndex}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </>
  );
}

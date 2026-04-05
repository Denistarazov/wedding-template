/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║           WEDDING TEMPLATE — MAIN CONFIGURATION             ║
 * ║                                                              ║
 * ║  Edit every value here to customize the website for your    ║
 * ║  specific wedding. No other files need to be changed for    ║
 * ║  basic content updates.                                     ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

import type { WeddingConfig } from '@/types';

export const weddingConfig: WeddingConfig = {
  // ── Couple ────────────────────────────────────────────────────────────────
  couple: {
    bride: {
      name: 'Emma',
      fullName: 'Emma Johnson',
      // Replace with a local path like "/images/bride.jpg" or another URL
      photo:
        'https://images.unsplash.com/photo-1594552072238-b8a33785b6cd?w=600&q=80',
      shortBio:
        'A passionate architect with an eye for beauty and a love for travel. Emma finds art in everything — from city skylines to quiet gardens.',
    },
    groom: {
      name: 'Liam',
      fullName: 'Liam Anderson',
      photo:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
      shortBio:
        'An adventurous photographer who captures life\'s most beautiful moments. Liam believes every frame tells a story — and their story is his favorite.',
    },
    story: [
      {
        year: '2019',
        title: 'First Meeting',
        description:
          'We first crossed paths at a mutual friend\'s gallery opening in downtown New York. What started as a casual conversation about art turned into a three-hour walk through the city that neither of us planned.',
      },
      {
        year: '2020',
        title: 'Becoming Us',
        description:
          'Through a year the world stood still, we found comfort in each other — long phone calls, shared playlists, and a growing certainty that we were meant to be together.',
      },
      {
        year: '2022',
        title: 'The Adventure Begins',
        description:
          'We embarked on our first big adventure together — a road trip along the Pacific Coast Highway. Somewhere between Monterey and Big Sur, we realized we were perfectly in sync.',
      },
      {
        year: '2023',
        title: 'The Proposal',
        description:
          'On a quiet evening in Florence, with the golden sunset casting a warm glow over the Arno River, Liam got down on one knee and asked the question that changed everything.',
      },
      {
        year: '2027',
        title: 'Forever Begins',
        description:
          'Now, surrounded by everyone we love, we say "I do" and begin our greatest adventure yet. We are so grateful you are here to share this day with us.',
      },
    ],
  },

  // ── Event ─────────────────────────────────────────────────────────────────
  event: {
    /** ISO format: YYYY-MM-DD — drives the countdown timer */
    date: '2027-06-15',

    ceremony: {
      name: "St. Mary's Chapel",
      address: '123 Rose Garden Lane, New York, NY 10001',
      time: '4:00 PM',
      description:
        'Join us for an intimate ceremony as we exchange vows surrounded by the people we love most.',
      // Replace this embed URL with your actual Google Maps embed URL
      // Maps → Share → Embed → copy the src value from the iframe
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648718453!2d-73.98784368459477!3d40.74844397932797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus',
    },

    reception: {
      name: 'The Grand Ballroom',
      address: '456 Elegant Boulevard, New York, NY 10002',
      time: '6:30 PM',
      description:
        'Following the ceremony, join us for an evening of dinner, dancing, and unforgettable memories.',
      mapUrl:
        'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648718453!2d-73.98784368459477!3d40.74844397932797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus',
    },
  },

  // ── Dress Code ────────────────────────────────────────────────────────────
  dressCode: {
    style: 'Black Tie Optional',
    description:
      'We invite you to dress elegantly for our special day. Formal attire is warmly encouraged — think floor-length gowns or cocktail dresses for women, and dark suits or tuxedos for men.',
    colors: [
      { name: 'Blush Pink',   hex: '#F5B8C4' },
      { name: 'Champagne',    hex: '#F5E6C8' },
      { name: 'Dusty Rose',   hex: '#C4A0A0' },
      { name: 'Sage Green',   hex: '#A8C5B5' },
      { name: 'Soft Ivory',   hex: '#F8F4EC' },
      { name: 'Soft Gold',    hex: '#D4AF37' },
    ],
    notes:
      'Please avoid wearing white, cream, or ivory out of respect for the bride. We also ask that guests refrain from wearing black as the sole color.',
  },

  // ── Gallery ───────────────────────────────────────────────────────────────
  // Replace src values with your own photos (local or hosted).
  // Set tall: true for portrait-oriented images in the masonry grid.
  gallery: {
    images: [
      {
        id: '1',
        src: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
        alt: 'Couple portrait — golden hour',
        category: 'couple',
        tall: true,
      },
      {
        id: '2',
        src: 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80',
        alt: 'Wedding ceremony aisle',
        category: 'ceremony',
      },
      {
        id: '3',
        src: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80',
        alt: 'Reception table decor',
        category: 'venue',
      },
      {
        id: '4',
        src: 'https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80',
        alt: 'Floral arrangements',
        category: 'detail',
        tall: true,
      },
      {
        id: '5',
        src: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80',
        alt: 'Couple dancing',
        category: 'couple',
      },
      {
        id: '6',
        src: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
        alt: 'Wedding rings on flowers',
        category: 'detail',
      },
      {
        id: '7',
        src: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80',
        alt: 'Venue exterior at dusk',
        category: 'venue',
        tall: true,
      },
      {
        id: '8',
        src: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80',
        alt: 'Bridal party walking',
        category: 'ceremony',
      },
    ],
  },

  // ── RSVP ──────────────────────────────────────────────────────────────────
  rsvp: {
    /** RSVP deadline in ISO format */
    deadline: '2027-05-01',
    maxGuestsPerRsvp: 6,
    /** In production, wire this to an email or CRM */
    emailTo: 'emma.liam@wedding.com',
  },

  // ── Theme ─────────────────────────────────────────────────────────────────
  // These CSS custom properties are injected into :root by globals.css
  theme: {
    primaryColor: '#C9A87C',   // Warm champagne gold — main brand color
    accentColor:  '#8B6952',   // Deeper bronze — hover states, borders
  },

  // ── SEO Meta ──────────────────────────────────────────────────────────────
  meta: {
    title:       "Emma & Liam's Wedding — June 15, 2027",
    description: "Join us as we celebrate our love and begin our forever together.",
    ogImage:
      'https://images.unsplash.com/photo-1519741497674-611481863552?w=1200&q=80',
  },
};

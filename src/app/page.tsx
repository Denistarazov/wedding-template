/**
 * Main page — assembles all wedding sections in order.
 *
 * To add / remove sections: import the component and place it here.
 * To reorder sections: move the component JSX block.
 */

import Navbar       from '@/components/Navbar';
import Hero         from '@/components/sections/Hero';
import AboutUs      from '@/components/sections/AboutUs';
import EventDetails from '@/components/sections/EventDetails';
import DressCode    from '@/components/sections/DressCode';
import Gallery      from '@/components/sections/Gallery';
import RSVP         from '@/components/sections/RSVP';
import Footer       from '@/components/sections/Footer';

export default function HomePage() {
  return (
    <main>
      {/* Sticky navigation */}
      <Navbar />

      {/* Sections — each maps to a nav anchor via id="..." */}
      <Hero />
      <AboutUs />
      <EventDetails />
      <DressCode />
      <Gallery />
      <RSVP />
      <Footer />
    </main>
  );
}

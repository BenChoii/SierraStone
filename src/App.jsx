import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import StickyMobileCTA from './components/StickyMobileCTA';
import Home from './pages/Home';
import Services from './pages/Services';
import ServicePage from './pages/ServicePage';
import Gallery from './pages/Gallery';
import Colours from './pages/Colours';
import Visualizer from './pages/Visualizer';
import Testimonials from './pages/Testimonials';
import Contact from './pages/Contact';
import About from './pages/About';
import CityPage from './pages/CityPage';
import CityServicePage from './pages/CityServicePage';
import GuidesHub from './pages/GuidesHub';
import GuidePage from './pages/GuidePage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppLayout() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          {/* Core Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/colours" element={<Colours />} />
          <Route path="/visualizer" element={<Visualizer />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />

          {/* Dedicated Service Pages */}
          <Route path="/services/:serviceSlug" element={<ServicePage />} />

          {/* Guides */}
          <Route path="/guides" element={<GuidesHub />} />
          <Route path="/guides/:guideSlug" element={<GuidePage />} />

          {/* City Pages */}
          <Route path="/:citySlug" element={<CityPage />} />
          <Route path="/:citySlug/:serviceSlug" element={<CityServicePage />} />
        </Routes>
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

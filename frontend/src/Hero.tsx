import { useEffect, useRef } from "react";
import HeroSection from "./components/Sections/HeroSection/HeroSection";

import RSVPSection from "./components/Sections/RSVPSection/RSVPSection";
import CountdownSection from "./components/Sections/CountdownSection/CountdownSection";
import Footer from "./components/Sections/Footer/Footer";
import CelebrationSection from "./components/Sections/CelebrationSection/CelebrationSection";
import Gift from "./components/Sections/Gift/Gift";
import LocationSection from "./components/Sections/LocationSection/LocationSection";
import AboutUsSection from "./components/Sections/AboutUsSection/AboutUsSection";
import GallerySection from "./components/Sections/GallerySection/GallerySection";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement | null>(null);


  useEffect(() => {
    const handleScroll = () => {
      const sections = [heroRef.current];
      sections.forEach((section) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const sectionTop = rect.top + scrolled;

        const bgElement = section.querySelector(".parallax-bg") as HTMLElement;
        if (bgElement) {
          const rate = (scrolled - sectionTop) * 0.3;
          bgElement.style.transform = `translateY(${rate}px)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full">
      <HeroSection ref={heroRef} />
      <CountdownSection />
      <RSVPSection />
      <CelebrationSection />
      <LocationSection />
      <AboutUsSection />
      <Gift />
      <GallerySection />
      <Footer />
    </div>
  );
};

export default Hero;

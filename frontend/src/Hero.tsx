import {useEffect, useRef} from "react";
import HeroSection from "./components/Sections/HeroSection/HeroSection";
import StorySection from "./components/Sections/StorySection/StorySection";
import RSVPSection from "./components/Sections/RSVPSection/RSVPSection";
import CountdownSection from "./components/Sections/CountdownSection/CountdownSection";
import Footer from "./components/Sections/Footer/Footer";
import CelebrationSection from "./components/Sections/CelebrationSection/CelebrationSection";
import Gift from "./components/Sections/Gift/Gift";
import LocationSection from "./components/Sections/LocationSection/LocationSection";
import AboutUsSection from "./components/Sections/AboutUsSection/AboutUsSection";

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const storyRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [heroRef.current, storyRef.current];
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

    window.addEventListener("scroll", handleScroll, {passive: true});
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative w-full">
      <HeroSection ref={heroRef} />
      <CountdownSection />
      <AboutUsSection />
      <CelebrationSection />
      <LocationSection />
      <RSVPSection />
      <Gift />
      <Footer />
    </div>
  );
};

export default Hero;

import {forwardRef} from "react";
import desktopHero3 from "../../../assets/hero-desktop-3.png";
import "./HeroSection.css";

interface HeroSectionProps {
  // Add any props if needed in the future
}

const HeroSection = forwardRef<HTMLElement, HeroSectionProps>((_, ref) => {
  const scrollToRSVP = () => {
    document.getElementById("rsvp")?.scrollIntoView({behavior: "smooth"});
  };

  return (
    <section ref={ref} className="hero">
      <div
        className="hero-bg parallax-bg"
        style={{backgroundImage: `url(${desktopHero3})`}}
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <h1 className="hero-title">Caro & Mathi</h1>
        <p className="hero-subtitle">¡NOS CASAMOS!</p>
        <div className="hero-meta">
          <p className="hero-date">28.03.2026</p>
          <p className="hero-location">Montevideo, Uruguay</p>
        </div>
        <button className="hero-button" onClick={scrollToRSVP}>
          Confirmá tu asistencia
        </button>
      </div>
      <div className="hero-scroll">
        <div className="hero-scroll-mouse">
          <div className="hero-scroll-dot" />
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";

export default HeroSection;

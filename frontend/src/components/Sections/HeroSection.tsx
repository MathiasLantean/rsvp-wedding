import { forwardRef } from 'react';
import desktopHero3 from '../../assets/hero-desktop-3.png';

interface HeroSectionProps {
  // Add any props if needed in the future
}

const HeroSection = forwardRef<HTMLElement, HeroSectionProps>((_, ref) => {
  return (
    <section
      ref={ref}
      className="relative w-full flex items-center justify-center text-center overflow-hidden h-screen"
    >
      <div
        className="parallax-bg absolute inset-0 w-full h-[120%] will-change-transform"
        style={{
          backgroundImage: `url(${desktopHero3})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-12 max-w-4xl mx-auto">
        <h1
          className="text-5xl sm:text-6xl md:text-7xl mb-4 font-cursive text-gold animate-fade-in"
          style={{ color: 'var(--color-title-primary)' }}
        >
          Caro & Mathi
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl opacity-90 mb-6 text-white">
          ¡Nos casamos!
        </p>
        <div className="mb-6">
          {/* <Countdown targetDate={new Date('2026-03-28T00:00:00')} /> */}
        </div>
        <p className="mt-4 text-sm sm:text-base md:text-lg font-serif text-gold/70">
          28 de marzo, 2026 — Montevideo, Uruguay
        </p>
        <button className="mt-8 bg-gold text-navy font-semibold py-3 px-8 rounded-full hover:scale-105 transition-transform shadow-lg">
          Confirmar asistencia
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
        <div className="w-6 h-10 border-2 border-gold/70 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gold/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = 'HeroSection';

export default HeroSection;


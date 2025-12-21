import { useEffect, useRef } from 'react';
import RSVP from './components/RSVP';

import mobileHero from './assets/hero-mobile.jpg';
// import desktopHero from './assets/hero-desktop.jpg';
import desktopHero2 from './assets/hero-desktop-2.png';
import desktopHero3 from './assets/hero-desktop-3.png';
// import desktopHero4 from './assets/hero-desktop-4.png';

interface SectionData {
  backgroundColor?: any;
  id: string;
  title: string;
  subtitle?: string;
  content: string;
  backgroundImage?: string;
  overlay?: string;
}

const Hero: React.FC = () => {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  // Define sections with different background images
  const sections: SectionData[] = [
    {
      id: 'hero',
      title: 'Caro & Mathi',
      subtitle: '¡Nos casamos!',
      content: '28 de marzo, 2026 — Montevideo, Uruguay',
      backgroundImage: desktopHero3,
      overlay: 'bg-black/40',
    },
    {
      id: 'celebration',
      title: 'Celebración',
      content: 'Únete a nosotros en este día inolvidable',
      backgroundColor:
        'linear-gradient(to bottom, #F6C1A6 0%, #E8A598 50%, #DFA4A4 100%)',
      overlay: 'bg-black/40',
    },
    {
      id: 'story',
      title: 'Nuestra Historia',
      content: 'Dos almas que se encontraron y decidieron unirse para siempre',
      backgroundImage: desktopHero2,
      overlay: 'bg-black/45',
    },

    {
      id: 'RSVP',
      title: 'RSVP',
      content: 'Por favor confirma tu asistencia antes del 28 de febrero',
      backgroundColor:
        'linear-gradient(to bottom, #F6C1A6 0%, #E8A598 50%, #DFA4A4 100%)',
      overlay: 'bg-black/35',
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      sectionsRef.current.forEach((section) => {
        if (!section) return;
        const rect = section.getBoundingClientRect();
        const scrolled = window.pageYOffset;
        const sectionTop = rect.top + scrolled;
        const sectionHeight = rect.height;
        const scrollProgress =
          (scrolled - sectionTop + window.innerHeight) /
          (sectionHeight + window.innerHeight);

        // Parallax effect for background - moves slower than scroll
        const bgElement = section.querySelector('.parallax-bg') as HTMLElement;
        if (bgElement && scrollProgress >= 0 && scrollProgress <= 1) {
          const rate = (scrolled - sectionTop) * 0.3;
          bgElement.style.transform = `translateY(${rate}px)`;
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative w-full">
      {sections.map((section, index) => (
        <section
          key={section.id}
          ref={(el) => {
            sectionsRef.current[index] = el;
          }}
          className={`relative w-full flex items-center justify-center text-center overflow-hidden
      ${section.id === 'RSVP' ? 'min-h-[80vh]' : 'h-screen'}
    `}
        >
          {/* Parallax Background */}
          <div
            className="parallax-bg absolute inset-0 w-full h-[120%] will-change-transform"
            style={
              section.backgroundImage
                ? {
                    backgroundImage: `url(${section.backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }
                : {
                    background: section.backgroundColor,
                  }
            }
          />

          {/* Overlay */}
          <div
            className={`absolute inset-0 ${section.overlay || 'bg-black/40'}`}
          />

          {/* Content */}
          <div className="relative z-10 px-6 sm:px-12 max-w-4xl mx-auto">
            {section.id === 'hero' ? (
              <>
                <h1
                  className="text-5xl sm:text-6xl md:text-7xl mb-4 font-cursive text-gold animate-fade-in"
                  style={{ color: 'var(--color-title-primary)' }}
                >
                  {section.title}
                </h1>
                <p className="text-xl sm:text-2xl md:text-3xl opacity-90 mb-6 text-white">
                  {section.subtitle}
                </p>
                <div className="mb-6">
                  {/* <Countdown targetDate={new Date('2026-03-28T00:00:00')} /> */}
                </div>
                <p className="mt-4 text-sm sm:text-base md:text-lg font-serif text-gold/70">
                  {section.content}
                </p>
                <button className="mt-8 bg-gold text-navy font-semibold py-3 px-8 rounded-full hover:scale-105 transition-transform shadow-lg">
                  Confirmar asistencia
                </button>
              </>
            ) : section.id === 'RSVP' ? (
              <>
                <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6 font-cursive text-gold">
                  {section.title}
                </h2>
                <p className="text-lg sm:text-xl mb-8 text-white/90">
                  {section.content}
                </p>
                <div className="flex justify-center mt-12">
                  <RSVP />
                </div>
              </>
            ) : (
              <>
                <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6 font-cursive text-gold">
                  {section.title}
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                  {section.content}
                </p>
              </>
            )}
          </div>

          {/* Scroll indicator (only on first section) */}
          {index === 0 && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 animate-bounce">
              <div className="w-6 h-10 border-2 border-gold/70 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-gold/70 rounded-full mt-2 animate-pulse" />
              </div>
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

export default Hero;

import { forwardRef } from 'react';
import desktopHero2 from '../../assets/hero-desktop-2.png';

interface StorySectionProps {
  // Add any props if needed in the future
}

const StorySection = forwardRef<HTMLElement, StorySectionProps>((_, ref) => {
  return (
    <section
      ref={ref}
      className="relative w-full flex items-center justify-center text-center overflow-hidden h-screen"
    >
      <div
        className="parallax-bg absolute inset-0 w-full h-[120%] will-change-transform"
        style={{
          backgroundImage: `url(${desktopHero2})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div className="absolute inset-0 bg-black/45" />

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-12 max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6 font-cursive text-gold">
          Nuestra Historia
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          Dos almas que se encontraron y decidieron unirse para siempre
        </p>
      </div>
    </section>
  );
});

StorySection.displayName = 'StorySection';

export default StorySection;


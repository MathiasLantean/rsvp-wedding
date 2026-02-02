const CelebrationSection: React.FC = () => {
  return (
    <section className="relative w-full flex items-center justify-center text-center overflow-hidden h-screen">
      <div
        className="absolute inset-0 w-full"
        style={{
          background: 'linear-gradient(to bottom, #F6C1A6 0%, #E8A598 50%, #DFA4A4 100%)',
        }}
      />
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-12 max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6 font-cursive text-gold">
          Celebración
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          Únete a nosotros en este día inolvidable
        </p>
      </div>
    </section>
  );
};

export default CelebrationSection;


import RSVP from '../RSVP';

const RSVPSection: React.FC = () => {
  return (
    <section className="relative w-full flex items-center justify-center text-center overflow-hidden min-h-[80vh]">
      <div
        className="absolute inset-0 w-full"
        style={{
          background: 'linear-gradient(to bottom, #F6C1A6 0%, #E8A598 50%, #DFA4A4 100%)',
        }}
      />
      <div className="absolute inset-0 bg-black/35" />

      {/* Content */}
      <div className="relative z-10 px-6 sm:px-12 max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl mb-6 font-cursive text-gold">
          Confirmación de asistencia
        </h2>
        <p className="text-lg sm:text-xl mb-8 text-white/90">
          Por favor confirma tu asistencia antes del 28 de febrero
        </p>
        <div className="flex justify-center mt-12">
          <RSVP />
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;


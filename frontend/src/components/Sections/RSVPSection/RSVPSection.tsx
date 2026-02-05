import RSVP from "../../ui/RSVP/RSVP";
import "./RSVPSection.css";

const RSVPSection: React.FC = () => {
  return (
    <section id="rsvp" className="rsvp-section">
      <div className="rsvp-section-content">
        <h2 className="rsvp-section-title">¿Venís a celebrar con nosotros?</h2>
        <p className="rsvp-section-text">
          Esperamos tu confirmación hasta el 28 de febrero
        </p>
        <div className="rsvp-section-form">
          <RSVP />
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;

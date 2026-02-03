import RSVP from "../../ui/RSVP/RSVP";
import "./RSVPSection.css";

const RSVPSection: React.FC = () => {
  return (
    <section id="rsvp" className="rsvp">
      <div className="rsvp-bg" />
      <div className="rsvp-overlay" />
      <div className="rsvp-content">
        <h2 className="rsvp-title">¿Venís a celebrar con nosotros?</h2>
        <p className="rsvp-text">
          Esperamos tu confirmación hasta el 28 de febrero
        </p>
        <div className="rsvp-form">
          <RSVP />
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;

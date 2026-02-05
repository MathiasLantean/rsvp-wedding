import {useState} from "react";
import RSVP from "../../ui/RSVP/RSVP";
import "./RSVPSection.css";

const RSVPSection: React.FC = () => {
  const [hasAttendingGuests, setHasAttendingGuests] = useState(false);

  return (
    <section id="rsvp" className="rsvp-section">
      <div className="rsvp-section-content">
        <h2 className="rsvp-section-title">¿Venís a celebrar con nosotros?</h2>
        <p className="rsvp-section-text">
          {hasAttendingGuests
            ? "¡Te esperamos el 28 de marzo!"
            : "Esperamos tu confirmación hasta el 28 de febrero"}
        </p>
        <div className="rsvp-section-form">
          <RSVP onConfirmAttendance={setHasAttendingGuests} />
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;

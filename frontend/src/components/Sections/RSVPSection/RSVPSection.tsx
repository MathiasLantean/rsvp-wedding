import {useState} from "react";
import RSVP from "../../ui/RSVP/RSVP";
import "./RSVPSection.css";

const RSVPSection: React.FC = () => {
  const [attendingGuests, setAttendingGuests] = useState<number | null>(null);

  const getHeaderMessage = () => {
    if (attendingGuests === null) {
      return "Esperamos tu confirmación hasta el 28 de febrero";
    }
    if (attendingGuests === 0) {
      return "Si cambian los planes, todavía están a tiempo de avisarnos";
    }
    return "¡Te esperamos el 28 de marzo!";
  };

  return (
    <section id="rsvp" className="rsvp-section">
      <div className="rsvp-section-content">
        <h2 className="rsvp-section-title">¿Venís a celebrar con nosotros?</h2>
        <p className="rsvp-section-text">{getHeaderMessage()}</p>
        <div className="rsvp-section-form">
          <RSVP onConfirmAttendance={setAttendingGuests} />
        </div>
      </div>
    </section>
  );
};

export default RSVPSection;

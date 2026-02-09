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

  const googleCalendarLink =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    "&text=Casamiento+de+Caro+y+Mathi+💍" +
    "&dates=20260328T180000/20260329T023000" +
    "&ctz=America%2FMontevideo" +
    "&details=¡Te esperamos para celebrar nuestro casamiento!" +
    "&location=Los Tilos, Cno. del Tropero 4750, 12800 Montevideo, Departamento de Montevideo, Uruguay";

  return (
    <section id="rsvp" className="rsvp-section">
      <div className="rsvp-section-content">
        <h2 className="rsvp-section-title">¿Venís a celebrar con nosotros?</h2>
        <p className="rsvp-section-text">{getHeaderMessage()}</p>
        <div className="rsvp-section-form">
          <RSVP onConfirmAttendance={setAttendingGuests} />
        </div>
        {attendingGuests !== null && attendingGuests > 0 && (
          <div className="rsvp-section-calendar">
            <a
              href={googleCalendarLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rsvp-calendar-button"
            >
              Agendar en Google Calendar
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default RSVPSection;

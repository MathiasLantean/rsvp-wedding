import {useState} from "react";
import {Input} from "../input";
import {Textarea} from "../textarea";
import {Label} from "../label";
import "./RSVP.css";
import {getGuestInfo, submitRSVP, type guestType} from "../../../api/api";
import {Select} from "../select";
import {Modal} from "../modal";

interface RSVPProps {
  onConfirmAttendance: (count: number) => void;
}

const RSVP: React.FC<RSVPProps> = ({onConfirmAttendance}) => {
  const [formData, setFormData] = useState<{
    phone: string;
    guests: guestType[];
    message: string;
  }>({
    phone: "",
    guests: [],
    message: "",
  });

  const googleCalendarUrl =     "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=Casamiento+de+Caro+y+Mathi+💍" +
  "&dates=20260328T180000/20260329T023000" +
  "&ctz=America%2FMontevideo" +
  "&details=¡Te esperamos para celebrar nuestro casamiento!" +
  "&location=Los Tilos, Cno. del Tropero 4750, 12800 Montevideo, Departamento de Montevideo, Uruguay";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);
    try {
      setIsLoading(true);
      const response = await submitRSVP(formData);
      console.log("RSVP submitted successfully:", response);

      onConfirmAttendance(attendingCount);

      setIsModalOpen(false);
      setSubmitted(true);
    } catch (error) {
      console.error("Error submitting RSVP", error);
      setErrorMessage(
        "Hubo un problema al enviar tu confirmación. Intenta nuevamente.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const addEventToCalendar = () => {
    window.open(googleCalendarUrl, "_blank", "noopener,noreferrer");
  };

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const attendingCount = formData.guests.filter(
    (guest) => guest.attending,
  ).length;

  const getConfirmationMessage = () => {
    if (attendingCount === 0) {
      return "Nos pone tristes saber que no podrán acompañarnos, los vamos a extrañar 🤍";
    }
    if (attendingCount === 1) {
      return "¡Qué bueno que nos puedas acompañar! 💕";
    }
    return "¡Qué bueno que nos puedan acompañar! 💕";
  };

  const searchGuestInfo = async (cellphone: string) => {
    if (!cellphone || cellphone.trim().length < 8) {
      setErrorMessage("Ingresa un número de teléfono válido.");
      return;
    }

    try {
      setIsLoading(true);
      setErrorMessage(null);
      const res = await getGuestInfo(cellphone);

      setFormData((prev) => ({
        ...prev,
        phone: cellphone,
        guests: res.guests as guestType[],
        message: res.message,
      }));
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error searching guest info", error);
      setErrorMessage("No encontramos una invitación asociada a ese número.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFieldChange = <K extends keyof typeof formData>(
    field: K,
    value: (typeof formData)[K],
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateGuest = (guestName: string, updates: Partial<guestType>) => {
    setFormData((prev) => ({
      ...prev,
      guests: prev.guests.map((guest) =>
        guest.name === guestName ? {...guest, ...updates} : guest,
      ),
    }));
  };

  const resetToPhoneStep = () => {
    setIsModalOpen(false);
    setFormData({
      phone: "",
      guests: [],
      message: "",
    });
  };

  const handleEditResponse = () => {
    setSubmitted(false);
    resetToPhoneStep();
  };

  return (
    <div className="rsvp-wrapper">
      {isLoading && submitted && (
        <div className="rsvp-success">
          <h2 className="rsvp-success-title">¡Gracias por responder!</h2>
          <p className="rsvp-success-text">{getConfirmationMessage()}</p>

          <button
            type="button"
            className="rsvp-button rsvp-button-edit"
            onClick={handleEditResponse}
          >
            Modificar respuesta
          </button>
        </div>
      )}

      {/* 098774807 */}

      {!submitted ? (
        <form onSubmit={handleSubmit} className="rsvp-form">
          {/* Phone */}
          {formData.guests.length === 0 && (
            <div className="rsvp-field">
              <div className="rsvp-field-number">
                <Label htmlFor="phone" className="rsvp-label">
                  Ingresa tu número de teléfono
                </Label>
                <Input
                  id="phone"
                  variant="search"
                  value={formData.phone}
                  disabled={isLoading}
                  onChange={(e) => {
                    setErrorMessage(null);
                    handleFieldChange("phone", e.target.value);
                  }}
                  onSearch={searchGuestInfo}
                  placeholder="Ej. 0991234567"
                  className="rsvp-input"
                />
                {errorMessage && (
                  <p className="rsvp-error-text">{errorMessage}</p>
                )}
              </div>
              <button
                type="button"
                className="rsvp-button-submit-number"
                onClick={() => searchGuestInfo(formData.phone)}
                disabled={!!errorMessage}
              >
                Listo
              </button>
            </div>
          )}

          <Modal open={isModalOpen} onClose={resetToPhoneStep}>
            <div className="rsvp-modal-wrapper">
              <div className="rsvp-modal-wrapper-body">
                <h2 className="rsvp-guest-title">Confirma tu asistencia</h2>
                <div className="rsvp-guests">
                  {formData.guests.map((guest) => (
                    <div key={guest.name} className="rsvp-guest-items">
                      <p className="rsvp-guest">{guest.name}</p>
                      <div className="rsvp-attendance-group">
                        <label className="rsvp-radio">
                          <input
                            type="radio"
                            name={`attendance-${guest.name}`}
                            checked={guest.attending === true}
                            onChange={() =>
                              updateGuest(guest.name, {attending: true})
                            }
                          />
                          <span className="rsvp-radio-label">Asistiré</span>
                        </label>
                        <label className="rsvp-radio">
                          <input
                            type="radio"
                            name={`attendance-${guest.name}`}
                            checked={guest.attending === false}
                            onChange={() =>
                              updateGuest(guest.name, {attending: false})
                            }
                          />
                          <span className="rsvp-radio-label">Me lo pierdo</span>
                        </label>
                      </div>
                      <div className="rsvp-field">
                        <Label htmlFor="" className="rsvp-label">
                          ¿Tenés alguna restricción o preferencia alimentaria?
                        </Label>
                        <Select
                          value={
                            guest.notes?.startsWith("otra:")
                              ? "otra"
                              : (guest.notes ?? "ninguna")
                          }
                          placeholder="Seleccioná una opción"
                          options={[
                            {label: "Ninguna", value: "ninguna"},
                            {label: "Vegetariano/a", value: "vegetariano/a"},
                            {label: "Vegano/a", value: "vegano/a"},
                            {
                              label: "Celíaco/a (sin TACC)",
                              value: "celíaco/a (sin TACC)",
                            },
                            {label: "Sin lactosa", value: "sin lactosa"},
                            {label: "Otra", value: "otra"},
                          ]}
                          onValueChange={(value) => {
                            if (value === "otra") {
                              updateGuest(guest.name, {notes: "otra:"});
                            } else if (value === "ninguna") {
                              updateGuest(guest.name, {notes: null});
                            } else {
                              updateGuest(guest.name, {notes: value});
                            }
                          }}
                          disabled={guest.attending === false}
                        />
                      </div>
                      {guest.notes?.startsWith("otra:") && guest.attending && (
                        <div className="rsvp-field">
                          <Label htmlFor="" className="rsvp-label">
                            Especifica tu restricción o preferencia
                          </Label>
                          <Textarea
                            rows={3}
                            className="rsvp-textarea"
                            placeholder="Especificá tu restricción o preferencia"
                            value={guest.notes}
                            onChange={(e) =>
                              updateGuest(guest.name, {
                                notes: `otra: ${e.target.value}`,
                              })
                            }
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="rsvp-button-message-container">
                  <Label htmlFor="message" className="rsvp-label">
                    Deja un mensaje para los novios
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      handleFieldChange("message", e.target.value)
                    }
                    placeholder="Déjanos unas palabras lindas"
                    rows={5}
                    className="rsvp-textarea"
                  />
                </div>
              </div>

              <div className="rsvp-button-container">
                <button
                  type="button"
                  className="rsvp-button"
                  onClick={resetToPhoneStep}
                >
                  Cancelar
                </button>
                <button type="submit" className="rsvp-button-submit">
                  Enviar
                </button>
              </div>
            </div>
          </Modal>
        </form>
      ) : (
        <div className="rsvp-success">
          <h2 className="rsvp-success-title">¡Gracias por responder!</h2>
          <p className="rsvp-success-text">{getConfirmationMessage()}</p>
          {attendingCount < 1 && (
            <>
              <button
                type="button"
                className="rsvp-button-submit rsvp-button-edit"
                onClick={handleEditResponse}
              >
                ¿Querés modificar tu respuesta?
              </button>
            </>
          )}
          {attendingCount > 0 && (
            <button
              type="button"
              className="rsvp-button-submit rsvp-button-edit"
              onClick={addEventToCalendar}
            >
              Agendar la fecha en Google Calendar
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RSVP;

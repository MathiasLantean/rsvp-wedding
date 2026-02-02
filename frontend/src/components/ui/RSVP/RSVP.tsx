import {useEffect, useState} from "react";
import {Input} from "../input";
import {Textarea} from "../textarea";
import {Label} from "../label";
import "./RSVP.css";
import {getGuestInfo, submitRSVP, type guestType} from "../../../api/api";
import {Select} from "../select";

const RSVP: React.FC = () => {
  const [formData, setFormData] = useState<{
    phone: string;
    guests: guestType[];
    message: string;
  }>({
    phone: "",
    guests: [],
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await submitRSVP(formData);
      console.log("RSVP submitted successfully:", response);
    } catch (error) {
      console.error("Error submitting RSVP", error);
    } finally {
      setIsLoading(false);
      setSubmitted(true);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
    if (!cellphone) return;

    try {
      setIsLoading(true);
      const res = await getGuestInfo(cellphone);

      setFormData((prev) => ({
        ...prev,
        phone: cellphone,
        guests: res.guests as guestType[],
      }));
    } catch (error) {
      console.error("Error searching guest info", error);
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

  // Clean after fix problem
  const mockGuests: guestType[] = [
    {
      name: "Carolina López",
      attending: true,
      notes: null,
    },
    // {
    //   name: "Matías Rodríguez",
    //   attending: false,
    //   notes: null,
    // },
  ];

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      guests: [
        {
          name: "Carolina López",
          attending: true,
          notes: null,
        },
      ],
    }));
  }, []);

  return (
    <>
      {isLoading && (
        <div className="rsvp-loading">
          <div className="rsvp-loading-inner">
            <div className="rsvp-spinner" />
            <span className="rsvp-loading-text">Buscando invitación...</span>
          </div>
        </div>
      )}

      {/* 098774807 */}

      {!submitted ? (
        <form onSubmit={handleSubmit} className="rsvp-form">
          {/* Phone */}
          <div className="rsvp-field">
            <Label htmlFor="phone" className="rsvp-label">
              Ingresá tu número de teléfono
            </Label>
            <Input
              id="phone"
              variant="search"
              value={formData.phone}
              disabled={isLoading}
              onChange={(e) => handleFieldChange("phone", e.target.value)}
              onSearch={searchGuestInfo}
              placeholder="Ej. 0991234567"
              className="rsvp-input"
            />
          </div>

          {/* Guests */}
          {/* replace when fix is done */}
          {formData.guests.length > 0 && (
            <div>
              <h2 className="rsvp-guest-title">Confirmá tu asistencia</h2>
              <div className="rsvp-guests">
                {/* replace when fix is done */}
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
                    {guest.notes?.startsWith("otra:") && (
                      <div className="rsvp-field">
                        <Label htmlFor="" className="rsvp-label">
                          Especificá tu restricción o preferencia
                        </Label>
                        <Textarea
                          rows={3}
                          className="rsvp-textarea"
                          placeholder="Especificá tu restricción o preferencia"
                          value={""}
                          onChange={(e) =>
                            updateGuest(guest.name, {
                              notes: `otra: ${e.target.value}`,
                            })
                          }
                        />
                      </div>
                    )}
                    <div className="rsvp-field">
                      <Label htmlFor="message" className="rsvp-label">
                        Dejá un mensaje para los novios
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) =>
                          handleFieldChange("message", e.target.value)
                        }
                        placeholder="Dejanos unas palabras lindas"
                        rows={5}
                        className="rsvp-textarea"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="rsvp-button-container">
                <button className="rsvp-button">Cancelar</button>
                <button type="submit" className="rsvp-button-submit">
                  Enviar
                </button>
              </div>
            </div>
          )}
        </form>
      ) : (
        <div className="rsvp-success">
          <h2 className="rsvp-success-title">¡Gracias por responder!</h2>
          <p className="rsvp-success-text">{getConfirmationMessage()}</p>
        </div>
      )}
    </>
  );
};

export default RSVP;

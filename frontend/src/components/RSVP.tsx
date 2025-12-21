import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { getGuestInfo, submitRSVP, type guestType } from '../api/api';
import { Checkbox } from './ui/checkbox';
import { Button } from './ui/button';
import { Send } from 'lucide-react';

const RSVP: React.FC = () => {
  const [formData, setFormData] = useState<{
    phone: string;
    guests: guestType[];
    message: string;
  }>({
    phone: '',
    guests: [],
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await submitRSVP(formData);
      console.log('RSVP submitted successfully:', response);
    } catch (error) {
      console.error('Error submitting RSVP', error);
    } finally {
      setIsLoading(false);
      setSubmitted(true);
    }
  };

  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const attendingCount = formData.guests.filter(
    (guest) => guest.attending
  ).length;

  const getConfirmationMessage = () => {
    if (attendingCount === 0) {
      return 'Nos pone tristes saber que no podrán acompañarnos, los vamos a extrañar 🤍';
    }

    if (attendingCount === 1) {
      return '¡Qué bueno que nos puedas acompañar! 💕';
    }

    return '¡Qué bueno que nos puedan acompañar! 💕';
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
      console.error('Error searching guest info', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFieldChange = <K extends keyof typeof formData>(
    field: K,
    value: (typeof formData)[K]
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
        guest.name === guestName ? { ...guest, ...updates } : guest
      ),
    }));
  };

  return (
    <Card
      className="relative backdrop-blur-sm border-0 shadow-2xl painted-border"
      style={{ backgroundColor: 'hsl(var(--cream), 0.95)' }}
    >
      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center rounded-xl bg-white/70 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-3">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-wedding-rose-dark border-t-transparent" />
            <span className="text-sm text-navy-dark">
              Buscando invitación...
            </span>
          </div>
        </div>
      )}
      <CardContent className="pt-6 transition-all duration-300">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" style={{ color: 'hsl(var(--navy-dark))' }}>
                Teléfono
              </Label>
              <Input
                id="phone"
                variant="search"
                value={formData.phone}
                disabled={isLoading}
                onChange={(e) => handleFieldChange('phone', e.target.value)}
                onSearch={searchGuestInfo}
                placeholder="0991234567"
                className="border-2 focus:border-wedding-rose-dark"
              />
            </div>
            {/* Guests */}
            {formData.guests.length > 0 && (
              <>
                <div className="mt-8 space-y-6">
                  {formData.guests.map((guest) => (
                    <div key={guest.name}>
                      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end">
                        <div className="space-y-2">
                          <Label style={{ color: 'hsl(var(--navy-dark))' }}>
                            Nombre Completo
                          </Label>
                          <Input
                            value={guest.name}
                            disabled
                            className="border-2"
                          />
                        </div>

                        <div className="flex items-center space-x-2 p-3 rounded-lg border-2 hover:bg-wedding-rose-gold/20 transition-colors h-10">
                          <Checkbox
                            checked={guest.attending}
                            onCheckedChange={(checked) =>
                              updateGuest(guest.name, {
                                attending: checked === true,
                              })
                            }
                          />
                          <span
                            className="whitespace-nowrap select-none cursor-pointer"
                            onClick={() =>
                              updateGuest(guest.name, {
                                attending: !guest.attending,
                              })
                            }
                            style={{ color: 'hsl(var(--navy-dark))' }}
                          >
                            Asistiré
                          </span>
                        </div>

                        <div className="space-y-2">
                          <Label style={{ color: 'hsl(var(--navy-dark))' }}>
                            Restricciones Alimentarias
                          </Label>
                          <Input
                            value={guest.notes ?? ''}
                            onChange={(e) =>
                              updateGuest(guest.name, {
                                notes: e.target.value,
                              })
                            }
                            placeholder="Vegetariano, vegano, alergias..."
                            className="border-2 focus:border-wedding-rose-dark"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="message"
                    style={{ color: 'hsl(var(--navy-dark))' }}
                  >
                    Mensaje para los Novios
                  </Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      handleFieldChange('message', e.target.value)
                    }
                    placeholder="Comparte tus mejores deseos..."
                    rows={4}
                    className="border-2 focus:border-wedding-rose-dark resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full btn-romantic text-lg py-6"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Enviar Confirmación
                </Button>{' '}
              </>
            )}
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center text-center space-y-6 py-16">
            <h2 className="text-2xl font-display text-wedding-rose-dark">
              ¡Gracias por responder!
            </h2>

            <p className="text-lg max-w-md text-navy-dark">
              {getConfirmationMessage()}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RSVP;

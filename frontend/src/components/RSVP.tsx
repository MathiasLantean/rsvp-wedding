import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';

const RSVP: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attendance: '',
    guests: '1',
    dietary: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted');
  };

  return (
    <Card
      className="backdrop-blur-sm border-0 shadow-2xl painted-border"
      style={{ backgroundColor: 'hsl(var(--cream), 0.95)' }}
    >
      <CardHeader className="text-center">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 mx-auto"
          style={{ backgroundColor: 'hsl(var(--rose-gold))' }}
        >
          {/* <Users
            className="w-8 h-8"
            style={{ color: 'hsl(var(--navy-dark))' }}
          /> */}
        </div>
        <CardTitle
          className="text-2xl font-playfair"
          style={{ color: 'hsl(var(--navy-dark))' }}
        >
          RSVP
        </CardTitle>
        <CardDescription style={{ color: 'hsl(var(--navy-light))' }}>
          Por favor confirma tu asistencia antes del 1 de Junio
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" style={{ color: 'hsl(var(--navy-dark))' }}>
                Nombre Completo *
              </Label>
              <Input
                id="name"
                value={formData.name}
                // onChange={(e) => handleChange('name', e.target.value)}
                onChange={() => console.log('name')}
                placeholder="Tu nombre completo"
                required
                className="border-2 focus:border-wedding-rose-dark"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" style={{ color: 'hsl(var(--navy-dark))' }}>
                Correo Electrónico *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                // onChange={(e) => handleChange('email', e.target.value)}
                onChange={() => console.log('email')}
                placeholder="tu.email@ejemplo.com"
                required
                className="border-2 focus:border-wedding-rose-dark"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" style={{ color: 'hsl(var(--navy-dark))' }}>
              Teléfono
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              // onChange={(e) => handleChange('phone', e.target.value)}
              onChange={() => console.log('phone')}
              placeholder="+1 234 567 8900"
              className="border-2 focus:border-wedding-rose-dark"
            />
          </div>

          <div className="space-y-4">
            <Label style={{ color: 'hsl(var(--navy-dark))' }}>
              ¿Podrás acompañarnos? *
            </Label>
            <RadioGroup
              value={formData.attendance}
              // onValueChange={(value) => handleChange('attendance', value)}
              onValueChange={() => console.log('attendance')}
              className="grid md:grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2 p-4 rounded-lg border-2 hover:bg-wedding-rose-gold/20 transition-colors">
                <RadioGroupItem value="yes" id="yes" />
                <Label
                  htmlFor="yes"
                  className="cursor-pointer"
                  style={{ color: 'hsl(var(--navy-dark))' }}
                >
                  ¡Sí, estaré ahí! 💒
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-4 rounded-lg border-2 hover:bg-wedding-rose-gold/20 transition-colors">
                <RadioGroupItem value="no" id="no" />
                <Label
                  htmlFor="no"
                  className="cursor-pointer"
                  style={{ color: 'hsl(var(--navy-dark))' }}
                >
                  No podré asistir 😢
                </Label>
              </div>
            </RadioGroup>
          </div>

          {formData.attendance === 'yes' && (
            <>
              <div className="space-y-2">
                <Label
                  htmlFor="guests"
                  style={{ color: 'hsl(var(--navy-dark))' }}
                >
                  Número de Invitados (incluyéndote)
                </Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max="4"
                  value={formData.guests}
                  // onChange={(e) => handleChange('guests', e.target.value)}
                  onChange={() => console.log('guests')}
                  className="border-2 focus:border-wedding-rose-dark"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="dietary"
                  style={{ color: 'hsl(var(--navy-dark))' }}
                >
                  Restricciones Alimentarias
                </Label>
                <Input
                  id="dietary"
                  value={formData.dietary}
                  // onChange={(e) => handleChange('dietary', e.target.value)}
                  onChange={() => console.log('dietary')}
                  placeholder="Vegetariano, vegano, alergias, etc."
                  className="border-2 focus:border-wedding-rose-dark"
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <Label htmlFor="message" style={{ color: 'hsl(var(--navy-dark))' }}>
              Mensaje para los Novios
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              // onChange={(e) => handleChange('message', e.target.value)}
              onChange={() => console.log('message')}
              placeholder="Comparte tus mejores deseos..."
              rows={4}
              className="border-2 focus:border-wedding-rose-dark resize-none"
            />
          </div>

          {/* <Button type="submit" className="w-full btn-romantic text-lg py-6">
            <Send className="w-5 h-5 mr-2" />
            Enviar Confirmación
          </Button> */}
        </form>
      </CardContent>
    </Card>
  );
};

export default RSVP;

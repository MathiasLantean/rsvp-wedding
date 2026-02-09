import {useState} from "react";
import {Modal} from "../../ui/modal";
import "./Gift.css";
import {Accordion} from "../../ui/accordion";
import {CopyButton} from "../../ui/copyButton";

const Gift: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const accounts = [
    {
      id: "uyu",
      title: "Cuenta bancaria en Pesos",
      data: {
        titular: "Carolina Reolon",
        banco: "BROU",
        cuenta: "Caja de Ahorro",
        numero: "001385836-00002",
      },
    },
    {
      id: "usd",
      title: "Cuenta bancaria en Dólares",
      data: {
        titular: "Carolina Reolon",
        banco: "BROU",
        cuenta: "Caja de Ahorro",
        numero: "001385836-00003",
      },
    },
    {
      id: "uyu2",
      title: "Cuenta bancaria en Pesos",
      data: {
        titular: "Juan Pérez",
        banco: "Banco Nación",
        cuenta: "Caja de Ahorro",
        numero: "1234567890",
      },
    },
    {
      id: "usd2",
      title: "Cuenta bancaria en Dólares",
      data: {
        titular: "Juan Pérez",
        banco: "Banco Galicia",
        cuenta: "Caja de Ahorro en USD",
        numero: "0987654321",
      },
    },
  ];

  const accountFields = [
    {label: "Titular:", key: "titular"},
    {label: "Banco:", key: "banco"},
    {label: "Cuenta:", key: "cuenta"},
    {label: "Nº de cuenta:", key: "numero"},
  ] as const;

  return (
    <section className="gift-section">
      <div className="gift-background" />
      <div className="gift-overlay" />

      <div className="gift-content">
        <div className="gift-card">
          <h2 className="gift-title">Regalos</h2>

          <div className="gift-main-text">
            <p className="gift-paragraph-text">
              El mejor regalo para nosotros es que puedan acompañarnos en este
              día tan especial, celebrar juntos, reírnos, abrazarnos y compartir
              la fiesta con ustedes.
            </p>
            <p className="gift-paragraph-text">
              Y si además estaban pensando en hacernos un regalo, siendo
              sinceros: nada nos va a hacer tan felices como invertir en nuestra
              casita.
            </p>
            <p className="gift-paragraph-text">
              Por eso, cualquier aporte para este nuevo proyecto juntos será más
              que bienvenido y muy agradecido.
            </p>
            <p className="gift-intro-text gift-paragraph-text">
              Les dejamos nuestras cuentas por si quieren sumarse:
            </p>
          </div>

          {accounts.map((account) => (
            <Accordion
              key={account.id}
              title={account.title}
              open={openId === account.id}
              onToggle={() =>
                setOpenId(openId === account.id ? null : account.id)
              }
            >
              {accountFields.map((field) => {
                const value = account.data[field.key];

                return (
                  <div
                    key={field.key}
                    className="
        flex items-start justify-between
        gap-3
        py-2
        border-b last:border-b-0
        border-gray-100
      "
                  >
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-500">
                        {field.label}
                      </span>
                      <span className="text-sm font-medium text-[var(--wedding-navy-dark)]">
                        {value}
                      </span>
                    </div>

                    <CopyButton value={value} />
                  </div>
                );
              })}
            </Accordion>
          ))}

          <p className="gift-thanks-text">
            Gracias por ser parte de nuestra historia 💖
          </p>
        </div>
      </div>
    </section>
  );
};

export default Gift;

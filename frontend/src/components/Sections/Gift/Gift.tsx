import { useState } from "react";
import "./Gift.css";

type Account = {
  id: string;
  title: string;
  data: {
    titular: string;
    banco: string;
    cuenta: string;
    numero: string;
  };
};

const Gift: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);


  const accounts: Account[] = [
    {
      id: "ars-1",
      title: "Cuenta en Pesos",
      data: {
        titular: "Carolina Reolon",
        banco: "BROU",
        cuenta: "Caja de Ahorro",
        numero: "001385836-00002",
      },
    },
    {
      id: "ars-2",
      title: "Cuenta en Pesos (2)",
      data: {
        titular: "Juan Pérez",
        banco: "Banco Nación",
        cuenta: "Caja de Ahorro",
        numero: "2222222222",
      },
    },
    {
      id: "usd-1",
      title: "Cuenta en Dólares",
      data: {
        titular: "Carolina Reolon",
        banco: "BROU",
        cuenta: "Caja de Ahorro",
        numero: "001385836-00003",
      },
    },
    {
      id: "usd-2",
      title: "Cuenta en Dólares (2)",
      data: {
        titular: "Juan Pérez",
        banco: "Banco Galicia",
        cuenta: "Caja de Ahorro en USD",
        numero: "9999999999",
      },
    },
  ];

  const accountFields = [
    { label: "Titular:", key: "titular" },
    { label: "Banco:", key: "banco" },
    { label: "Cuenta:", key: "cuenta" },
    { label: "Nº de cuenta:", key: "numero" },
  ] as const;

  const handleCopy = async (value: string, accountId: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopiedId(accountId);
      setTimeout(() => setCopiedId(null), 1500);
    } catch (e) {
      console.error("No se pudo copiar", e);
    }
  };

  return (
    <section className="gift-section">
      <div className="gift-parallax-bg" />

      <div className="gift-content">
        <h2 className="gift-title">Regalos</h2>

        {/* Card grande de texto */}
        <div className="gift-text-wrapper">
          <div className="gift-card gift-text-card">
            <p>
            El mejor regalo para nosotros es que puedan acompañarnos en este día tan especial, celebrar juntos, 
            reírnos, abrazarnos y compartir la fiesta con ustedes.
            </p>
            <p>
            Y si además estaban pensando en hacernos un regalo, siendo sinceros: nada nos va a hacer tan felices
             como invertir en nuestra casita.
            </p>
            <p>
            Por eso, cualquier aporte para este nuevo proyecto juntos será más que bienvenido y muy agradecido.
            </p>
            <p className="gift-intro-text">
              Les dejamos nuestras cuentas por si quieren sumarse:
            </p>
          </div>
        </div>

        {/* Cards de cuentas */}
        <div className="gift-cards-grid">

        {/* Grupo Caro */}
        <h3 className="gift-owner-title">Caro</h3>

        {accounts.slice(0, 2).map((account) => (
          <div key={account.id} className="gift-card gift-account-card">
            <h4 className="gift-item-title">{account.title}</h4>

            <div className="gift-item-value">
              {accountFields.map((field) => (
                <div key={field.label} className="gift-item-value-container">
                  <span>{field.label}</span>

                  <span className="gift-value-with-copy">
                    {account.data[field.key]}

                    {field.key === "numero" && (
                      <button
                        className="gift-copy-btn"
                        onClick={() =>
                          handleCopy(account.data.numero, account.id)
                        }
                        aria-label="Copiar número de cuenta"
                        title="Copiar número de cuenta"
                      >
                        📋
                      </button>
                    )}

                    {field.key === "numero" &&
                      copiedId === account.id && (
                        <span className="gift-copied-feedback">
                          Copiado ✓
                        </span>
                      )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Grupo Mathi */}
        <h3 className="gift-owner-title">Mathi</h3>

        {accounts.slice(2, 4).map((account) => (
          <div key={account.id} className="gift-card gift-account-card">
            <h4 className="gift-item-title">{account.title}</h4>

            <div className="gift-item-value">
              {accountFields.map((field) => (
                <div key={field.label} className="gift-item-value-container">
                  <span>{field.label}</span>

                  <span className="gift-value-with-copy">
                    {account.data[field.key]}

                    {field.key === "numero" && (
                      <button
                        className="gift-copy-btn"
                        onClick={() =>
                          handleCopy(account.data.numero, account.id)
                        }
                        aria-label="Copiar número de cuenta"
                        title="Copiar número de cuenta"
                      >
                      </button>
                    )}

                    {field.key === "numero" &&
                      copiedId === account.id && (
                        <span className="gift-copied-feedback">
                          Copiado ✓
                        </span>
                      )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
        </div>


        <p className="gift-thanks-text">
          Gracias por ser parte de nuestra historia 💖
        </p>
      </div>
    </section>
  );
};

export default Gift;

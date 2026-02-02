import "./Gift.css";

const Gift: React.FC = () => {
  // TODO: change info accounts
  const accounts = [
    {
      id: "ars",
      title: "Cuenta bancaria en Pesos",
      data: {
        titular: "Juan Pérez",
        banco: "Banco Nación",
        cuenta: "Caja de Ahorro",
        numero: "1234567890",
      },
    },
    {
      id: "usd",
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
        <h2 className="gift-title">Regalos</h2>

        <div className="gift-main-text">
          <p>
            El mejor regalo para nosotros es que puedan acompañarnos en este día
            tan especial, celebrar juntos, reírnos, abrazarnos y que estén toda
            la noche bailando con nosotros 💃🕺✨
          </p>
          <p>
            Peeeeero… si además estaban pensando en hacernos un regalo, siendo
            sinceros: ninguna licuadora nos va a hacer tan felices como invertir
            en nuestra casita 🏡💕
          </p>
          <p>
            Por eso, cualquier aporte para este nuevo proyecto juntos será más
            que bienvenido y profundamente agradecido.
          </p>
          <p className="gift-intro-text">
            Les dejamos nuestras cuentas por si quieren sumarse:
          </p>
        </div>

        <div className="gift-container">
          {accounts.map((account) => (
            <div key={account.id} className="gift-item-container">
              <h4 className="gift-item-title">{account.title}</h4>

              <div className="gift-item-value">
                {accountFields.map((field) => (
                  <div key={field.label} className="gift-item-value-container">
                    <span>{field.label}</span>
                    <span>{account.data[field.key]}</span>
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

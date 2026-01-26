import './Regalos.css';

const Regalos: React.FC = () => {
  return (
    <section className="regalos-section">
      <div className="regalos-background" />
      <div className="regalos-overlay" />
      
      <div className="regalos-content">
        <h2 className="regalos-title">Regalos</h2>
        
        <div className="regalos-main-text">
          <p className="regalos-intro">
            El mejor regalo para nosotros es que puedan acompañarnos en este día tan especial, celebrar juntos, reírnos, abrazarnos y que estén toda la noche bailando con nosotros 💃🕺✨
          </p>
          
          <p className="regalos-secondary">
            Peeeeero… si además estaban pensando en hacernos un regalo, siendo sinceros: ninguna licuadora nos va a hacer tan felices como invertir en nuestra casita 🏡💕
          </p>
          
          <p className="regalos-secondary">
            Por eso, cualquier aporte para este nuevo proyecto juntos será más que bienvenido y profundamente agradecido.
          </p>
        </div>

        <div className="regalos-accounts">
          <h3 className="regalos-accounts-title">Les dejamos nuestras cuentas por si quieren sumarse:</h3>
          
          <div className="regalos-accounts-container">
            <div className="regalos-account-box">
              <h4 className="regalos-account-title">Cuenta bancaria en Pesos</h4>
              <div className="regalos-account-details">
                <div className="regalos-account-row">
                  <span className="regalos-account-label">Titular:</span>
                  <span className="regalos-account-value"></span>
                </div>
                <div className="regalos-account-row">
                  <span className="regalos-account-label">Banco:</span>
                  <span className="regalos-account-value"></span>
                </div>
                <div className="regalos-account-row">
                  <span className="regalos-account-label">Cuenta:</span>
                  <span className="regalos-account-value"></span>
                </div>
                <div className="regalos-account-row">
                  <span className="regalos-account-label">Nº de cuenta:</span>
                  <span className="regalos-account-value"></span>
                </div>
              </div>
            </div>

            <div className="regalos-account-box">
              <h4 className="regalos-account-title">Cuenta bancaria en Dólares</h4>
              <div className="regalos-account-details">
                <div className="regalos-account-row">
                  <span className="regalos-account-label">Titular:</span>
                  <span className="regalos-account-value"></span>
                </div>
                <div className="regalos-account-row">
                  <span className="regalos-account-label">Banco:</span>
                  <span className="regalos-account-value"></span>
                </div>
                <div className="regalos-account-row">
                  <span className="regalos-account-label">Cuenta:</span>
                  <span className="regalos-account-value"></span>
                </div>
                <div className="regalos-account-row">
                  <span className="regalos-account-label">Nº de cuenta:</span>
                  <span className="regalos-account-value"></span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="regalos-thanks">
          Gracias por ser parte de nuestra historia 💖
        </p>
      </div>
    </section>
  );
}

export default Regalos;
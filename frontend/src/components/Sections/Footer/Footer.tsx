import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      {/* hojas decorativas */}
      <img
        src="/leaf-left.png"
        alt=""
        className="footer-leaf footer-leaf-left"
      />
      <img
        src="/leaf-right.png"
        alt=""
        className="footer-leaf footer-leaf-right"
      />

      <div className="footer-content">
        {/* Logo / monograma */}
        <div className="footer-logo">CM</div>

        {/* Frase principal */}
        <h2 className="footer-title">Nuestro para siempre comienza</h2>
        <p className="footer-subtitle">Desde este día en adelante</p>

        {/* Contactos */}
        <div className="footer-contacts">
          <div className="footer-contact">
            <h4>Caro</h4>
            <p>📞 +598 XX XXX XXX</p>
            <p>✉️ caro@email.com</p>
          </div>

          <div className="footer-contact">
            <h4>Mathi</h4>
            <p>📞 +598 XX XXX XXX</p>
            <p>✉️ mathi@email.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

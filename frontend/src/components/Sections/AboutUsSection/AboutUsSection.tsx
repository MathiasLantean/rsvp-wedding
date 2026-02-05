import { useEffect, useState } from "react";
import "./AboutUsSection.css";

export default function AboutUsSection() {
  const [side, setSide] = useState<"left" | "right">("left");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <section className="split-container mobile">
        <div className={`banner banner-left ${side === "left" ? "active" : ""}`} />
        <div className={`banner banner-right ${side === "right" ? "active" : ""}`} />

        <div className="mobile-content">
          <div className="mobile-text">
            {side === "left" ? (
              <>
                <h2>Texto A</h2>
                <p>Descripción del banner A</p>
              </>
            ) : (
              <>
                <h2>Texto B</h2>
                <p>Descripción del banner B</p>
              </>
            )}
          </div>

          <div className="mobile-actions">
            <button
              className={side === "left" ? "active" : ""}
              onClick={() => setSide("left")}
            >
              Opción A
            </button>
            <button
              className={side === "right" ? "active" : ""}
              onClick={() => setSide("right")}
            >
              Opción B
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Desktop: tu versión con hover
  return (
    <section className="split-container">
      <div className={`banner banner-left ${side === "left" ? "active" : ""}`} />
      <div className={`banner banner-right ${side === "right" ? "active" : ""}`} />

      <div className="hover-zone left" onMouseEnter={() => setSide("left")} />
      <div className="hover-zone right" onMouseEnter={() => setSide("right")} />

      {side === "left" && (
        <div className="overlay right testimonial">
        <h2>Mathi</h2>
      
        <p className="quote">
          “Mathi es un compañero increíble. Está ahí de verdad: presente, involucrado y con una forma muy genuina de acompañar. 
          Siempre busca entender a quienes lo rodean y tiene una manera muy linda de cuidar a las personas que quiere.”
        </p>
      
        <p className="quote">
          Es súper inteligente y astuto: siempre le busca la vuelta a los problemas y encuentra soluciones donde otros ven obstáculos. 
          Es un gran profesional, muy curioso con las nuevas tecnologías y siempre atento a lo que pasa a su alrededor.
        </p>
      
        <p className="quote">
          Tiene un humor hermoso. Es divertido y siempre logra sacarme una sonrisa, incluso en mis días más grises.
        </p>
      
        <p className="quote">
          Está en un camino constante de crecimiento personal. Siempre intenta ser una mejor persona, y esa búsqueda es contagiosa: 
          me inspira a mí también a crecer y a caminar juntos, acompañándonos en el proceso.
        </p>
      
        <p className="quote">
          Es mi lugar seguro y me trae mucha paz.”
        </p>
      
        <p className="author">— Caro</p>
      </div>
      

      )}

      {side === "right" && (
        <div className="overlay left">
          <h2>Caro</h2>
          <p>Este texto aparece cuando estás del lado derecho</p>
        </div>
      )}
    </section>
  );
}

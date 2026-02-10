import { useEffect, useState } from "react";
import "./AboutUsSection.css";
import { Heart } from "lucide-react";

export default function AboutUsSection() {
  const [side, setSide] = useState<"left" | "right">("left");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const isLeft = side === "left";

  const TESTIMONIALS = {
    left: {
      name: "Mathi",
      author: "— Caro",
      quotes: [
        "“Mathi es un compañero increíble. Está ahí de verdad: presente, involucrado y con una forma muy genuina de acompañar. Siempre busca entender a quienes lo rodean y tiene una manera muy linda de cuidar a las personas que quiere.”",
        "Es súper inteligente y astuto: siempre le busca la vuelta a los problemas y encuentra soluciones donde otros ven obstáculos. Es un gran profesional, muy curioso con las nuevas tecnologías y siempre atento a lo que pasa a su alrededor.",
        "Tiene un humor hermoso. Es divertido y siempre logra sacarme una sonrisa, incluso en mis días más grises.",
        "Está en un camino constante de crecimiento personal. Siempre intenta ser una mejor persona, y esa búsqueda es contagiosa: me inspira a mí también a crecer y a caminar juntos, acompañándonos en el proceso.",
        "Es mi lugar seguro y me trae mucha paz.”",
      ],
    },
    right: {
      name: "Caro",
      author: "— Mathi",
      quotes: [
        "“Caro es mi cómplice más genuina, mi aliada en todo, es mi lugar seguro en el mundo, mi refugio. Muchas veces despierto a su lado, la observo en silencio y en ese instante entiendo cuánto la admiro.",
        "Ella siempre está atenta, sabe exactamente lo que quiero o lo que necesito. Pero, sobre todo, me cuida, me mima, me escucha y me entiende más que nadie. A veces con humor, a veces con firmeza, siempre busca sacar lo mejor de mí.",
        "Su sinceridad, su cariño, sus ideas, sus consejos y su sonrisa dicen mucho de la persona tan bonita que es. En ella todo es real, todo es hermoso.",
        "Me enseñó a disfrutar los momentos cotidianos, a ver lo bonito de las cosas simples y hasta a amar a los animales.",
        "Con ella aprendí a construir desde la calma, desde el amor. Con ella entendí que quiero una vida a su lado.”",
      ],
    },
  } as const;

  const content = TESTIMONIALS[side];

  if (isMobile) {
    return (
      <section className="split-container mobile">
        <div className={`banner banner-left ${isLeft ? "active" : ""}`} />
        <div className={`banner banner-right ${!isLeft ? "active" : ""}`} />

        <div className="mobile-content">
          <div className="mobile-text">
            <div className={`mobile-overlay-testimonial ${side}`}>
              <h2 className="mobile-testimonial-title">{content.name}</h2>
              {content.quotes.map((quote, i) => (
                <p key={i} className="quote-mobile">
                  {quote}
                </p>
              ))}
              <p className="author-mobile">{content.author}</p>
            </div>
          </div>

          <div className="mobile-actions">
            <button
              type="button"
              aria-label="Option Mathi"
              className={`heart-button ${side === "left"
                ? "heart-active heart-navy"
                : "heart-inactive heart-navy"
                }`}
              onClick={() => setSide("left")}
            >
              <Heart />
              <span className="heart-label">MATHI</span>
            </button>
            <h2
              className={`mobile-title-section ${side === "left" ? "is-navy" : "is-rose"
                }`}
            >
              Nosotros
            </h2>
            <button
              type="button"
              aria-label="Option Caro"
              className={`heart-button ${side === "right"
                ? "heart-active heart-rose"
                : "heart-inactive heart-rose"
                }`}
              onClick={() => setSide("right")}
            >
              <Heart />
              <span className="heart-label">CARO</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="split-container">
      <div className={`banner banner-left ${isLeft ? "active" : ""}`} />
      <div className={`banner banner-right ${!isLeft ? "active" : ""}`} />
      {(["left", "right"] as const).map((s) => (
        <div
          key={s}
          className={`hover-zone ${s}`}
          onMouseEnter={() => setSide(s)}
        />
      ))}
      <div className={`overlay testimonial ${isLeft ? "right" : "left"}`}>
        <h2>{content.name}</h2>
        {content.quotes.map((quote, i) => (
          <p key={i} className="quote">
            {quote}
          </p>
        ))}
        <p className="author">{content.author}</p>
      </div>
    </section>
  );
}

import { useEffect, useState, useRef } from "react";
import "./AboutUsSection.css";
import { Heart } from "lucide-react";

export default function AboutUsSection() {
  const [side, setSide] = useState<"left" | "right">("left");
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const desktopSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isMobile || !sectionRef.current) return;

    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const sectionCenter = rect.top + rect.height / 2;
      
      // Check if section center is at or past the viewport center
      const isAtMiddle = sectionCenter <= viewportCenter;
      
      // Switch to second tab (right) when section reaches middle
      // Switch back to first tab (left) when scrolling up (section above middle)
      setSide((currentSide) => {
        if (isAtMiddle && currentSide === "left") {
          return "right";
        } else if (!isAtMiddle && currentSide === "right") {
          return "left";
        }
        return currentSide;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  // Scroll-based tab switching for desktop/web
  useEffect(() => {
    if (isMobile || !desktopSectionRef.current) return;

    const handleScroll = () => {
      const section = desktopSectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const sectionCenter = rect.top + rect.height / 2;
      
      // Check if section center is at or past the viewport center
      const isAtMiddle = sectionCenter <= viewportCenter;
      
      // Switch to second tab (right) when section reaches middle
      // Switch back to first tab (left) when scrolling up (section above middle)
      setSide((currentSide) => {
        if (isAtMiddle && currentSide === "left") {
          return "right";
        } else if (!isAtMiddle && currentSide === "right") {
          return "left";
        }
        return currentSide;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isMobile]);

  const isLeft = side === "left";

  const TESTIMONIALS = {
    left: {
      name: "Mathi",
      author: "— Caro",
      quotes: [
        "“Mathi es el mejor compañero que podría pedir, siempre tiene la palabra o el abrazo justo que necesito. Me sigue en todos los planes y locuras que se me ocurren. Siento que juntos nos complementamos muy bien en el día a día; su calma me ayuda a regularme y a mantener los pies en la tierra.",
        "Una de las cosas que me enamoró de él, fue esa chispa que tiene para encontrarle la vuelta a todo. Donde otros ven problemas, él ve soluciones. Siempre atento a lo que pasa en el mundo, su curiosidad hace que cada día tenga algo nuevo e interesante para compartir conmigo. ",
        "Tiene un humor hermoso: es divertido, cómplice y siempre logra sacarme una sonrisa, incluso en mis días más grises.",
        "Está en un camino constante de crecimiento. Su deseo de ser mejor persona me contagia y me invita a crecer con él, a caminar juntos y a acompañarnos en cada etapa del proceso.",
        "Es mi lugar seguro y me trae mucha paz.",
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
      <section ref={sectionRef} className="split-container mobile">
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
    <section ref={desktopSectionRef} className="split-container">
      <div className={`banner banner-left ${isLeft ? "active" : ""}`} />
      <div className={`banner banner-right ${!isLeft ? "active" : ""}`} />
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

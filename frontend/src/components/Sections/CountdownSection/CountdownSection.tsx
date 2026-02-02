import Countdown from "../../ui/Countdown/Countdown";
import "./CountdownSection.css";

const CountdownSection: React.FC = () => {
  return (
    <div className="countdown-section">
      <div className="countdown-container">
        <h1 className="countdown-section-title font-cursive">
          Nuestro casamiento
        </h1>
        <h2 className="countdown-section-subtitle font-display">
          FALTA POCO PARA EL GRAN DIA
        </h2>
      </div>
      <div className="countdown-section-countdown">
        <Countdown targetDate={new Date("2026-03-28T18:00:00")} />
      </div>
    </div>
  );
};

export default CountdownSection;

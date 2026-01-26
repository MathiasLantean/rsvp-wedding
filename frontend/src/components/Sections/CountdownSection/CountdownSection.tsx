import Countdown from '../../ui/Countdown/Countdown';
import './CountdownSection.css';

const CountdownSection: React.FC = () => {
  return (
    <div className="countdown-section">
      <div className="countdown-section-content">
        <h2 className="countdown-section-title">Nos casamos en:</h2>
      </div>
      <div className="countdown-section-countdown">
        <Countdown targetDate={new Date('2026-03-28T18:00:00')} />
      </div>
    </div>
  );
};

export default CountdownSection;
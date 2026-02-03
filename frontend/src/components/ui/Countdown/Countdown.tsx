import {useState, useEffect} from "react";
import "./Countdown.css";

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({targetDate}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({days: 0, hours: 0, minutes: 0, seconds: 0});
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({days, hours, minutes, seconds});
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // initialize immediately

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="countdown-container-date">
      <div className="countdown-number-container">
        <span className="countdown-numbers">{timeLeft.days}</span>
        <span className="countdown-numbers-text font-display"> días </span>
      </div>
      <div className="countdown-number-container">
        <span className="countdown-numbers">{timeLeft.hours}</span>
        <span className="countdown-numbers-text font-display"> horas </span>
      </div>
      <div className="countdown-number-container">
        <span className="countdown-numbers">{timeLeft.minutes}</span>
        <span className="countdown-numbers-text font-display"> minutos </span>
      </div>
      <div className="countdown-number-container">
        <span className="countdown-numbers">{timeLeft.seconds}</span>
        <span className="countdown-numbers-text font-display"> segundos </span>
      </div>
    </div>
  );
};

export default Countdown;

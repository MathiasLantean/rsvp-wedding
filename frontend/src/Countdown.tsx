import { useState, useEffect } from 'react';

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
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
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown(); // initialize immediately

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="mt-6 flex justify-center gap-4 text-xl sm:text-2xl font-display text-gold">
      <div>
        <span className="font-semibold">{timeLeft.days}</span> días
      </div>
      <div>
        <span className="font-semibold">{timeLeft.hours}</span> hrs
      </div>
      <div>
        <span className="font-semibold">{timeLeft.minutes}</span> min
      </div>
      <div>
        <span className="font-semibold">{timeLeft.seconds}</span> s
      </div>
    </div>
  );
};

export default Countdown;

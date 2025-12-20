import { useState, useEffect, useRef } from 'react';

interface FlipCardProps {
  digit: string;
  prevDigit: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ digit, prevDigit }) => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [displayPrev, setDisplayPrev] = useState(prevDigit);

  useEffect(() => {
    if (digit !== prevDigit) {
      setDisplayPrev(prevDigit);
      setIsFlipping(true);
      const timeout = setTimeout(() => setIsFlipping(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [digit, prevDigit]);

  return (
    <div className="relative w-14 h-20 sm:w-20 sm:h-28 md:w-24 md:h-32 lg:w-28 lg:h-36 perspective-500">
      {/* Base card (current number) */}
      <div className="absolute inset-0 bg-card rounded-lg shadow-flip flex items-center justify-center">
        <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-card-foreground">
          {digit}
        </span>
        {/* Center line */}
        <div className="absolute inset-x-0 top-1/2 h-[1px] bg-border/50" />
      </div>

      {/* Flip animation layers */}
      {isFlipping && (
        <>
          {/* Top half flipping down (shows previous number) */}
          <div className="absolute inset-x-0 top-0 h-1/2 bg-card rounded-t-lg overflow-hidden origin-bottom animate-flip-top shadow-flip-top">
            <div className="absolute inset-0 flex items-end justify-center pb-0">
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-card-foreground translate-y-1/2">
                {displayPrev}
              </span>
            </div>
          </div>

          {/* Bottom half flipping up (reveals new number) */}
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-card rounded-b-lg overflow-hidden origin-top animate-flip-bottom shadow-flip-bottom">
            <div className="absolute inset-0 flex items-start justify-center pt-0">
              <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-card-foreground -translate-y-1/2">
                {digit}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

interface CountdownProps {
  targetDate: Date;
}

const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();

    if (diff <= 0) {
      return { days: '00', hours: '00', minutes: '00', seconds: '00' };
    }

    return {
      days: formatNumber(Math.floor(diff / (1000 * 60 * 60 * 24))),
      hours: formatNumber(Math.floor((diff / (1000 * 60 * 60)) % 24)),
      minutes: formatNumber(Math.floor((diff / (1000 * 60)) % 60)),
      seconds: formatNumber(Math.floor((diff / 1000) % 60)),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft);
  const [prevTime, setPrevTime] = useState<TimeLeft>(calculateTimeLeft);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((current) => {
        setPrevTime(current);
        return calculateTimeLeft();
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const timeUnits = [
    { value: timeLeft.days, prev: prevTime.days, label: 'DAYS' },
    { value: timeLeft.hours, prev: prevTime.hours, label: 'HOURS' },
    { value: timeLeft.minutes, prev: prevTime.minutes, label: 'MINUTES' },
    { value: timeLeft.seconds, prev: prevTime.seconds, label: 'SECONDS' },
  ];

  return (
    <div className="flex justify-center items-start gap-3 sm:gap-6 md:gap-8 lg:gap-10">
      {timeUnits.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center gap-3">
          <div className="flex gap-1 sm:gap-2">
            <FlipCard digit={unit.value[0]} prevDigit={unit.prev[0]} />
            <FlipCard digit={unit.value[1]} prevDigit={unit.prev[1]} />
          </div>
          <span className="text-xs sm:text-sm text-countdown-label tracking-[0.15em] font-medium">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Countdown;

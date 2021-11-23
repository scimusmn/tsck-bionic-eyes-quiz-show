import { useState, useEffect } from 'react';

export default function useTimer(totalTime, stop, callback) {
  const [timeLeft, setTimeLeft] = useState(totalTime);
  useEffect(() => {
    if (!timeLeft || stop) {
      callback();
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, stop]);

  return timeLeft;
}

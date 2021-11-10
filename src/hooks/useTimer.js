import { useState, useEffect } from 'react';
import { timePerQuestion } from '../config.json';

export default function useTimer(callback) {
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  useEffect(() => {
    if (!timeLeft) {
      callback();
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return timeLeft;
}

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '@styles/quiz/timer.module.scss';
import { useSoundEffect, useTimer } from '../../hooks';
import { timePerQuestion } from '../../config.json';

const norm = (value, inMin = 0, inMax = 10, outMin = 0, outMax = 251) =>
  ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

const Timer = ({ stop, callback }) => {
  const [playWaitSound, pauseWaitSound] = useSoundEffect('wait', true);

  const timeLeft = useTimer(timePerQuestion, stop, callback);

  const timerClass = `${styles.timer} ${(!timeLeft || stop) && styles.active}`;

  // play wait music
  useEffect(() => {
    playWaitSound();
  }, []);

  // pause wait music
  useEffect(() => {
    if (stop) pauseWaitSound();
  }, [stop]);

  return (
    <div className={timerClass}>
      <svg
        height='100'
        width='100'
        viewBox='0 0 100 100'
        className={styles.svg}
      >
        <circle
          cx='50'
          cy='50'
          r='40'
          strokeDasharray='251'
          strokeDashoffset='251'
          stroke-mitterlimit='0'
          style={{
            strokeDashoffset: norm(timeLeft, timePerQuestion, 0),
          }}
        />
      </svg>
      <span>{timeLeft}</span>
    </div>
  );
};

export default Timer;

Timer.propTypes = {
  callback: PropTypes.func.isRequired,
  stop: PropTypes.bool.isRequired,
};

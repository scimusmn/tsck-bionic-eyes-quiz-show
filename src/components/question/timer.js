import React from 'react';
import PropTypes from 'prop-types';
import styles from '@styles/quiz/timer.module.scss';
import { useTimer } from '../../hooks';

const norm = (value, inMin = 0, inMax = 15, outMin = 0, outMax = 251) =>
  ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

const Timer = ({ callback }) => {
  const timeLeft = useTimer(callback);
  return (
    <div className={styles.timer}>
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
            strokeDashoffset: norm(timeLeft),
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
};

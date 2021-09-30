import React from 'react';
import PropTypes from 'prop-types';
import styles from '@styles/quiz/progress.module.scss';

const Progress = ({ current, total }) => (
  <div className={styles.progress}>
    <span>{current}</span>
    <div className={styles.bar} />
    <span>{total}</span>
  </div>
);

export default Progress;

Progress.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

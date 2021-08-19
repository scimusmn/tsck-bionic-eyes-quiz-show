import React from 'react';
import PropTypes from 'prop-types';
import styles from '@styles/quiz/progress.module.scss';

const Progress = ({ current, total }) => {
  console.log(current, total);
  return (
    <div className={styles.progress}>
      {current} / {total}
    </div>
  );
};

export default Progress;

Progress.propTypes = {
  current: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

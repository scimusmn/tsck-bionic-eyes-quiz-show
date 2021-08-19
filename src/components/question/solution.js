import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '@styles/quiz/solution.module.scss';
import useKeyPress from '../../hooks/useKeyPress';
import { controls } from '../../config.json';

const Solution = ({ content, goToNext }) => {
  // skip media
  const skip = useKeyPress(controls.skip);
  useEffect(() => {
    if (skip) goToNext();
  }, [skip]);

  return (
    <div className={styles.solution}>
      <p>{content.text}</p>
      <video controls autoPlay preload='metadata' onEnded={goToNext}>
        <source src={content.audio} type='video/mp4' />
      </video>
    </div>
  );
};

export default Solution;

Solution.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
  goToNext: PropTypes.func.isRequired,
};

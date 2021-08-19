import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from '@styles/quiz/questionIntro.module.scss';
import useKeyPress from '../../hooks/useKeyPress';
import { controls } from '../../config.json';

const Intro = ({ content, startQuestion }) => {
  // skip media
  const skip = useKeyPress(controls.skip);
  useEffect(() => {
    if (skip) startQuestion();
  }, [skip]);

  return (
    <div>
      <h1 className='display-3'>{content.title}</h1>

      <div className={styles.videoWrapper}>
        <video controls autoPlay preload='metadata' onEnded={startQuestion}>
          <source src={content.audio} type='video/mp4' />
        </video>
        <div className='mt-4'>
          <button type='button'>Skip</button>
        </div>
      </div>
    </div>
  );
};

export default Intro;

Intro.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
  startQuestion: PropTypes.func.isRequired,
};

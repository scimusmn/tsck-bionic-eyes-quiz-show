import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from '@styles/quiz/questionIntro.module.scss';
import { controls } from '../../config.json';
import { useCaptions, useKeyPress } from '../../hooks';

const Intro = ({ content, startQuestion }) => {
  // skip media
  useKeyPress(controls.skip, () => startQuestion());

  // Load captions
  const videoRef = useRef();
  const captions = useCaptions(videoRef);

  return (
    <div className={styles.questionIntro}>
      <h1 className={styles.title}>{content.title}</h1>

      <div className={styles.videoWrapper}>
        <video
          controls={false}
          autoPlay
          preload='metadata'
          onEnded={startQuestion}
          ref={videoRef}
        >
          <source src={content.audio} type='video/mp4' />
          <track kind='subtitles' src={content.captions} default />
        </video>
      </div>

      <p className={styles.captions}>{captions}</p>
    </div>
  );
};

export default Intro;

Intro.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
  startQuestion: PropTypes.func.isRequired,
};

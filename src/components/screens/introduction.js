import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import styles from '@styles/screens/introduction.module.scss';
import useKeyPress from '../../hooks/useKeyPress';
import { controls } from '../../config.json';

const IntroductionScreen = ({ goTo }) => {
  const { t } = useTranslation();

  const video = useRef();
  const source = useRef();
  const url = t('introduction.video');

  useEffect(() => {
    function reloadVideo() {
      video.current.pause();
      source.current.setAttribute('src', url);
      video.current.load();
      video.current.play();
    }
    reloadVideo();
  }, [url]);

  // skip media
  const skip = useKeyPress(controls.skip);
  useEffect(() => {
    if (skip) goTo('quiz');
  }, [skip]);

  return (
    <div className={styles.introduction}>
      <div className={styles.videoWrapper}>
        <video
          ref={video}
          controls
          preload='metadata'
          autoPlay
          onEnded={() => goTo('quiz')}
        >
          <source ref={source} src={t('introduction.video')} type='video/mp4' />
        </video>
        <button type='button'>Skip</button>
      </div>
      <div className={styles.titleWrapper}>
        <h1>{t('introduction.title')}</h1>
      </div>
    </div>
  );
};

export default IntroductionScreen;

IntroductionScreen.propTypes = {
  goTo: PropTypes.func.isRequired,
};

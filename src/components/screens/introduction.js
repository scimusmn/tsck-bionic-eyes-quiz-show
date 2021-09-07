import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import styles from '@styles/screens/introduction.module.scss';
import useKeyPress from '../../hooks/useKeyPress';
import { controls } from '../../config.json';
import useCaptions from '../../hooks/useCaptions';

const IntroductionScreen = ({ goTo }) => {
  const { t } = useTranslation();

  const videoRef = useRef();
  const sourceRef = useRef();
  const trackRef = useRef();

  const videoSrc = t('introduction.video');
  const trackSrc = t('introduction.captions');

  // Load captions
  const captions = useCaptions(videoRef);
  const [wrappedCaptions, setWrappedCaptions] = useState('');
  useEffect(() => {
    setWrappedCaptions(captions);
  }, [captions]);

  // skip media
  const skip = useKeyPress(controls.skip);
  useEffect(() => {
    if (skip) goTo('quiz');
  }, [skip]);

  // reload video and captions
  useEffect(() => {
    function reloadVideo() {
      videoRef.current.pause();
      sourceRef.current.setAttribute('src', videoSrc);
      trackRef.current.setAttribute('src', trackSrc);
      videoRef.current.load();
      videoRef.current.play();
    }
    reloadVideo();
    setWrappedCaptions('');
  }, [videoSrc]);

  return (
    <div className={styles.introduction}>
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          controls
          preload='metadata'
          autoPlay
          onEnded={() => goTo('quiz')}
        >
          <source ref={sourceRef} src={videoSrc} type='video/mp4' />
          <track ref={trackRef} kind='subtitles' src={trackSrc} default />
        </video>
        <button type='button'>Skip</button>
      </div>
      <div className={styles.titleWrapper}>
        <h1>{t('introduction.title')}</h1>
        <p>{wrappedCaptions}</p>
      </div>
    </div>
  );
};

export default IntroductionScreen;

IntroductionScreen.propTypes = {
  goTo: PropTypes.func.isRequired,
};

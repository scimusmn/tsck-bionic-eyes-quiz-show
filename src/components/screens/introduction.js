import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import styles from '@styles/screens/introduction.module.scss';
import { controls } from '../../config.json';
import { useCaptions, useKeyPress } from '../../hooks';

const IntroductionScreen = ({ goTo, refresh }) => {
  const { t, i18n } = useTranslation();

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
  useKeyPress(controls.skip, () => goTo('quiz'));

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

  useEffect(() => {
    if (refresh) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, [refresh]);

  return (
    <div className={styles.introduction}>
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          controls={false}
          preload='metadata'
          autoPlay
          onEnded={() => goTo('quiz')}
        >
          <source ref={sourceRef} src={videoSrc} type='video/mp4' />
          <track ref={trackRef} kind='subtitles' src={trackSrc} default />
        </video>
      </div>
      <div className={styles.titleWrapper}>
        <h1>{t('introduction.title')}</h1>
        <p dir={i18n.dir()} dangerouslySetInnerHTML={{ __html: wrappedCaptions }} />
      </div>
    </div>
  );
};

export default IntroductionScreen;

IntroductionScreen.propTypes = {
  goTo: PropTypes.func.isRequired,
  refresh: PropTypes.bool.isRequired,
};

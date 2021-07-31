import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

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

  return (
    <div className='full-screen flex-center'>
      <div
        style={{ height: '100%', flex: 1, position: 'relative' }}
        className='flex-center'
      >
        <video
          ref={video}
          controls={false}
          preload='metadata'
          style={{ width: '100%' }}
          autoPlay
          onEnded={() => goTo('quiz')}
        >
          <source ref={source} src={t('introduction.video')} type='video/mp4' />
          {/* <track
            label='English'
            kind='subtitles'
            srcLang='en'
            default
            src={t('introduction.captions')}
          /> */}
        </video>
        <button
          className='abs-center'
          type='button'
          onClick={() => goTo('quiz')}
        >
          Skip
        </button>
      </div>
      <div style={{ height: '100%', flex: 1 }} className='flex-center'>
        <h1>{t('introduction.title')}</h1>
      </div>
    </div>
  );
};

export default IntroductionScreen;

IntroductionScreen.propTypes = {
  goTo: PropTypes.func.isRequired,
};

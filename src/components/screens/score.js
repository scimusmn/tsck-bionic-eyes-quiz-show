import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const ScoreScreen = ({ goTo }) => {
  const { t } = useTranslation();

  return (
    <div className='score container'>
      <div className='score__videoWrapper'>
        <video
          controls
          preload='metadata'
          autoPlay
          onEnded={() => goTo('attract')}
        >
          <source src={t('score.video')} type='video/mp4' />
        </video>
        <button type='button' onClick={() => goTo('attract')}>
          Skip
        </button>
      </div>
      <div className='score__resultWrapper mt-4'>
        <h1>{t('score.title')}</h1>

        <div className='score__grid mt-4'>
          <div className='item'>
            <div className='number display-4'>1</div>
            <div className='label'>
              {t('players', { returnObjects: true })[0]}
            </div>
          </div>
          <div className='item'>
            <div className='number display-4'>2</div>
            <div className='label'>
              {t('players', { returnObjects: true })[1]}
            </div>
          </div>
          <div className='item'>
            <div className='number display-4'>4</div>
            <div className='label'>
              {t('players', { returnObjects: true })[2]}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreScreen;

ScoreScreen.propTypes = {
  goTo: PropTypes.func.isRequired,
};

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import useKeyPress from '../../hooks/useKeyPress';
import { controls } from '../../config.json';

const ScoreScreen = ({ goTo, scores }) => {
  const { t } = useTranslation();

  // skip media
  const skip = useKeyPress(controls.skip);
  useEffect(() => {
    if (skip) goTo('attract', true);
  }, [skip]);

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
        <button type='button'>Skip</button>
      </div>
      <div className='score__resultWrapper mt-4'>
        <h1>{t('score.title')}</h1>

        <div className='score__grid mt-4'>
          <div className='item'>
            <div className='number display-4'>{scores.p1}</div>
            <div className='label'>
              {t('players', { returnObjects: true })[0]}
            </div>
          </div>
          <div className='item'>
            <div className='number display-4'>{scores.p2}</div>
            <div className='label'>
              {t('players', { returnObjects: true })[1]}
            </div>
          </div>
          <div className='item'>
            <div className='number display-4'>{scores.p3}</div>
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
  scores: PropTypes.instanceOf(Object).isRequired,
};

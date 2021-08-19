import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import styles from '@styles/screens/score.module.scss';
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
    <div className={`${styles.score} container`}>
      <div className={styles.videoWrapper}>
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
      <div className='mt-4'>
        <h1>{t('score.title')}</h1>

        <div className={`${styles.grid} mt-4`}>
          <div className={styles.item}>
            <div className='display-4'>{scores.p1}</div>
            <div>{t('players', { returnObjects: true })[0]}</div>
          </div>
          <div className={styles.item}>
            <div className='display-4'>{scores.p2}</div>
            <div>{t('players', { returnObjects: true })[1]}</div>
          </div>
          <div className={styles.item}>
            <div className='display-4'>{scores.p3}</div>
            <div>{t('players', { returnObjects: true })[2]}</div>
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

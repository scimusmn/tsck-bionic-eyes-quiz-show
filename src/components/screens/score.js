import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import styles from '@styles/screens/score.module.scss';
import { controls } from '../../config.json';
import { useCaptions, useSoundEffect, useKeyPress } from '../../hooks';

const ScoreScreen = ({ goTo, scores }) => {
  const { t, i18n } = useTranslation();

  // load captions
  const videoRef = useRef();
  const captions = useCaptions(videoRef);

  // skip media
  useKeyPress(controls.skip, () => goTo('attract', true));

  // get key with max value
  function getWinners() {
    const winners = Object.keys(scores).filter(
      (x) => scores[x] === Math.max.apply(null, Object.values(scores))
    );
    return winners;
  }

  const [playScoreSound] = useSoundEffect('finalScore');
  useEffect(() => {
    playScoreSound();
  }, []);

  return (
    <section className={styles.score}>
      <div className={styles.videoWrapper}>
        <video
          ref={videoRef}
          controls={false}
          preload='metadata'
          autoPlay
          onEnded={() => goTo('attract')}
        >
          <source src={t('score.video')} type='video/mp4' />
          <track kind='subtitles' src={t('score.captions')} default />
        </video>
      </div>

      <div className={styles.bottomWrapper}>
        <h1 className={styles.title}>{t('score.title')}</h1>

        <div className={styles.grid}>
          <div
            className={`${styles.item} ${
              getWinners().includes('p1') ? styles.winner : undefined
            }`}
          >
            <div>{scores.p1}</div>
            <div>{t('quizCommon.players', { returnObjects: true })[0]}</div>
          </div>
          <div
            className={`${styles.item} ${
              getWinners().includes('p2') ? styles.winner : undefined
            }`}
          >
            <div>{scores.p2}</div>
            <div>{t('quizCommon.players', { returnObjects: true })[1]}</div>
          </div>
          <div
            className={`${styles.item} ${
              getWinners().includes('p3') ? styles.winner : undefined
            }`}
          >
            <div>{scores.p3}</div>
            <div>{t('quizCommon.players', { returnObjects: true })[2]}</div>
          </div>
        </div>
      </div>
      <p className={styles.captions} dir={i18n.dir()}>{captions}</p>
    </section>
  );
};

export default ScoreScreen;

ScoreScreen.propTypes = {
  goTo: PropTypes.func.isRequired,
  scores: PropTypes.instanceOf(Object).isRequired,
};

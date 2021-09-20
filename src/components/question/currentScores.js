import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import styles from '@styles/quiz/currentScores.module.scss';

const CurrentScores = ({
  scores,
  selectedOptionIndex,
  correctOptionIndex,
  showSolution,
}) => {
  const { t } = useTranslation();

  function getSelectClass(choice) {
    return choice !== null ? styles.active : undefined;
  }

  function getCorrectClass(choice) {
    return showSolution && choice === correctOptionIndex
      ? styles.correct
      : undefined;
  }

  return (
    <div className={styles.currentScores}>
      <h3 className={styles.heading}>{t('quizCommon.scoreTitle')}</h3>
      <div className={styles.grid}>
        <div
          className={`${styles.item} 
        ${getSelectClass(selectedOptionIndex.p1)}
        ${getCorrectClass(selectedOptionIndex.p1)}`}
        >
          <span>{scores.p1}</span>
          <span>{t('quizCommon.players', { returnObjects: true })[0]}</span>
        </div>

        <div
          className={`${styles.item}
        ${getSelectClass(selectedOptionIndex.p2)}
        ${getCorrectClass(selectedOptionIndex.p2)}`}
        >
          <span>{scores.p2}</span>
          <span>{t('quizCommon.players', { returnObjects: true })[1]}</span>
        </div>

        <div
          className={`${styles.item}
        ${getSelectClass(selectedOptionIndex.p3)}
        ${getCorrectClass(selectedOptionIndex.p3)}`}
        >
          <span>{scores.p3}</span>
          <span>{t('quizCommon.players', { returnObjects: true })[2]}</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentScores;

CurrentScores.propTypes = {
  selectedOptionIndex: PropTypes.instanceOf(Object).isRequired,
  scores: PropTypes.instanceOf(Object).isRequired,
  correctOptionIndex: PropTypes.number.isRequired,
  showSolution: PropTypes.bool.isRequired,
};

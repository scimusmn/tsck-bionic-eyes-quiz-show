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
      <div
        className={`${styles.item} 
        ${getSelectClass(selectedOptionIndex.p1)}
        ${getCorrectClass(selectedOptionIndex.p1)}`}
      >
        <div className='number display-4'>{scores.p1}</div>
        <div className='label'>{t('players', { returnObjects: true })[0]}</div>
      </div>
      <div
        className={`${styles.item}
        ${getSelectClass(selectedOptionIndex.p2)}
        ${getCorrectClass(selectedOptionIndex.p2)}`}
      >
        <div className='number display-4'>{scores.p2}</div>
        <div className='label'>{t('players', { returnObjects: true })[1]}</div>
      </div>
      <div
        className={`${styles.item}
        ${getSelectClass(selectedOptionIndex.p3)}
        ${getCorrectClass(selectedOptionIndex.p3)}`}
      >
        <div className='number display-4'>{scores.p3}</div>
        <div className='label'>{t('players', { returnObjects: true })[2]}</div>
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

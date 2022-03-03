import React from 'react';
import PropTypes from 'prop-types';
import styles from '@styles/quiz/options.module.scss';
import { useTranslation } from 'react-i18next';

const Options = ({ question, solution, showSolution }) => {
  const { i18n } = useTranslation();
  const correctStyles = (index) => {
    if (showSolution) {
      return solution.correctOption - 1 === index
        ? styles.correct
        : styles.incorrect;
    }
    return undefined;
  };

  return (
    <div className={styles.options}>
      {question.type !== 'multi-choice-media' &&
        question.options.map((option, index) => (
          <div key={option} className={correctStyles(index)}>
            <button dir={i18n.dir()} type='button'>{option}</button>
            <span className={styles.index}>{index + 1}</span>
          </div>
        ))}
    </div>
  );
};

export default Options;

Options.propTypes = {
  question: PropTypes.instanceOf(Object).isRequired,
  solution: PropTypes.instanceOf(Object).isRequired,
  showSolution: PropTypes.bool.isRequired,
};

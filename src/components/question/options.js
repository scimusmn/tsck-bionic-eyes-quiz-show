import React from 'react';
import PropTypes from 'prop-types';
import styles from '@styles/quiz/options.module.scss';

const Options = ({ question, solution, showSolution }) => {
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
            <button type='button'>{option}</button>
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

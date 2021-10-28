import React from 'react';
import PropTypes from 'prop-types';
import styles from '@styles/quiz/options.module.scss';

const Options = ({ question, solution, showSolution }) => (
  <div className={styles.options}>
    {question.type !== 'multi-choice-media' &&
      question.options.map((option, index) => (
        <div
          key={option}
          className={
            showSolution && solution.correctOption - 1 === index
              ? styles.correct
              : undefined
          }
        >
          <button type='button'>{option}</button>
          <span className={styles.index}>{index + 1}</span>
        </div>
      ))}
  </div>
);

export default Options;

Options.propTypes = {
  question: PropTypes.instanceOf(Object).isRequired,
  solution: PropTypes.instanceOf(Object).isRequired,
  showSolution: PropTypes.bool.isRequired,
};

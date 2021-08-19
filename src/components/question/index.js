import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '@styles/quiz/question.module.scss';
import useKeyPress from '../../hooks/useKeyPress';
import { controls, timePerQuestion } from '../../config.json';
import { LayoutOne, LayoutTwo } from './types';
import Solution from './solution';
import CurrentScores from './currentScores';

const Question = ({ content, goToNext, scores, increaseScore }) => {
  const { question, questionIntro, solution } = content;
  const [selectedOptionIndex, setSelectedOptionIndex] = useState({
    p1: null,
    p2: null,
    p3: null,
  });

  const [showSolution, setShowSolution] = useState(false);

  function revealSolution() {
    if (showSolution) return;
    setShowSolution(true);
    Object.entries(selectedOptionIndex).forEach(([key, value]) => {
      if (value === solution.correctOptionIndex) {
        increaseScore(key);
      }
    });
  }

  function choose(player, optionIndex) {
    if (selectedOptionIndex[player] !== null) return;
    setSelectedOptionIndex({
      ...selectedOptionIndex,
      [player]: optionIndex,
    });
  }

  // players keyboard input
  const p1Keys = question.options.map((_, i) => useKeyPress(controls.p1[i]));
  const p2Keys = question.options.map((_, i) => useKeyPress(controls.p2[i]));
  const p3Keys = question.options.map((_, i) => useKeyPress(controls.p3[i]));
  useEffect(() => {
    p1Keys.forEach((key, i) => key && choose('p1', i));
    p2Keys.forEach((key, i) => key && choose('p2', i));
    p3Keys.forEach((key, i) => key && choose('p3', i));
  }, [p1Keys, p2Keys, p3Keys]);

  // if everyone has answered - go to the next question
  useEffect(() => {
    if (Object.values(selectedOptionIndex).every((p) => p !== null)) {
      revealSolution();
    }
  }, [selectedOptionIndex]);

  // set timer for every question
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);
  useEffect(() => {
    if (!timeLeft) {
      revealSolution();
      return;
    }
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
      console.log('time left: ', timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <>
      <div className={styles.question}>
        <h2>{questionIntro.title}</h2>
        <p>{question.text}</p>

        <div
          className={`${styles.grid} ${
            question.type === 'multi-choice-media'
              ? styles.layoutTwo
              : undefined
          } mt-4`}
        >
          <div className={styles.solution}>
            {showSolution && (
              <Solution content={solution} goToNext={goToNext} />
            )}
          </div>
          {question.type === 'multi-choice-media' ? (
            <LayoutTwo media={question.visualMedia} />
          ) : (
            <LayoutOne media={question.visualMedia} />
          )}
          <div className={styles.options}>
            {question.options.map((option, index) => (
              <div key={option}>
                <button
                  type='button'
                  className={
                    showSolution && solution.correctOptionIndex === index
                      ? styles.active
                      : undefined
                  }
                >
                  {option}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <CurrentScores
        scores={scores}
        selectedOptionIndex={selectedOptionIndex}
        showSolution={showSolution}
        correctOptionIndex={solution.correctOptionIndex}
      />
    </>
  );
};

export default Question;

Question.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
  goToNext: PropTypes.func.isRequired,
  scores: PropTypes.instanceOf(Object).isRequired,
  increaseScore: PropTypes.func.isRequired,
};

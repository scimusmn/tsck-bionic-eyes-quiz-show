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

  // state
  const [selectedOptionIndex, setSelectedOptionIndex] = useState({
    p1: null,
    p2: null,
    p3: null,
  });
  const [showSolution, setShowSolution] = useState(false);
  const [timeLeft, setTimeLeft] = useState(timePerQuestion);

  // show solution and increase scores
  function revealSolution() {
    if (showSolution) return;
    setShowSolution(true);
    Object.entries(selectedOptionIndex).forEach(([key, value]) => {
      if (value === solution.correctOptionIndex) {
        increaseScore(key);
      }
    });
  }

  // choose option for player
  function choose(player, optionIndex) {
    if (showSolution || selectedOptionIndex[player] !== null) return;
    setSelectedOptionIndex({
      ...selectedOptionIndex,
      [player]: optionIndex,
    });
  }

  // listen to players keyboard input
  const p1Keys = question.options.map((_, i) => useKeyPress(controls.p1[i]));
  const p2Keys = question.options.map((_, i) => useKeyPress(controls.p2[i]));
  const p3Keys = question.options.map((_, i) => useKeyPress(controls.p3[i]));
  p1Keys.forEach((key, i) => key && choose('p1', i));
  p2Keys.forEach((key, i) => key && choose('p2', i));
  p3Keys.forEach((key, i) => key && choose('p3', i));

  // if everyone has answered - go to the next question
  useEffect(() => {
    if (Object.values(selectedOptionIndex).every((p) => p !== null)) {
      revealSolution();
    }
  }, [selectedOptionIndex]);

  // set timer for every question
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
    <div className={styles.wrapper}>
      <div className={styles.question}>
        <h2>{questionIntro.title}</h2>
        <p>{question.text}</p>
      </div>

      <div
        className={`${styles.content} ${
          question.type === 'multi-choice-media' ? styles.layoutTwo : undefined
        }`}
      >
        <div className={styles.solution}>
          {showSolution && <Solution content={solution} goToNext={goToNext} />}
        </div>
        {question.type === 'multi-choice-media' ? (
          <LayoutTwo
            media={question.visualMedia}
            showSolution={showSolution}
            correctOptionIndex={solution.correctOptionIndex}
          />
        ) : (
          <LayoutOne media={question.visualMedia} showSolution={showSolution} />
        )}
        <div className={styles.options}>
          {question.type !== 'multi-choice-media' &&
            question.options.map((option, index) => (
              <div
                key={option}
                className={
                  showSolution && solution.correctOptionIndex === index
                    ? styles.correct
                    : undefined
                }
              >
                <button type='button'>{option}</button>
                <span className={styles.index}>{index + 1}</span>
              </div>
            ))}
        </div>
      </div>

      <CurrentScores
        scores={scores}
        selectedOptionIndex={selectedOptionIndex}
        showSolution={showSolution}
        correctOptionIndex={solution.correctOptionIndex}
      />
    </div>
  );
};

export default Question;

Question.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
  goToNext: PropTypes.func.isRequired,
  scores: PropTypes.instanceOf(Object).isRequired,
  increaseScore: PropTypes.func.isRequired,
};

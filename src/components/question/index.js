import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '@styles/quiz/question.module.scss';
import { controls } from '../../config.json';
import { LayoutOne, LayoutTwo } from './layouts';
import Solution from './solution';
import CurrentScores from './currentScores';
import Timer from './timer';
import Options from './options';
import { useSoundEffect, useKeyPress } from '../../hooks';

const Question = ({ content, goToNext, scores, increaseScore }) => {
  const { question, questionIntro, solution } = content;

  // state
  const [selectedOptionIndex, setSelectedOptionIndex] = useState({
    p1: null,
    p2: null,
    p3: null,
  });
  const [showSolution, setShowSolution] = useState(false);

  // sound effects
  const inputSound = {
    p1: useSoundEffect('input'),
    p2: useSoundEffect('input'),
    p3: useSoundEffect('input'),
  };
  const [playWaitSound, pauseWaitSound] = useSoundEffect('wait', true);
  const [playSuccessSound] = useSoundEffect('success');
  const [playFailSound] = useSoundEffect('fail');

  // show solution and increase scores
  function revealSolution() {
    if (showSolution) return;
    setShowSolution(true);

    pauseWaitSound();

    const answersArray = Object.entries(selectedOptionIndex);
    let allCorrect = true;
    answersArray.forEach(([key, value]) => {
      const isCorrect = value === solution.correctOption - 1;
      if (isCorrect) {
        increaseScore(key);
      }
      allCorrect = allCorrect && isCorrect;
    });

    if (allCorrect) {
      playSuccessSound();
    } else {
      playFailSound();
    }
  }

  // choose option for player
  function choose(player, optionIndex) {
    if (showSolution || selectedOptionIndex[player] !== null) return;

    // play input sound effect
    inputSound[player][0]();

    setSelectedOptionIndex((prevState) => ({
      ...prevState,
      [player]: optionIndex,
    }));
  }

  // listen to players keyboard input
  question.options.forEach((_, i) => {
    useKeyPress(controls.p1[i], () => choose('p1', i));
    useKeyPress(controls.p2[i], () => choose('p2', i));
    useKeyPress(controls.p3[i], () => choose('p3', i));
  });

  // if everyone has answered - go to the next question
  useEffect(() => {
    if (Object.values(selectedOptionIndex).every((p) => p !== null)) {
      revealSolution();
    }
  }, [selectedOptionIndex]);

  // play wait music
  useEffect(() => {
    playWaitSound();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.question}>
        <h2>{questionIntro.title}</h2>
        <p>{question.text}</p>

        <div className={styles.videoWrapper}>
          {!showSolution && (
            <video controls={false} autoPlay preload='metadata'>
              <source src={question.audio} type='video/mp4' />
            </video>
          )}
        </div>
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
            correctOption={solution.correctOption}
          />
        ) : (
          <LayoutOne
            media={question.visualMedia}
            solutionMedia={solution.visualMedia}
            showSolution={showSolution}
          />
        )}

        <Options
          question={question}
          solution={solution}
          showSolution={showSolution}
        />
      </div>

      <CurrentScores
        scores={scores}
        selectedOptionIndex={selectedOptionIndex}
        showSolution={showSolution}
        correctOption={solution.correctOption}
      />

      <Timer callback={revealSolution} />
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

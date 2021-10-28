import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '@styles/quiz/question.module.scss';
import useKeyPress from '../../hooks/useKeyPress';
import { controls, timePerQuestion } from '../../config.json';
import { LayoutOne, LayoutTwo } from './layouts';
import Solution from './solution';
import CurrentScores from './currentScores';
import Timer from './timer';
import Options from './options';
import useSoundEffect from '../../hooks/useSoundEffect';

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

  // sound effects
  const inputSoundEffect = {
    p1: useSoundEffect('input'),
    p2: useSoundEffect('input'),
    p3: useSoundEffect('input'),
  };
  const [playingWaitSound, toggleWaitSound] = useSoundEffect('wait', true);
  const [, toggleSuccessSound] = useSoundEffect('success');
  const [, toggleFailSound] = useSoundEffect('fail');

  // show solution and increase scores
  function revealSolution() {
    if (showSolution) return;
    setShowSolution(true);

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
      toggleSuccessSound();
    } else {
      toggleFailSound();
    }
  }

  // choose option for player
  function choose(player, optionIndex) {
    if (showSolution || selectedOptionIndex[player] !== null) return;

    if (!inputSoundEffect[player][0]) inputSoundEffect[player][1]();

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
      if (playingWaitSound) toggleWaitSound();
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
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // play wait music
  useEffect(() => {
    if (!playingWaitSound) toggleWaitSound();
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

      <Timer timeLeft={timeLeft} />
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

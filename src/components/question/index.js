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

const Question = ({
  content,
  goToNext,
  scores,
  increaseScore,
  unanswered,
  setUnanswered,
}) => {
  const { question, questionIntro, solution } = content;

  // state
  const [selectedOptionIndex, setSelectedOptionIndex] = useState({
    p1: null,
    p2: null,
    p3: null,
  });
  const [showSolution, setShowSolution] = useState(false);
  const [showTimer, setShowTimer] = useState(false);

  // sound effects
  const inputSound = {
    p1: useSoundEffect('input'),
    p2: useSoundEffect('input'),
    p3: useSoundEffect('input'),
  };
  const [playSuccessSound] = useSoundEffect('success');
  const [playFailSound] = useSoundEffect('fail');

  // show solution and increase scores
  function revealSolution() {
    if (showSolution) return;
    setShowSolution(true);

    const answersArray = Object.entries(selectedOptionIndex);
    let someCorrect = false;
    let allNull = true;
    answersArray.forEach(([key, value]) => {
      const isCorrect = value === solution.correctOption - 1;
      if (isCorrect) {
        increaseScore(key);
      }
      someCorrect = someCorrect || isCorrect;
      allNull = allNull && value === null;
    });

    if (someCorrect) {
      playSuccessSound();
    } else {
      playFailSound();
    }

    // if nobody answered increment the 'unanswered' counter
    if (allNull) {
      setUnanswered(unanswered + 1);
    } else {
      setUnanswered(0);
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
    const hasEveryoneAnswered = Object.values(selectedOptionIndex).every(
      (p) => p !== null
    );

    if (hasEveryoneAnswered) {
      revealSolution();
    }
  }, [selectedOptionIndex]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.question}>
        <h2>{questionIntro.title}</h2>
        <p>{question.text}</p>

        <div className={styles.videoWrapper}>
          {!showSolution && (
            <video
              controls={false}
              autoPlay
              preload='metadata'
              onEnded={() => setShowTimer(true)}
            >
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

      {showTimer && <Timer callback={revealSolution} stop={showSolution} />}
    </div>
  );
};

export default Question;

Question.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
  goToNext: PropTypes.func.isRequired,
  scores: PropTypes.instanceOf(Object).isRequired,
  increaseScore: PropTypes.func.isRequired,
  unanswered: PropTypes.number.isRequired,
  setUnanswered: PropTypes.func.isRequired,
};

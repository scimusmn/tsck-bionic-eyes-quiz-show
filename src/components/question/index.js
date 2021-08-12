import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Intro from './intro';
import useKeyPress from '../../hooks/useKeyPress';
import { controls } from '../../config.json';
import { MultiChoice, TrueFalse } from './types';
import Solution from './solution';
import CurrentScores from './currentScores';

const Question = ({ content, goToNext, scores, increaseScore }) => {
  const { question, questionIntro, solution } = content;
  const [showQuestion, setShowQuestion] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState({
    p1: null,
    p2: null,
    p3: null,
  });
  const [showSolution, setShowSolution] = useState(false);

  function startQuestion() {
    setShowQuestion(true);
  }

  function revealSolution() {
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
    if (!showQuestion) return;
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

  if (!showQuestion) {
    return <Intro content={questionIntro} startQuestion={startQuestion} />;
  }

  return (
    <>
      <div className='question'>
        <h2>{questionIntro.title}</h2>
        <p>{question.text}</p>

        <div className='question__grid mt-4'>
          <div className='solution-wrapper'>
            {showSolution && (
              <Solution content={solution} goToNext={goToNext} />
            )}
          </div>
          <div className='media-wrapper'>
            {
              {
                'true-false': <TrueFalse media={question.visualMedia} />,
                'multi-choice-text': (
                  <MultiChoice media={question.visualMedia} />
                ),
                'multi-choice-media': (
                  <MultiChoice media={question.visualMedia} />
                ),
              }[question.type]
            }
          </div>
          <div className='options-wrapper'>Options</div>
        </div>
      </div>

      <CurrentScores
        scores={scores}
        selectedOptionIndex={selectedOptionIndex}
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

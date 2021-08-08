import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Intro from './intro';
import useKeyPress from '../../hooks/useKeyPress';
import { controls } from '../../config.json';
import { MultiChoice, TrueFalse } from './types';

const Question = ({ content, goToNext }) => {
  const { question, questionIntro } = content;

  const [ready, setReady] = useState(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState({
    p1: null,
    p2: null,
    p3: null,
  });

  function startQuestion() {
    setReady(true);
  }

  function choose(player, optionIndex) {
    if (selectedOptionIndex[player] !== null) return;
    setSelectedOptionIndex({
      ...selectedOptionIndex,
      [player]: optionIndex,
    });
  }

  const p1Keys = question.options.map((_, i) => useKeyPress(controls.p1[i]));
  const p2Keys = question.options.map((_, i) => useKeyPress(controls.p2[i]));
  const p3Keys = question.options.map((_, i) => useKeyPress(controls.p3[i]));

  useEffect(() => {
    if (!ready) return;
    p1Keys.forEach((key, i) => key && choose('p1', i));
    p2Keys.forEach((key, i) => key && choose('p2', i));
    p3Keys.forEach((key, i) => key && choose('p3', i));
  }, [p1Keys, p2Keys, p3Keys]);

  // if everyone has answered - go to the next question
  useEffect(() => {
    if (Object.values(selectedOptionIndex).every((p) => p !== null)) goToNext();
  }, [selectedOptionIndex]);

  if (!ready) {
    return <Intro content={questionIntro} startQuestion={startQuestion} />;
  }

  return (
    <div className='question'>
      <h2>{questionIntro.title}</h2>
      <p>{question.text}</p>

      <div className='question__grid mt-4'>
        <div className='solution'>Solution</div>
        <div className='media'>
          {
            {
              'true-false': <TrueFalse media={question.visualMedia} />,
              'multi-choice-text': <MultiChoice media={question.visualMedia} />,
              'multi-choice-media': (
                <MultiChoice media={question.visualMedia} />
              ),
            }[question.type]
          }
        </div>
        <div className='options'>Options</div>
      </div>
    </div>
  );
};

export default Question;

Question.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
  goToNext: PropTypes.func.isRequired,
};

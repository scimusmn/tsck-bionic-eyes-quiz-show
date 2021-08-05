import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Intro from './intro';

const Question = ({ content, goToNext }) => {
  const [ready, setReady] = useState(false);

  const { question, questionIntro } = content;

  function startQuestion() {
    setReady(true);
  }

  if (!ready) {
    return <Intro content={questionIntro} startQuestion={startQuestion} />;
  }

  return (
    <div>
      <h1>{questionIntro.title}</h1>
      <h2>{question.text}</h2>

      <div className='mt-5'>
        <button type='button' onClick={goToNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Question;

Question.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
  goToNext: PropTypes.func.isRequired,
};

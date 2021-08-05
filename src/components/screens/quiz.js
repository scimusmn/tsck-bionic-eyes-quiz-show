import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Question from '../question';

const QuizScreen = ({ goTo, quiz }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  function showResults() {
    goTo('score');
  }

  function goToNext() {
    if (quiz.length - 1 === activeIndex) {
      showResults();
    }
    setActiveIndex(activeIndex + 1);
  }

  return (
    <div className='quiz'>
      <Question
        key={activeIndex} // re-render component on index change
        content={quiz[activeIndex]}
        goToNext={goToNext}
      />
    </div>
  );
};
export default QuizScreen;

QuizScreen.propTypes = {
  goTo: PropTypes.func.isRequired,
  quiz: PropTypes.instanceOf(Array).isRequired,
};

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '@styles/screens/quiz.module.scss';
import Question from '../question';
import Intro from '../question/intro';
import Progress from '../question/progress';

const QuizScreen = ({ quiz, increaseScore, scores, showResults }) => {
  const [question, setQuestion] = useState({ index: 0, start: false });

  function startQuestion() {
    setQuestion((prevState) => ({
      ...prevState,
      start: true,
    }));
  }

  function goToNext() {
    if (quiz.length - 1 === question.index) {
      showResults();
    }
    setQuestion((prevState) => ({
      index: prevState.index + 1,
      start: false,
    }));
  }

  return (
    <div className={styles.quiz}>
      {question.start ? (
        <Question
          content={quiz[question.index]}
          goToNext={goToNext}
          scores={scores}
          increaseScore={increaseScore}
        />
      ) : (
        <Intro
          content={quiz[question.index].questionIntro}
          startQuestion={startQuestion}
        />
      )}

      {question.start && (
        <Progress current={question.index + 1} total={quiz.length} />
      )}
    </div>
  );
};
export default QuizScreen;

QuizScreen.propTypes = {
  quiz: PropTypes.instanceOf(Array).isRequired,
  scores: PropTypes.instanceOf(Object).isRequired,
  increaseScore: PropTypes.func.isRequired,
  showResults: PropTypes.func.isRequired,
};

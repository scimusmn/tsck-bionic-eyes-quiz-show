import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout';
import {
  AttractScreen,
  IntroductionScreen,
  QuizScreen,
  ScoreScreen,
} from '../components/screens';
import { useKeyPress } from '../hooks';
import { controls, pointPerQuestion } from '../config.json';
import { addLangClass } from '../helpers';

const IndexPage = () => {
  const { i18n, t } = useTranslation('quiz');
  const questionSets = t('questionSets', { returnObjects: true });
  const numOfQuiz = questionSets.length;

  // Game state
  const [activeScreen, setActiveScreen] = useState('attract'); // change to attract
  const [quizIndex, setQuizIndex] = useState(-1);
  const [scores, setScores] = useState({ p1: 0, p2: 0, p3: 0 });

  // Jump to next quiz
  function handleNextQuiz() {
    setQuizIndex((prevState) => (prevState + 1) % numOfQuiz);
    setScores({ p1: 0, p2: 0, p3: 0 });
  }

  // Change screen
  function goTo(screen) {
    setActiveScreen(screen);
  }

  // Change language
  const ar = useKeyPress(controls.start.ar);
  const en = useKeyPress(controls.start.en);
  useEffect(() => {
    if (!(ar || en)) return;
    if (ar) {
      i18n.changeLanguage('ar');
      addLangClass('ar');
    } else if (en) {
      i18n.changeLanguage('en');
      addLangClass('en');
    }
    handleNextQuiz();
    goTo('introduction');
  }, [ar, en]);

  // Handle game state
  function increaseScore(player) {
    setScores((prevState) => ({
      ...prevState,
      [player]: prevState[player] + pointPerQuestion,
    }));
  }

  function showResults() {
    goTo('score');
  }

  return (
    <Layout>
      {
        {
          attract: <AttractScreen />,
          introduction: <IntroductionScreen goTo={goTo} refresh={ar || en} />,
          quiz: (
            <QuizScreen
              quiz={questionSets[quizIndex]}
              scores={scores}
              increaseScore={increaseScore}
              showResults={showResults}
            />
          ),
          score: <ScoreScreen goTo={goTo} scores={scores} />,
        }[activeScreen]
      }
    </Layout>
  );
};
export default IndexPage;

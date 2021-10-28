import React, { useState } from 'react';
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
  const [quizIndex, setQuizIndex] = useState(0);
  const [scores, setScores] = useState({ p1: 0, p2: 0, p3: 0 });

  // Jump to next quiz
  function handleNextQuiz() {
    setQuizIndex((quizIndex + 1) % numOfQuiz);
    setScores({ p1: 0, p2: 0, p3: 0 });
  }

  // Change screen
  function goTo(screen, restart = false) {
    setActiveScreen(screen);
    if (restart) handleNextQuiz();
  }

  // Change language
  useKeyPress(controls.start.ar, () => {
    i18n.changeLanguage('ar');
    addLangClass('ar');
    goTo('introduction', activeScreen !== 'attract');
  });

  useKeyPress(controls.start.en, () => {
    i18n.changeLanguage('en');
    addLangClass('en');
    goTo('introduction', activeScreen !== 'attract');
  });

  // Handle game state
  function increaseScore(player) {
    setScores((prevState) => ({
      ...prevState,
      [player]: prevState[player] + pointPerQuestion,
    }));
  }

  return (
    <Layout>
      {
        {
          attract: <AttractScreen />,
          introduction: <IntroductionScreen goTo={goTo} />,
          quiz: (
            <QuizScreen
              goTo={goTo}
              quiz={questionSets[quizIndex]}
              scores={scores}
              increaseScore={increaseScore}
            />
          ),
          score: <ScoreScreen goTo={goTo} scores={scores} />,
        }[activeScreen]
      }
    </Layout>
  );
};
export default IndexPage;

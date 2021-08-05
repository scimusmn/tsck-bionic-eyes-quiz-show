import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout';
import {
  AttractScreen,
  IntroductionScreen,
  QuizScreen,
  ScoreScreen,
} from '../components/screens';
import useKeyPress from '../hooks/useKeyPress';
import { controls } from '../config.json';

const IndexPage = () => {
  const { i18n, t } = useTranslation('quiz');
  const questionSets = t('questionSets', { returnObjects: true });
  const numOfQuiz = questionSets.length;

  // Game state
  const [activeScreen, setActiveScreen] = useState('attract');
  const [quizIndex, setQuizIndex] = useState(0);
  // const [scores, setScores] = useState({ p1: 0, p2: 0, p3: 0 });

  // Change question set
  function handleNextQuiz() {
    setQuizIndex((quizIndex + 1) % numOfQuiz);
  }

  // Change screen
  function goTo(screen) {
    setActiveScreen(screen);
    if (screen === 'attract') handleNextQuiz();
  }

  // Change language
  const ar = useKeyPress(controls.start.ar);
  const en = useKeyPress(controls.start.en);
  useEffect(() => {
    if (!(en || ar)) return;
    if (en) i18n.changeLanguage('en');
    else if (ar) i18n.changeLanguage('ar');
    goTo('introduction');
  }, [en, ar]);

  return (
    <Layout>
      {
        {
          attract: <AttractScreen />,
          introduction: <IntroductionScreen goTo={goTo} />,
          quiz: <QuizScreen goTo={goTo} quiz={questionSets[quizIndex]} />,
          score: <ScoreScreen goTo={goTo} />,
        }[activeScreen]
      }
    </Layout>
  );
};
export default IndexPage;

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
  const [activeScreen, setActiveScreen] = useState('quiz'); // change to attract
  const [quizIndex, setQuizIndex] = useState(0);
  const [scores, setScores] = useState({ p1: 0, p2: 0, p3: 0 });
  const [hasAnswered, setHasAnswered] = useState({
    p1: false,
    p2: false,
    p3: false,
  });

  // Jump to next quiz
  function handleNextQuiz() {
    setQuizIndex((quizIndex + 1) % numOfQuiz);
  }

  // Change screen
  function goTo(screen, restart = false) {
    setActiveScreen(screen);
    if (restart) handleNextQuiz();
  }

  // Change language
  const ar = useKeyPress(controls.start.ar);
  const en = useKeyPress(controls.start.en);
  useEffect(() => {
    if (!(en || ar)) return;
    if (en) i18n.changeLanguage('en');
    else if (ar) i18n.changeLanguage('ar');
    goTo('introduction', activeScreen !== 'attract');
  }, [en, ar]);

  // Handle game state
  function increaseScore(player) {
    setScores({ ...scores, [player]: scores[player] + 1 });
  }
  function takeTurn(player) {
    setHasAnswered({ ...hasAnswered, [player]: true });
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
              increaseScore={increaseScore}
              hasAnswered={hasAnswered}
              takeTurn={takeTurn}
            />
          ),
          score: <ScoreScreen goTo={goTo} />,
        }[activeScreen]
      }
    </Layout>
  );
};
export default IndexPage;

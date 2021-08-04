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

const IndexPage = () => {
  const [activeScreen, setActiveScreen] = useState('attract');
  const { i18n } = useTranslation();

  // Change screen
  function goTo(screen) {
    setActiveScreen(screen);
  }

  // Change language
  const ar = useKeyPress('1');
  const en = useKeyPress('2');
  useEffect(() => {
    if (en) {
      i18n.changeLanguage('en');
      goTo('introduction');
    } else if (ar) {
      i18n.changeLanguage('ar');
      goTo('introduction');
    }
  }, [en, ar]);

  // Render active screen component
  function renderScreen() {
    let screen;
    switch (activeScreen) {
      case 'introduction':
        screen = <IntroductionScreen goTo={goTo} />;
        break;
      case 'quiz':
        screen = <QuizScreen goTo={goTo} />;
        break;
      case 'score':
        screen = <ScoreScreen goTo={goTo} />;
        break;
      default:
        screen = <AttractScreen />;
    }
    return screen;
  }

  return <Layout>{renderScreen()}</Layout>;
};
export default IndexPage;

import React from 'react';
import { useTranslation } from 'react-i18next';

const ScoreScreen = () => {
  const { t } = useTranslation();

  return (
    <div className='full-screen flex-center'>
      <h1>{t('score.title')}</h1>
    </div>
  );
};

export default ScoreScreen;

import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const QuizScreen = ({ goTo }) => {
  const { t } = useTranslation();
  console.log(t);
  return (
    <div className='full-screen flex-center text-center'>
      <div>
        <h1 className='mb-4'>Quiz Screen</h1>
        <button type='button' onClick={() => goTo('score')}>
          Reveal Scores
        </button>
      </div>
    </div>
  );
};

export default QuizScreen;

QuizScreen.propTypes = {
  goTo: PropTypes.func.isRequired,
};

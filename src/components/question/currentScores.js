import React from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const CurrentScores = ({ scores, selectedOptionIndex }) => {
  const { t } = useTranslation();
  return (
    <div className='current-scores'>
      <div className={`item ${selectedOptionIndex.p1 !== null && 'active'}`}>
        <div className='number display-4'>{scores.p1}</div>
        <div className='label'>{t('players', { returnObjects: true })[0]}</div>
      </div>
      <div className={`item ${selectedOptionIndex.p2 !== null && 'active'}`}>
        <div className='number display-4'>{scores.p2}</div>
        <div className='label'>{t('players', { returnObjects: true })[1]}</div>
      </div>
      <div className={`item ${selectedOptionIndex.p3 !== null && 'active'}`}>
        <div className='number display-4'>{scores.p3}</div>
        <div className='label'>{t('players', { returnObjects: true })[2]}</div>
      </div>
    </div>
  );
};

export default CurrentScores;

CurrentScores.propTypes = {
  selectedOptionIndex: PropTypes.instanceOf(Object).isRequired,
  scores: PropTypes.instanceOf(Object).isRequired,
};

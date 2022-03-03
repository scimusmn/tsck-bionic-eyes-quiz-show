import React from 'react';
import PropTypes from 'prop-types';
import styles from '@styles/quiz/solution.module.scss';
import { useTranslation } from 'react-i18next';
import { useKeyPress } from '../../hooks';
import { controls } from '../../config.json';

const Solution = ({ content, goToNext }) => {
  // skip media
  useKeyPress(controls.skip, goToNext);
  const { i18n } = useTranslation();

  return (
    <div className={styles.solution}>
      {/* <p>{content.text}</p> */}
      <p dir={i18n.dir()} dangerouslySetInnerHTML={{ __html: content.text }} />
      <video controls={false} autoPlay preload='metadata' onEnded={goToNext}>
        <source src={content.audio} type='video/mp4' />
      </video>
    </div>
  );
};

export default Solution;

Solution.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
  goToNext: PropTypes.func.isRequired,
};

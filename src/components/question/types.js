import React from 'react';
import PropTypes from 'prop-types';
import styles from '@styles/quiz/types.module.scss';

export const LayoutOne = ({ media, solutionMedia, showSolution = false }) => {
  const visibleMedia = showSolution ? solutionMedia : media;

  return (
    <div
      className={`${styles.media}
      ${showSolution ? styles.active : undefined}`}
    >
      {visibleMedia.video ? (
        <video controls={false} autoPlay preload='metadata'>
          <source src={visibleMedia.video} type='video/mp4' />
        </video>
      ) : (
        <img src={visibleMedia.image} alt='' />
      )}
    </div>
  );
};

export const LayoutTwo = ({ media, correctOption, showSolution = false }) => (
  <div className={`${styles.media} ${styles.multi} `}>
    {media.images.map((src, index) => (
      <div
        key={src}
        className={
          showSolution && correctOption - 1 === index
            ? styles.correct
            : undefined
        }
      >
        <img src={src} alt='' />
        <span className={styles.index}>{index + 1}</span>
      </div>
    ))}
  </div>
);

LayoutOne.propTypes = {
  media: PropTypes.instanceOf(Object).isRequired,
  solutionMedia: PropTypes.instanceOf(Object).isRequired,
  showSolution: PropTypes.bool.isRequired,
};

LayoutTwo.propTypes = {
  media: PropTypes.instanceOf(Object).isRequired,
  correctOption: PropTypes.number.isRequired,
  showSolution: PropTypes.bool.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import styles from '@styles/quiz/types.module.scss';

export const LayoutOne = ({ media }) => (
  <div className={styles.media}>
    {media.video ? (
      <video controls autoPlay preload='metadata'>
        <source src={media.video} type='video/mp4' />
      </video>
    ) : (
      <img src={media.image} alt='' />
    )}
  </div>
);

export const LayoutTwo = ({ media }) => (
  <div className={`${styles.media} ${styles.multi}`}>
    {media.images.map((src) => (
      <div key={src}>
        <img src={src} alt='' />
      </div>
    ))}
  </div>
);

LayoutOne.propTypes = {
  media: PropTypes.instanceOf(Object).isRequired,
};

LayoutTwo.propTypes = {
  media: PropTypes.instanceOf(Object).isRequired,
};

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from '@styles/quiz/layouts.module.scss';

export const LayoutOne = ({ media, solutionMedia, showSolution = false }) => {
  const visibleMedia = !!solutionMedia && showSolution ? solutionMedia : media;

  const videoRef = useRef();
  const sourceRef = useRef();

  useEffect(() => {
    function reloadVideo() {
      videoRef.current.pause();
      sourceRef.current.setAttribute('src', visibleMedia.video);
      videoRef.current.load();
      videoRef.current.play();
    }
    if (visibleMedia === solutionMedia && visibleMedia.video) reloadVideo();
  }, [visibleMedia]);

  return (
    <div
      className={`${styles.media}
      ${showSolution ? styles.active : undefined}`}
    >
      {visibleMedia.video ? (
        <video controls={false} autoPlay preload='metadata' ref={videoRef}>
          <source src={visibleMedia.video} type='video/mp4' ref={sourceRef} />
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
  solutionMedia: PropTypes.instanceOf(Object),
  showSolution: PropTypes.bool.isRequired,
};

LayoutOne.defaultProps = {
  solutionMedia: undefined,
};

LayoutTwo.propTypes = {
  media: PropTypes.instanceOf(Object).isRequired,
  correctOption: PropTypes.number.isRequired,
  showSolution: PropTypes.bool.isRequired,
};

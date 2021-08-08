import React from 'react';
import PropTypes from 'prop-types';

export const TrueFalse = ({ media }) => (
  <div>
    {media.video ? (
      <video controls autoPlay preload='metadata'>
        <source src={media.video} type='video/mp4' />
      </video>
    ) : (
      <img src={media.image} alt='' />
    )}
  </div>
);

export const MultiChoice = ({ media }) => (
  <div className='multi-choice'>
    {media.images.map((src) => (
      <div key={src}>
        <img src={src} alt='' />
      </div>
    ))}
  </div>
);

TrueFalse.propTypes = {
  media: PropTypes.instanceOf(Object).isRequired,
};

MultiChoice.propTypes = {
  media: PropTypes.instanceOf(Object).isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';

const Intro = ({ content, startQuestion }) => (
  <div className='question__intro'>
    <h1 className='display-3'>{content.title}</h1>

    <div className='question__intro__videoWrapper'>
      <video controls autoPlay preload='metadata' onEnded={startQuestion}>
        <source src={content.audio} type='video/mp4' />
      </video>
      <div className='mt-4'>
        <button type='button' onClick={startQuestion}>
          Skip Audio
        </button>
      </div>
    </div>
  </div>
);

export default Intro;

Intro.propTypes = {
  content: PropTypes.objectOf(PropTypes.any).isRequired,
  startQuestion: PropTypes.func.isRequired,
};

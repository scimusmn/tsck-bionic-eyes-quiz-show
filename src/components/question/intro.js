import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useKeyPress from '../../hooks/useKeyPress';
import { controls } from '../../config.json';

const Intro = ({ content, startQuestion }) => {
  // skip media
  const skip = useKeyPress(controls.skip);
  useEffect(() => {
    if (skip) startQuestion();
  }, [skip]);

  return (
    <div className='question__intro'>
      <h1 className='display-3'>{content.title}</h1>

      <div className='question__intro__videoWrapper'>
        <video controls autoPlay preload='metadata' onEnded={startQuestion}>
          <source src={content.audio} type='video/mp3' />
        </video>
        <div className='mt-4'>
          <button type='button'>Skip</button>
        </div>
      </div>
    </div>
  );
};

export default Intro;

Intro.propTypes = {
  content: PropTypes.instanceOf(Object).isRequired,
  startQuestion: PropTypes.func.isRequired,
};

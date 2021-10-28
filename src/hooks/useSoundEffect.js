import { useState, useEffect } from 'react';
import { soundEffect } from '../config.json';

const useSoundEffect = (type, loop = false) => {
  const [audio] = useState(new Audio(soundEffect[type]));
  audio.loop = loop;
  audio.volume = 0.2;
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
    if (playing) audio.play();
    else audio.pause();
  }, [playing]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};

export default useSoundEffect;

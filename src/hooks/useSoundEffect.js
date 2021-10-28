import { useState, useEffect } from 'react';
import { soundEffect } from '../config.json';

const useSoundEffect = (type, loop = false) => {
  const [audio] = useState(new Audio(soundEffect[type]));
  audio.loop = loop;
  audio.volume = 0.2;

  const [playing, setPlaying] = useState(false);

  const play = () => setPlaying(true);
  const pause = () => setPlaying(false);

  useEffect(() => {
    if (playing) audio.play();
    else audio.pause();

    return () => audio.pause();
  }, [playing]);

  return [play, pause];
};

export default useSoundEffect;

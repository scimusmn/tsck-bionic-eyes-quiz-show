import { useState, useEffect } from 'react';

export default function useCaptions(video) {
  const [captions, setCaptions] = useState('');

  useEffect(() => {
    const textTrack = video.current.textTracks[0];
    function onCueChange() {
      textTrack.mode = 'hidden';
      setCaptions(textTrack.activeCues[0].text);
    }

    textTrack.addEventListener('cuechange', onCueChange);
    return () => {
      textTrack.removeEventListener('cuechange', onCueChange);
    };
  }, [captions]);

  return captions;
}

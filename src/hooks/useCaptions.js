import { useState, useEffect } from 'react';

export default function useCaptions(video) {
  const [captions, setCaptions] = useState('');

  useEffect(() => {
    const textTrack = video.current.textTracks[0];
    function onCueChange() {
      textTrack.mode = 'hidden';
      // inject new font in specific cases
      if (textTrack.activeCues.length && textTrack.activeCues[0].text === "أحسنت عملًا،"
      || textTrack.activeCues[0].text === "ولكن السؤال التالي قد يكون أصعب قليلًا."
      || textTrack.activeCues[0].text === "هيا نجرب سؤالًا آخرًا مثل هذا.")
        setCaptions(`<span style="font-family: segoeUI">${textTrack.activeCues[0].text}</span>`);
      else if (textTrack.activeCues.length)
        setCaptions(textTrack.activeCues[0].text);
    }

    textTrack.addEventListener('cuechange', onCueChange);
    return () => {
      textTrack.removeEventListener('cuechange', onCueChange);
    };
  }, [captions]);

  return captions;
}

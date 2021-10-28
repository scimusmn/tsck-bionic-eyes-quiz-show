import { useEffect } from 'react';

export default function useKeyPress(targetKey, callback) {
  function downHandler({ key }) {
    if (key === targetKey) {
      callback();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
    };
  }, []);
}

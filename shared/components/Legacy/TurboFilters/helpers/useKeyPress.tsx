import { useEffect } from 'react';
/**
 * useKeyPress
 * @param {string} key - the name of the key to respond to, compared against event.key
 * @param {function} action - the action to perform on key press
 */
const useKeypress = (
  key: string,
  action: (e: KeyboardEvent) => void,
  enabled?: boolean
): any => {
  useEffect(() => {
    function onKeyup(e: KeyboardEvent) {
      if (e.key === key) action(e);
    }
    if (enabled) {
      window.addEventListener('keyup', onKeyup);
      return () => window.removeEventListener('keyup', onKeyup);
    }
  }, [action, key, enabled]);
};

export default useKeypress;

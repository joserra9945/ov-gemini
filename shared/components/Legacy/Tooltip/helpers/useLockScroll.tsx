import { useLayoutEffect, useRef } from 'react';

const useLockScroll = (
  enableLockScroll = false,
  target: HTMLElement = document.body
): void => {
  const overflowStyleRef = useRef('');

  useLayoutEffect(() => {
    if (enableLockScroll && !overflowStyleRef.current) {
      // Save the original body overflow and prevent scrolling
      overflowStyleRef.current = window.getComputedStyle(target).overflow;
      target.style.overflow = 'hidden';
    } else if (!enableLockScroll && overflowStyleRef.current) {
      // Re-enable scrolling
      target.style.overflow = overflowStyleRef.current;
      overflowStyleRef.current = '';
    }
  }, [enableLockScroll, target]);
};

export default useLockScroll;

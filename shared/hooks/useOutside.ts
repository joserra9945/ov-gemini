import { useEffect } from 'react';

export const useOutside = (
  ref: React.RefObject<HTMLDivElement>,
  closeOnClickOutside: boolean,
  setter: (args: boolean) => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setter(false);
      }
    };
    if (closeOnClickOutside) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      if (closeOnClickOutside) {
        document.removeEventListener('mousedown', handleClickOutside);
      }
    };
  }, [closeOnClickOutside, ref, setter]);
};

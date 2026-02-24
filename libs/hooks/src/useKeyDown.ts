import { useEffect, useCallback } from 'react';

export function useKeyDown(callback: () => void, keys: string[]) {
  const onKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const wasAnyKeyPressed = keys.some((key) => event.key === key);
      if (wasAnyKeyPressed) {
        event.preventDefault();
        callback();
      }
    },
    [callback, keys]
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);
}

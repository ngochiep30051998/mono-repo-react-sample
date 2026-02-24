import { MutableRefObject, useEffect, useRef } from 'react';

export interface UseMountedReturnVal {
  isMounted: MutableRefObject<boolean>;
}

export function useMounted(): UseMountedReturnVal {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return { isMounted };
}

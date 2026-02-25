import type { ComponentType, ComponentProps } from 'react';
import { useEffect, useState } from 'react';
import { Spinner } from '../atoms';

export default function loadable<T extends ComponentType<any>>(
  loader: () => Promise<{ default: T }>
) {
  const LoadableComponent = (props: ComponentProps<T>) => {
    const [Component, setComponent] = useState<T | null>(null);

    useEffect(() => {
      let isMounted = true;

      loader().then((mod) => {
        if (isMounted) {
          setComponent(() => mod.default);
        }
      });

      return () => {
        isMounted = false;
      };
    }, []);

    if (!Component) {
      return <Spinner />;
    }

    const ResolvedComponent = Component;
    return <ResolvedComponent {...props} />;
  };

  return LoadableComponent;
}

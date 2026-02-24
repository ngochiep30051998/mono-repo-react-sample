import React, { useState } from 'react';
import { LoadingContext } from '../contexts/LoadingContext';
import { LoadingFullScreen } from '@ui';

type Props = {
  children: React.ReactNode;
};

export function LoadingProvider(props: Props) {
  const [loading, setLoading] = useState(false);

  return (
    <LoadingContext.Provider
      value={{
        loading,
        show: () => setLoading(true),
        hide: () => setLoading(false),
      }}
    >
      {loading && <LoadingFullScreen />}
      {props.children}
    </LoadingContext.Provider>
  );
}

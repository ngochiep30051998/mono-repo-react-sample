import React, { Fragment, ReactElement, ReactNode, useLayoutEffect } from 'react';
import { Navigate } from 'react-router';
import { cache, AUTH_ADMIN_CACHE_KEY } from '@core';
import useAuthStore from '../store/useAuthStore';

type Props = {
  children: ReactNode | ReactElement;
};

export function PrivateGuard({ children }: Props) {
  const cached = cache.getCache(AUTH_ADMIN_CACHE_KEY)?.data as { token?: string } | undefined;
  const hasToken = !!cached?.token;
  const roles = useAuthStore((s) => s.roles);
  const hydrateFromCache = useAuthStore((s) => s.hydrateFromCache);

  useLayoutEffect(() => {
    if (hasToken && roles.length === 0) hydrateFromCache();
  }, [hasToken, roles.length, hydrateFromCache]);

  return hasToken ? <Fragment>{children}</Fragment> : <Navigate to="/login" />;
}

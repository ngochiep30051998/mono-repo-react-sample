import React, { Fragment, ReactElement, ReactNode } from 'react';
import { Navigate } from 'react-router';
import { cache, AUTH_ADMIN_CACHE_KEY } from '@core';

type Props = {
  children: ReactNode | ReactElement;
};

export function PublicGuard({ children }: Props) {
  const cached = cache.getCache(AUTH_ADMIN_CACHE_KEY)?.data as { token?: string } | undefined;
  const hasToken = !!cached?.token;

  return hasToken ? <Navigate to="/home" /> : <Fragment>{children}</Fragment>;
}

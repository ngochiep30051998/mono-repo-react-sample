import { RouterProvider, createBrowserRouter } from 'react-router';
import { Suspense } from 'react';
import { RouteErrorBoundary, Spinner } from '@ui';
import { VendorTemplate, AuthTemplate } from '../layout';
import * as Dashboard from '@features/admin/feature-dashboard';
import * as Classes from '@features/vendors/feature-classes';
import { PublicGuard, PrivateGuard } from '@core';
import { AuthRouter } from '@features/admin/auth';

const modules = [Dashboard, Classes];

const router = createBrowserRouter(
  [
    {
      path: '/',
      errorElement: <RouteErrorBoundary />,
      HydrateFallback: Spinner,
      children: [
        {
          path: '/',
          element: <PrivateGuard children={<VendorTemplate />} />,
          children: [],
        },
        {
          element: <PublicGuard children={<AuthTemplate />} />,
          children: [AuthRouter],
        },
        {
          element: <PrivateGuard children={<VendorTemplate />} />,
          children: [...modules.map((x) => x.Router)],
        },
      ],
    },
  ],
  {
    basename: import.meta.env.PUBLIC_URL,
  }
);

const Router = () => (
  <Suspense fallback={<Spinner />}>
    <RouterProvider router={router} />
  </Suspense>
);

export { MenuItems } from './menuItems';
export default Router;


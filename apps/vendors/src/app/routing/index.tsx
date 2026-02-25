import { RouterProvider, createBrowserRouter } from 'react-router';
import { Suspense } from 'react';
import { RouteErrorBoundary, Spinner } from '@ui';
import { VendorTemplate, AuthTemplate } from '../layout';
import * as Dashboard from '@features/admin/feature-dashboard';
import * as Users from '@features/admin/feature-users';
import * as Products from '@features/admin/feature-products';
import * as Orders from '@features/admin/feature-orders';
import { PublicGuard, PrivateGuard } from '@core';
import { AuthRouter } from '@features/admin/auth';

const modules = [Dashboard, Users, Products, Orders];

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


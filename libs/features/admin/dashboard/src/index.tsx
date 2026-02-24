import { DashboardOutlined } from '@ant-design/icons';
import { RouteObject } from 'react-router';
import { loadable } from '@ui';
import { PERMISSIONS, getItem, PermissionGuard } from '@features/admin/auth';
import type { IMenuItem } from '@shared-types';

const Dashboard = loadable(() => import('./pages/Dashboard'));

export const Router: RouteObject = {
  path: '/',
  children: [
    {
      index: true,
      element: (
        <PermissionGuard permission={PERMISSIONS.DASHBOARD_VIEW}>
          <Dashboard />
        </PermissionGuard>
      ),
    },
  ],
};

export const MenuItems: IMenuItem[] = [
  getItem('Dashboard', 'dashboard', <DashboardOutlined />, '/', undefined, undefined, undefined, PERMISSIONS.DASHBOARD_VIEW),
];

import { BookOutlined } from '@ant-design/icons';
import type { RouteObject } from 'react-router';
import { loadable } from '@ui';
import { PERMISSIONS, getItem, PermissionGuard } from '@core';
import type { IMenuItem } from '@shared-types';

const ClassesPage = loadable(() => import('./pages/ClassesPage'));

export const Router: RouteObject = {
  path: 'classes',
  children: [
    {
      index: true,
      element: (
        <PermissionGuard permission={PERMISSIONS.CLASSES_VIEW}>
          <ClassesPage />
        </PermissionGuard>
      ),
    },
  ],
};

export const MenuItems: IMenuItem[] = [
  getItem(
    'Classes',
    'classes',
    <BookOutlined />,
    '/classes',
    undefined,
    undefined,
    undefined,
    PERMISSIONS.CLASSES_VIEW,
  ),
];

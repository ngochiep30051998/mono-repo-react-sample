import { FileTextOutlined } from '@ant-design/icons';
import { RouteObject } from 'react-router';
import { loadable } from '@ui';
import { PERMISSIONS, getItem, PermissionGuard } from '@features/admin/auth';
import type { IMenuItem } from '@shared-types';

const OrderList = loadable(() => import('./pages/OrderList'));
const OrderDetail = loadable(() => import('./pages/OrderDetail'));

export const Router: RouteObject = {
  path: 'orders',
  children: [
    {
      index: true,
      element: (
        <PermissionGuard permission={PERMISSIONS.ORDERS_VIEW}>
          <OrderList />
        </PermissionGuard>
      ),
    },
    {
      path: ':id',
      element: (
        <PermissionGuard permission={PERMISSIONS.ORDERS_VIEW}>
          <OrderDetail />
        </PermissionGuard>
      ),
    },
  ],
};

export const MenuItems: IMenuItem[] = [
  getItem('Orders', 'orders', <FileTextOutlined />, '/orders', undefined, undefined, undefined, PERMISSIONS.ORDERS_VIEW),
];

import { ShoppingOutlined } from '@ant-design/icons';
import { RouteObject } from 'react-router';
import { loadable } from '@ui';
import { PERMISSIONS, getItem, PermissionGuard } from '@core';
import type { IMenuItem } from '@shared-types';

const ProductList = loadable(() => import('./pages/ProductList'));
const ProductDetail = loadable(() => import('./pages/ProductDetail'));

export const Router: RouteObject = {
  path: 'products',
  children: [
    {
      index: true,
      element: (
        <PermissionGuard permission={PERMISSIONS.PRODUCTS_VIEW}>
          <ProductList />
        </PermissionGuard>
      ),
    },
    {
      path: ':id',
      element: (
        <PermissionGuard permission={PERMISSIONS.PRODUCTS_VIEW}>
          <ProductDetail />
        </PermissionGuard>
      ),
    },
  ],
};

export const MenuItems: IMenuItem[] = [
  getItem('Products', 'products', <ShoppingOutlined />, '/products', undefined, undefined, undefined, PERMISSIONS.PRODUCTS_VIEW),
];
